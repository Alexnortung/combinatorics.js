import {UniqueString} from "./unique-string.js";
import {orderer} from "./orderer.js";

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
