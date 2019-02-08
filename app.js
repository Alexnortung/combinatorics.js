const uniqueOrderer = require('./uniqueOrderer.js');

const u = uniqueOrderer("abccc");

let isFinished = false;
while (!isFinished) {
	const res = u.next();
	if (res.done) {
		isFinished = true;
		break;
	}
	console.log(res.value);
}

// for (cmb of u) {
//   console.log(cmb);
// }
// console.log(u.next().value);
// console.log(u.next().value);
// console.log(u.next().value);
// console.log(u.next().value);
// console.log(u.next().value);
// console.log(u.next().value);
// console.log(u.next().value);
// console.log(u.next().value);
// console.log(u.next().value);
// console.log(u.next().value);
// console.log(u.next().value);
// console.log(u.next().value);
