const {indexOfObjectValue} = require('./utils.js');

class UniqueItems {
  constructor(inputArray) {


    this.duplicatesArray = [];
    this._items = inputArray;
    this.items = inputArray;

  }

  get unique() {
    return this._uniques;
  }

  get uniques() {
    return this._uniques;
  }

  get duplicates() {
    return this._duplicates;
  }

	getDuplicatesAsArray() {
		const arr = [];

		for (let i = 0; i < this._duplicates.length; i++) {
			const cDupe = this._duplicates[i]
			for (var j = 0; j < cDupe.dupes; j++) {
				arr.push(cDupe.value)
			}
		}

		return arr;
	}

  get items() {
    return this._items;
  }

  set items(inputArray) {
		if (typeof inputArray === "undefined") {
			inputArray = "undefined";
		}
		if (
		typeof inputArray === "string" ||
		typeof inputArray === "number" ||
		typeof inputArray === "boolean") {
			inputArray = inputArray.toString().split("");
		}
    this._items = inputArray;
    this._setUniques();
    this._setDuplicates();
  }

  get length() {
    return this._items.length;
  }


  _setUniques() {
    let arr = this._items;
    this._uniques = arr.filter((item, index) => arr.indexOf(item) == index);
  }

	get totalDuplicates() {
		return this._totalDuplicates;
	}

  _setDuplicates() {
    let arr = this._items;
    this.duplicatesArray = [];
		this._totalDuplicates = 0;

		const dupesArr = [];

		for (var i = 0; i < arr.length; i++) {
			const cVal = arr[i];
			const cIndex = indexOfObjectValue(dupesArr, "value", arr[i])
			if (cIndex == -1) {
				// add this to the dupesArr
				dupesArr.push({
					value: cVal,
					dupes: 0
				});
			} else {
				//count +1 in the dupesArr
				dupesArr[cIndex].dupes++;
				this._totalDuplicates++;
			}

		}

		this._duplicates = dupesArr;




    // const obj = {};
		//
    // for (var i = arr.length - 1; i >= 0; i--) {
    //   if (!obj.hasOwnProperty(arr[i])) {
    //     obj[arr[i]] = 0;
    //   } else {
    //     this.duplicatesArray.push(arr[i]);
    //     obj[arr[i]] += 1;
    //   }
		//
    // }

    // this._duplicates = obj;
    // this._duplicates = arr.filter(item, index => arr.indexOf(item) != index);
  }


}

module.exports = UniqueItems;
