class UniqueString {
  constructor(str) {
    this.duplicatesArray = [];
    this._str = str;
    this.str = str;

  }

  get unique() {
    return this._uniques;
  }

  get duplicates() {
    return this._duplicates;
  }

	getDuplicatesAsArray() {
		const arr = [];

		for (var letter in this._duplicates) {
			if (this._duplicates.hasOwnProperty(letter)) {
				for (var i = 0; i < this._duplicates[letter]; i++) {
					arr.push(letter);
				}
			}
		}

		return arr;
	}

  get str() {
    return this._str;
  }

  set str(newStr) {
    this._str = newStr;
    this._setUniques();
    this._setDuplicates();
  }

  get length() {
    return this._str.length;
  }


  _setUniques() {
    let arr = this._str.split("");
    this._uniques = arr.filter((item, index) => arr.indexOf(item) == index).join("");
  }

  _setDuplicates() {
    let arr = this._str.split("");
    this.duplicatesArray = [];


    const obj = {};

    for (var i = arr.length - 1; i >= 0; i--) {
      if (!obj.hasOwnProperty(arr[i])) {
        obj[arr[i]] = 0;
      } else {
        this.duplicatesArray.push(arr[i]);
        obj[arr[i]] += 1;
      }

    }

    this._duplicates = obj;
    // this._duplicates = arr.filter(item, index => arr.indexOf(item) != index);
  }





  toString() {
    return this._str;
  }

}

module.exports = UniqueString;
