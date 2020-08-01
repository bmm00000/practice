// https://cs.slides.com/colt_steele/big-o-notation#/12/0/1
//cs.slides.com/colt_steele/

const { func } = require('prop-types');

// https: function sumUp1(n) {
// 	let total = 0;
// 	for (let i = 1; i <= n; i++) {
// 		total += n;
// 	}
// 	return total;
// }

// function sumUp2(n) {
// 	return n * (n + 1) / 2;
// }

// const t1 = performance.now();
// sumUp1(1000000000000);
// const t2 = performance.now();
// console.log(`Time elapsed: ${t2 - t1 / 1000} seconds.`);

function charCount(str) {
	const count = {};
	for (let char of str) {
		!count[char] ? (count[char] = 1) : count[char]++;
	}
	return count;
}
