const UniqueString = require('./unique-string.js');
const UniqueItems = require('./unique-items.js');
const orderer = require("./orderer-items.js");
const Item = require('./item.js');


class Subgroup {
	constructor(itemsArray, acceptedItems) {

		this.itemsArray = itemsArray || [];
		this.acceptedItems = acceptedItems || [];

		// this._currentValue = [];

		this.firstIteration = true;
		this.singleValued = false;
	}

	get currentValue() {
		if (this.isEmpty() || this.firstIteration) {
			return [];
		} else if (this.singleValued) {
			return this.itemsArray;
		} else if (this.allItemsUnique) {
			return this.uniqueOrder;
		}

		const returnArr = [];

		for (var i = 0; i < this.uniqueOrder.length; i++) {
			returnArr.push(this.uniqueOrder[i], ...this.subgroups[i].currentValue)
		}

		return returnArr;

	}

	setItemsArray(array) {
		if (!this.firstIteration) {
			throw new Error("Cannot set array after first iteration");
		}
		this.itemsArray = array;
	}


	next() {
		const that = this;

		if (this.isEmpty() || (!this.firstIteration && this.singleValued)) {
			return {done: true};
		}

		if (this.firstIteration) {
			return this.firstIterationMethod();
		}

		if (this.allItemsUnique) {
			const ordererRes = this.orderer.next();
			if (ordererRes.done) {
				return {done: true};
			}

			this.uniqueOrder = ordererRes.value;

			return {done: false, value: that.currentValue};

		}




		let allSubgroupsDone = true;

		for (let i = this.subgroups.length - 1; i >= 0; i--){
			const subgroupRes = this.subgroups[i].next();
			if (subgroupRes.done == false) {
				allSubgroupsDone = false;
				return {
					done: false,
					value: this.currentValue
				};


			}
		}

		if (allSubgroupsDone) {
			//next assignement
			// return this.currentValue

			const assignementResponse = this.nextAssignment();

			if (assignementResponse) {
				//if all assignments has been made, goto next order.
				const ordererRes = this.orderer.next();
				// if (this.topLayer) {
				// 	console.log("next order");
				//
				// }
				if (ordererRes.done) {
					return {done: true};
				}
				this.uniqueOrder = ordererRes.value;

				this.createIndexes();

				this.createSubgroups();

				// console.log(this.indexes);

			}


			return {
				done: false,
				value: this.currentValue
			};
		}



		return {done: true};


	}

	// reassign() {
	// 	this.createSubgroups();
	// }

	nextAssignment() {
		let allindexesFinished = true;
		for (let i = 0; i < this.indexes.length; i++) {
			const cIndex = this.indexes[i];
			const cIndexLast = cIndex.item.acceptingSubgroups.length - 1;

			let allIndexesLast = true;

			for (let j = cIndex.indexes.length - 1; j >= 0; j--){
			 const cIndexIndex = cIndex.indexes[j];
				if (cIndexIndex !== cIndexLast) {

					const newIndexIndex = cIndexIndex + 1;
					allIndexesLast = false;
					// cIndex.indexes[j] = newIndexIndex;
					for (var k = j; k < cIndex.indexes.length; k++) {
						cIndex.indexes[k] = newIndexIndex;
					}
					break;
				}
			}

			if (!allIndexesLast) {
				// zero fill arrays before cIndex
				for (let j = i - 1; j >= 0; j--){
				 this.indexes[j].indexes.fill(0);
				}
				allindexesFinished = false
				break;
			}

		}

		//reassign

		this.createSubgroups();
		// console.log(this.indexes);

		//return
		if (allindexesFinished) {
			return true;
			// return {done: true};
		} else {
			return false;
			// return {done: false};
		}
	}

	createSubgroups() {
		const that = this;
		const remainingItems = this.uniqueOrder.slice();

		this.subgroups = [];

		for (let i = this.uniqueOrder.length - 1; i >= 0; i--){
		 this.subgroups[i] = new Subgroup(undefined, remainingItems.slice());

		 remainingItems.splice(remainingItems.length - 1,1);
		}

		this.items.forEach(item => item.setAcceptingSubgroups(that.subgroups))

		for (let i = 0; i < this.indexes.length; i++) {
			const cIndex = this.indexes[i];
			const cItem = cIndex.item;

			for (var j = 0; j < cIndex.indexes.length; j++) {
				const cIndexIndex = cIndex.indexes[j];
				//assign
				cItem.acceptingSubgroups[cIndexIndex].assignItem(cItem.value);

			}
		}

		// first iteration
		this.subgroups.forEach(sub => sub.next());
	}

	firstIterationMethod() {
		const that = this;
		this.firstIteration = false;
		if (this.itemsArray.length == 1) {
			this.singleValued = true;
			return {done: false, value: that.currentValue};
		}


		this.indexes = [];
		this.uItems = new UniqueItems(this.itemsArray);
		const orderInput = this.uItems.uniques;
		this.orderer = orderer(orderInput);
		this.uniqueOrder = this.orderer.next().value;

		if (this.uItems.totalDuplicates == 0) {
			//only create orderer, no subgroups.
			this.allItemsUnique = true;
			return {done: false, value: that.currentValue};
		}

		this.acceptingSubgroupsObj = {};
		this.subgroups = [];
		this.items = [];

		//create Items.

		this.createIndexes();


		this.createSubgroups();



		return {
			done: false,
			value: this.currentValue
		};
	}

	createIndexes() {
		this.indexes = [];

		const duplicates = this.uItems.duplicates;
		for (let i = 0; i < duplicates.length; i++) {
			const cDupe = duplicates[i];
			const cValue = cDupe.value;
			const cItem = new Item(cValue);
			cItem.setAcceptingSubgroups(this.subgroups);
			this.indexes.push({
				item: cItem,
				indexes: new Array(cDupe.dupes).fill(0)
			});
			this.items.push(cItem);
		}
	}

	isEmpty() {
		if (this.itemsArray.length == 0) {
			return true;
		}
		return false;
	}

	toArray() {
		const arr = [];
		for (var i = 0; i < this.uniqueOrder.length; i++) {
			arr.push(this.uniqueOrder[i]);
			arr.push(this.subgroups[i].toArray());
		}
		return arr;
	}

	isAccepted( letter ) {
		if (this.acceptedItems.includes(letter)) {
			return this;
		}
		return false;
	}

	accepts(letter) {
		return this.isAccepted(letter);
	}

	assignItem(...itemValues) {
		if (!this.firstIteration) {
			throw new Error("Cannot assign items after first iteration");
		}

		for (var i = 0; i < itemValues.length; i++) {
			const itemValue = itemValues[i];
			// if (!this.itemsArray.includes(itemValue)) {
				this.itemsArray.push(itemValue)

			// }
		}
	}


}

module.exports = Subgroup;
