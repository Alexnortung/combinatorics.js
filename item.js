class Item {
	/**
	 * 
	 * @param {*} value the value of the current item
	 * @param {Subgroup[]} acceptingSubgroups Subgroubs which accept this item
	 */
	constructor(value, acceptingSubgroups) {
		this.value = value;
		this.acceptingSubgroups = acceptingSubgroups || [];
	}

	/**
	 * 
	 * @param {Subgroup[]} subgroups setting new subgroups if they accept this items value
	 */
	setAcceptingSubgroups(subgroups) {
		this.acceptingSubgroups = [];
		for (var i = 0; i < subgroups.length; i++) {
			if (subgroups[i].accepts(this.value)) {
				this.acceptingSubgroups.push(subgroups[i]);

			}

		}
	}
}

module.exports = Item;
