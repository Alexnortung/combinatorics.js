const UniqueString = require('./unique-string.js');
const orderer = require("./orderer.js");

class Subgroup {
	constructor(itemsArray, acceptedLetters) {

		this.items = itemsArray || [];
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

		if (this.firstIteration) {
			this.firstIteration = false;
			this.indexes = {};
			this.str = new UniqueString(this.items);
			this.orderer = orderer(this.str.uniques);
			this.uniqueOrder = this.orderer.next().value;
			this.acceptingSubgroupsObj = {};
			this.subgroups = [];

			const remainingLetters = this.uniqueOrder;
			for (var i = 0; i < this.uniqueOrder.length; i++) {
				this.subgroups[i] = new Subgroup(undefined, remainingLetters.slice());

				remainingLetters.splice(0,1);

			}

			return ;
		}

	}
}
