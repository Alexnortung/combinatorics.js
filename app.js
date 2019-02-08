const uniqueOrderer = require('./uniqueOrderer.js');

const u = uniqueOrderer("001122");

// const uniques = [];

let isFinished = false;
while (!isFinished) {
	const res = u.next();
	if (res.done) {
		isFinished = true;
		break;
	}
	const val = res.value.join("")
	console.log(val);
	// if (uniques.indexOf(val) !== -1) {
	// 	console.log(val, "already exists");
	// } else {
	// 	uniques.push(val);
	// }
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
