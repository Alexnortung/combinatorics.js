const Subgroup = require('./subgroup.js');

function* uniqueOrderer(inputString) {

  let arr = Array.from(inputString);

  const s = new Subgroup(arr, arr);
  // console.log(s);

  let isFinished = false;
  while (!isFinished) {
    const res = s.next();
    // console.log(s.subgroups[0].letterArray);
    // console.log(s.subgroups[1].letterArray);
    // console.log(s.subgroups[2].letterArray);
    yield res;
  }

}

module.exports = uniqueOrderer;
