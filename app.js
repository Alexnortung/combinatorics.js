const uniqueOrderer = require('./uniqueOrderer.js');

const u = uniqueOrderer("aabbccc");

// for (cmb of u) {
//   console.log(cmb);
// }
console.log(u.next().value);
console.log(u.next().value);
// console.log(u.next().value);
// console.log(u.next().value);
// console.log(u.next().value);
// console.log(u.next().value);
// console.log(u.next().value);
// console.log(u.next().value);
// console.log(u.next().value);
