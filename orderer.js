const utils = require('./utils.js');

function* orderer(inputString) {
  let myStr = [];
  for (let i = 0; i < inputString.length; i++) {
    myStr[i] = inputString[i];
  }
  const loops = utils.factorial(myStr.length);
  if (loops <= 0) {
    yield 0;
  }

  // console.log(loops);
  for (let i = 0; i < loops; i++) {
    let str = myStr.slice();
    let end = "";


    for (var j = 0; j < myStr.length; j++) {
      // some magic
      let index2 = Math.floor(((i % utils.factorial(str.length)) / utils.factorial(str.length)) * str.length);
      end += str[index2];
      str.splice(index2, 1);
    }

    yield end;

  }

}

module.exports = orderer;
