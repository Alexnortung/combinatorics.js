module.exports = {
  factorial: function (x) {

    if (x === 0 || x === 1) return 1;
    for (var i = x - 1; i >= 1; i--) {
      x *= i;
    }
    return x;
  },

	indexOfObjectValue: function (array, prop, value) {
		for (var i = 0; i < array.length; i++) {
			const cObj = array[i];
			if (cObj.hasOwnProperty(prop) && cObj[prop] === value) {
				return i;
			}
		}
		// no result
		return -1;
	}
}
