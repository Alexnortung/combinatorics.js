class Item {
	constructor(value, acceptingSubgroups) {
		this.value = value;
		this.acceptingSubgroups = acceptingSubgroups || [];
	}

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
