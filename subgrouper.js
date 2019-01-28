import { UniqueString } from "./unique-string.js";

class Subgroup {
  constructor(parent, acceptedLetters, letterArray ) {
    this.parent = parent;
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
      return this;
    }
    return false;
  }

  accepts(letter) {
    this.isAccepted(letter);
  }

  assignItem(letter) {

    if (!this.isAccepted(letter)) {
      return false;
    }

    this.letterArray.push(letter);
    this.updateStrObj();
    return this;
  }

  clearItem(letter) {
    if (this.letterArray.includes(letter)) {
      this.letterArray.splice(this.letterArray.indexOf(letter) , 1);
    }
  }

  assignAcceptedItem(letter) {
    if (this.acceptedLetters.includes(letter)) {
      this.acceptedLetters.push(letter);
    }
    return this;
  }

  clearAssignedItems() {
    this.letterArray = [];
    return this;
  }

  generateUnique() {
    const that = this;

    function* deepAssigner(subgroups, remainingLetters) {
      const cLetter = remainingLetters[0];
      const newRemainingLetters = remainingLetters.slice(1, remainingLetters.length)
      const acceptingSubgroups = subgroups.filter(sub => sub.accepts(cLetter));
      for (var i = 0; i < acceptingSubgroups.length; i++) {
        acceptingSubgroups[i].assignItem(cLetter);


        if (newRemainingLetters.length !== 0) {
          const da = deepAssigner(subgroups, newRemainingLetters);
          let daFinished = false;
          while (!daFinished) {
            const finished = da.next();
            if (finished) {
              daFinished = true;
              break;
            }

            yield false;
          }

        }
        yield false;

        acceptingSubgroups[i].clearItem(cLetter);

      }

      yield true;

    }

    function* assigner(subgroups, duplicates) {

      // const deepAssigners = [];

      const remainingLetters = [];

      for (var char in duplicates) {
        if (duplicates.hasOwnProperty(char)) {
          //get accepting subgroups
          // deepAssigners.push(da);

          for (var i = 0; i < duplicates[char]; i++) {
            remainingLetters.push(char);
          }

        }
      }

      const da = deepAssigner(subgroups, remainingLetters);




    }

    function* uniqueGenerator() {
      const uniques = that.str.uniques;
      const dupes = that.str.duplicates;

      const uniquesSubgroups = [];
      const accepts = [];

      for (let i = 0; i < uniques.length; i++) {
        const cUnique = uniques[i];
        accepts.push(cUnique);
        const sub = new Subgroup(that, accepts.slice());
        uniquesSubgroups.push(sub);


      }

      if (that.parent == null) {
        //angery
      } else {
        //double angery
      }



    }

    const u = uniqueGenerator();
    return u;

  }




}
