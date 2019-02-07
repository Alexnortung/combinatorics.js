const UniqueString = require('./unique-string.js');
const orderer = require("./orderer.js");
const Item = require('./item.js');

class Subgroup {
	constructor(itemsArray, acceptedLetters) {

		this.itemsArray = itemsArray || [];
		this.acceptedLetters = acceptedLetters || [];

		this.firstIteration = true;
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
			this.firstIteration = false;
			this.indexes = {};
			this.str = new UniqueString(this.items);
			this.orderer = orderer(this.str.uniques);
			this.uniqueOrder = this.orderer.next().value;
			this.acceptingSubgroupsObj = {};
			this.subgroups = [];
			this.items = [];


			const remainingLetters = this.uniqueOrder;
			for (let i = 0; i < this.uniqueOrder.length; i++) {
				this.subgroups[i] = new Subgroup(undefined, remainingLetters.slice());

				remainingLetters.splice(0,1);

			}

			const duplicatesArray = this.str.getDuplicatesAsArray();

			for (let i = 0; i < duplicatesArray.length; i++) {
				const cValue = duplicatesArray[i];
				const cItem = new Item(cValue);
				cItem.setAcceptingSubgroups(this.subgroups);
				this.items.push(cItem);
				cItem.acceptingSubgroups[0].assignItem(cItem);

			}

			const returnedValues = [];
			const returnArray = [];

			for (let i = 0; i < this.subgroups.length; i++) {
				//initial iteration
				returnArray.push(this.uniqueOrder[i]);
				returnedValues[i] = this.subgroups[i].next();
				returnArray.push(returnedValues[i]);
			}

			

			return {
				done: false,
				value: returnArray
			};





			// return {
			// 	done: false,
			// 	value: this.toArray();
			// };
		}

	}

	isEmpty() {
		if (this.letterArray.length == 0) {
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
		if (this.acceptedLetters.includes(letter)) {
			return this;
		}
		return false;
	}

	accepts(letter) {
		return this.isAccepted(letter);
	}

	assignItem(itemValue) {
		if (!this.itemsArray.includes(itemValue)) {
			this.itemsArray.push(itemValue)

		}
	}


}
