const UniqueString = require('./unique-string.js');
const UniqueItems = require('./Unique-items.js');
const orderer = require("./orderer.js");
const Item = require('./item.js');


class Subgroup {
	constructor(itemsArray, acceptedItems) {

		this.itemsArray = itemsArray || [];
		this.acceptedItems = acceptedItems || [];

		// this._currentValue = [];

		this.firstIteration = true;
	}

	get currentValue() {
		if (this.isEmpty() || this.firstIteration) {
			return [];
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

		if (this.isEmpty()) {
			return {done: true};
		}

		if (this.firstIteration) {
			return this.firstIterationMethod();
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
			//next order
			// return this.currentValue

			const ordererRes = this.orderer.next();
			if (ordererRes.done) {
				return {done: true};
			}
			// .split is temporary
			this.uniqueOrder = ordererRes.value.split("");

			this.createSubgroups();

			console.log(this.indexes);

			return {
				done: false,
				value: this.currentValue
			};
		}



		return {done: true};


	}

	nextAssignment() {
		
	}

	createSubgroups() {
		const remainingItems = this.uniqueOrder.slice();

		for (let i = this.uniqueOrder.length - 1; i >= 0; i--){
		 this.subgroups[i] = new Subgroup(undefined, remainingItems.slice());

		 remainingItems.splice(remainingItems.length - 1,1);
		}

		const duplicates = this.uItems.duplicates;
		for (let i = 0; i < duplicates.length; i++) {
			const cDupe = duplicates[i];
			const cValue = cDupe.value;
			const cItem = new Item(cValue);
			cItem.setAcceptingSubgroups(this.subgroups);
			for (let j = 0; j < cDupe.dupes; j++) {
				this.items.push(cItem);
				cItem.acceptingSubgroups[0].assignItem(cValue);
			}
		}

		this.subgroups.forEach(sub => sub.next());
	}

	firstIterationMethod() {
		this.firstIteration = false;
		this.indexes = [];
		this.uItems = new UniqueItems(this.itemsArray);
		// .join and .split is temporary
		const orderString = this.uItems.uniques.join("");
		// console.log(orderString);
		this.orderer = orderer(orderString);
		this.uniqueOrder = this.orderer.next().value;
		// console.log(this.uniqueOrder);
		this.uniqueOrder = this.uniqueOrder.split("");
		// console.log("uorder: ", this.uniqueOrder);
		this.acceptingSubgroupsObj = {};
		this.subgroups = [];
		this.items = [];


		this.createSubgroups();



		// const duplicatesArray = this.str.getDuplicatesAsArray();
		//
		// for (let i = 0; i < duplicatesArray.length; i++) {
		// 	const cValue = duplicatesArray[i];
		// 	const cItem = new Item(cValue);
		// 	cItem.setAcceptingSubgroups(this.subgroups);
		// 	this.items.push(cItem);
		// 	cItem.acceptingSubgroups[0].assignItem(cItem);
		//
		// }

		// const returnedValues = [];
		// const returnArray = [];
		//
		// // console.log("subs:", this.subgroups);
		//
		// for (let i = 0; i < this.subgroups.length; i++) {
		// 	//initial iteration
		// 	returnArray.push(this.uniqueOrder[i]);
		// 	returnedValues[i] = this.subgroups[i].next();
		// 	if (returnedValues[i].value) {
		// 		returnArray.push(returnedValues[i].value);
		//
		// 	}
		// }
		// console.log(this.uniqueOrder);
		// console.log(returnArray, returnedValues);


		return {
			done: false,
			value: this.currentValue
		};
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
