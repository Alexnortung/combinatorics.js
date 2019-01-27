import { UniqueString } from "./unique-string.js";

class Subgroup {
  constructor(acceptedLetters, letterArray ) {
    this.acceptedLetters = acceptedLetters;
    this.letterArray = letterArray | [];
    this.updateStrObj();
  }

  get length() {
    this.letterArray.length;
  }

  updateStrObj() {
    this.str = new UniqueString(this.letterArray.join(""));
  }

  isAccepted( letter ) {
    if (this.acceptedLetters.includes(letter)) {
      return true;
    }
    return false;
  }

  assignItem(letter) {

    if (!this.isAccepted(letter)) {
      return false;
    }

    this.letterArray.push(letter);
    this.updateStrObj();
    return true;
  }

  generateUnique() {
    const that = this;

    function* uniqueGenerator() {
      const uniques = that.str.uniques;
      const dupes = that.str.duplicates;

      const uniquesSubgroups = [];
      const accepts = [];

      for (var i = 0; i < uniques.length; i++) {
        const cUnique = uniques[i];
        
      }

    }

    const u = uniqueGenerator();
    return u;

  }

  accepted


}
