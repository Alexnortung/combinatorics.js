const UniqueString = require('./unique-string.js');
const orderer = require("./orderer.js");

class Subgroup {
  constructor(parent, acceptedLetters, letterArray ) {
    this.assignerCreated = false;
    this.assignerObj = {};

    this.parent = parent;
    this.acceptedLetters = acceptedLetters;
    this.letterArray = letterArray;
    if (typeof letterArray === "undefined" || typeof letterArray ==  null) {
      this.letterArray = [];
    }
    // console.log("world");
    this.updateStrObj();



  }

  getLayer() {
    if (this.parent == null) {
      return 1;
    } else {
      return this.parent.getLayer() + 1;
    }
  }

  resetAssigner() {
    this.assignerObj = this.assigner();
  }

  assigner() {
    const sub = this;
    this.assignerCreated = true;
    return (function* () {
      const duplicates = sub.str.duplicates;
      const subgroups = sub.subgroups;

      const indexes = {};
      const acceptingNum = {};

      for (var dupe in duplicates) {
        if (duplicates.hasOwnProperty(dupe)) {
          indexes[dupe] = [];
          for (var i = 0; i < duplicates[dupe]; i++) {
            indexes[dupe].push(0);
          }
        }
      }

      // if (sub.parent == null) {
      //   console.log(sub.uniqueOrder);
      //   console.log(indexes, acceptingNum);
      // }

      //assign
      //yield

      let isFinished = false;

      while (!isFinished) {
        // console.log("clearing");
        sub.subgroups.forEach((subg) => subg.clearAssignedItems());

        for (var indie in indexes) {
          if (indexes.hasOwnProperty(indie)) {
            const cLetter = indie;
            const acceptingSubgroups = sub.subgroups.filter(sub => sub.accepts(cLetter));

            acceptingNum[cLetter] = acceptingSubgroups.length;
            console.log(cLetter, "accepts:", acceptingNum[cLetter], indexes, `layer: ${sub.getLayer()}`);

            for (var i = 0; i < indexes[cLetter].length; i++) {
              // console.log(acceptingSubgroups ,acceptingNum[cLetter], indexes[cLetter][i], cLetter, indexes);
              // console.log(acceptingSubgroups);
              acceptingSubgroups[
                ( indexes[cLetter][i])
              ].assignItem(cLetter);

            }
          }
        }

        yield false;
        //check if this was last indexes
        //update indexes

        let isLast = true;
        for (let i = sub.uniqueOrder.length -1 ; i >= 0 ; i--) {
          const cLetter = sub.uniqueOrder[i];
          const cIndexes = indexes[cLetter];
          const cAcceptingNum = acceptingNum[cLetter];
          const cLastIndex = cAcceptingNum - 1;
          // console.log(cLetter, cIndexes, sub.uniqueOrder);
          for (let j = 0; j < cIndexes.length; j++) {
            //if not last: add one to this; break;
            //else continue, if all was last, yield true and break while loop
            const cIndex = cIndexes[j];


            if (cLastIndex != cIndex) {
              // console.log("cLastIndex:", cLastIndex, cIndex, cLetter);
              console.log(acceptingNum, indexes);
              cIndexes[j] += 1;
              for (var k = sub.uniqueOrder.indexOf(cLetter) + 1; k < sub.uniqueOrder.length; k++) {
                indexes[sub.uniqueOrder[k]].forEach((indie, m) => indexes[sub.uniqueOrder[k]][m] = 0);
              }
              isLast = false;
              break;
            } else {
              continue;
            }
          }

        }

        if (isLast) {
          yield true;
          isFinished = true;
          break;
        }



        // yield false;

      }

    }());
  }

  isEmpty() {
    if (this.letterArray.length == 0) {
      return true;
    }
    return false;
  }

  next() {
    // assign letters to subgroups
    // call this.subgroups next methods
    // get this.toArray
    const that = this;

    if (!this.assignerCreated) {
      this.resetAssigner();
    }

    // console.log(this.isEmpty());
    if (!this.isEmpty()) {
      const assignerRes = this.assignerObj.next();

      // if (assignerRes) {
      //   this.nextOrder()
      // }

      for (var i = 0; i < this.subgroups.length; i++) {
        // this.subgroups[i].next();
      }

    } else {
      return { done: true };
    }


    return {
      done: false,
      value: that.toArray()
    };

    //returns unique letters + other subgroups.toArray


  }

