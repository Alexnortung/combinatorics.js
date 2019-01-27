import {UniqueString} from "./unique-string.js"

function* orderer(inputString) {
  let myStr = [];
  for (let i = 0; i < inputString.length; i++) {
    myStr[i] = inputString[i];
  }
  const loops = factorial(myStr.length);

  for (let i = 0; i < loops; i++) {
    let str = myStr.slice();
    let end = "";


    for (var j = 0; j < myStr.length; j++) {
      // some magic
      let index2 = Math.floor(((i % factorial(str.length)) / factorial(str.length)) * str.length);
      end += str[index2];
      str.splice(index2, 1);
    }

    yield end;

  }

}

function findDuplicates(string) {
  let arr = string.split("");
  return arr.filter(item, index => arr.indexOf(item) != index);
}

function findUniques(string) {
  let arr = string.split("");
  return arr.filter(item, index => arr.indexOf(item) == index);
}

function* uniqueOrderer(inputString) {
  //find duplicates
  const str = UniqueString(inputString);
  let duplicates = str.duplicates;
  let uniques = str.uniques;
  //create orderer for unique chars
  const o = orderer(uniques);
  let ordererFinished = false;
  //insert duplicates after last occurance from orderer value
  while (!ordererFinished) {
    const order = o.next();
    if (!order) {
      ordererFinished = true;
      break;
    }

    const orderVal = order.value;
    if (!orderVal) {
      ordererFinished = true;
      break;
    }

    // build string;
    let endStrArr = orderVal.split("");

    for (var char in object) {
      if (object.hasOwnProperty(char)) {


      }
    }



  }



}











function* genPlaceholders(order, dupeObj) {

  


}
