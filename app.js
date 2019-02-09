const uniqueOrderer = require('./uniqueOrderer.js');
const orderer = require("./orderer.js")

const u = uniqueOrderer("abcdefgh");
const o = orderer("cdefgh")

// const uniques = [];

const startDate = Date.now();

let isFinished = false;
let iteration = 0;
for (combination of u) {
	iteration++;
	if (iteration % 1000 == 0) {
		console.log(iteration, `${Date.now() - startDate}ms`);
	}
}

// while (!isFinished) {
// 	iteration++;
// 	const res = u.next();
// 	if (res.done) {
// 		isFinished = true;
// 		break;
// 	}
// 	const val = res.value.join("");
// 	if (iteration % 1000 == 0) {
// 		console.log(iteration, `${Date.now() - startDate}ms`);
// 	}
// 	// console.log(val);
// 	// if (uniques.indexOf(val) !== -1) {
// 	// 	console.log(val, "already exists");
// 	// } else {
// 	// 	uniques.push(val);
// 	// }
// }

console.log(`finished after ${Date.now() - startDate}ms`);

// const startDate2 = Date.now();