  // get length() {
  //   this.letterArray.length;
  // }

  toArray() {
    const arr = [];
    for (var i = 0; i < this.uniqueOrder.length; i++) {
      arr.push(this.uniqueOrder[i]);
      arr.push(this.subgroups[i].toArray());
    }
    return arr;
  }

  updateStrObj() {
    this.str = new UniqueString(this.letterArray.join(""));
    this.orderer = orderer(this.str.unique);
    this.nextOrder();

    this.generateSubgroups();
  }

  nextOrder() {
    this.uniqueOrder = [];
    let ordererRes = this.orderer.next().value;
    // console.log(ordererRes);
    for (let letter of ordererRes) {
      this.uniqueOrder.push(letter);
    }
    this.generateSubgroups();
  }

  generateSubgroups() {
    const that = this
    this.subgroups = [];
    const remainingLetters = this.uniqueOrder.slice();
    for (let i = this.uniqueOrder.length - 1; i >= 0; i--) {
      this.subgroups.unshift(new Subgroup(that, remainingLetters.slice()));
      remainingLetters.splice(remainingLetters.length -1 ,1);
    }
    if (this.parent == null) {
      console.log(this.subgroups[0]);

    }
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
      this.updateStrObj();
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
    this.updateStrObj();
    return this;
  }



  // generateUnique() {
  //   const that = this;
  //
  //   function* deepAssigner(subgroups, remainingLetters) {
  //     const cLetter = remainingLetters[0];
  //     const newRemainingLetters = remainingLetters.slice(1, remainingLetters.length)
  //     const acceptingSubgroups = subgroups.filter(sub => sub.accepts(cLetter));
  //     for (var i = 0; i < acceptingSubgroups.length; i++) {
  //       acceptingSubgroups[i].assignItem(cLetter);
  //
  //
  //       if (newRemainingLetters.length !== 0) {
  //         const da = deepAssigner(subgroups, newRemainingLetters);
  //         let daFinished = false;
  //         while (!daFinished) {
  //           const finished = da.next();
  //           if (finished) {
  //             daFinished = true;
  //             break;
  //           }
  //
  //           yield false;
  //         }
  //
  //       } else {
  //         yield false;
  //
  //       }
  //
  //       acceptingSubgroups[i].clearItem(cLetter);
  //
  //     }
  //
  //     yield true;
  //
  //   }
  //
  //   function* assigner(subgroups, duplicates) {
  //
  //     // const deepAssigners = [];
  //
  //     const remainingLetters = [];
  //
  //     for (var char in duplicates) {
  //       if (duplicates.hasOwnProperty(char)) {
  //         //get accepting subgroups
  //         // deepAssigners.push(da);
  //
  //         for (var i = 0; i < duplicates[char]; i++) {
  //           remainingLetters.push(char);
  //         }
  //
  //       }
  //     }
  //
  //     const da = deepAssigner(subgroups, remainingLetters);
  //
  //
  //
  //
  //   }
  //
  //   function* uniqueGenerator() {
  //     const uniques = that.str.uniques;
  //     const dupes = that.str.duplicates;
  //
  //     const uniquesSubgroups = [];
  //     const accepts = [];
  //
  //     for (let i = 0; i < uniques.length; i++) {
  //       const cUnique = uniques[i];
  //       accepts.push(cUnique);
  //       const sub = new Subgroup(that, accepts.slice());
  //       uniquesSubgroups.push(sub);
  //
  //
  //     }
  //
  //     if (that.parent == null) {
  //       //angery
  //     } else {
  //       //double angery
  //       //pass subgroups and remaining letters to a deepAssigner
  //       const remainingLetters = [];
  //       for (var char in duplicates) {
  //         if (duplicates.hasOwnProperty(char)) {
  //           remainingLetters.push(char);
  //         }
  //       }
  //       const da = deepAssigner(subgroups, remainingLetters);
  //
  //       let daFinished = false;
  //       while (!daFinished) {
  //
  //       }
  //
  //
  //
  //     }
  //
  //
  //
  //   }
  //
  //   const u = uniqueGenerator();
  //   return u;
  //
  // }

}


module.exports = Subgroup;
