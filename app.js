const uniqueOrderer = require('./uniqueOrderer.js');

const u = uniqueOrderer("abcc");

// for (cmb of u) {
//   console.log(cmb);
// }
console.log(u.next().value);
console.log(u.next().value);
console.log(u.next().value);
console.log(u.next().value);
console.log(u.next().value);
console.log(u.next().value);
console.log(u.next().value);
console.log(u.next().value);
// console.log(u.next().value);
// console.log(u.next().value);
// console.log(u.next().value);
// console.log(u.next().value);
