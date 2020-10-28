// --- Directions
// Given an integer, return an integer that is the reverse
// ordering of numbers.
// --- Examples
//   reverseInt(15) === 51
//   reverseInt(981) === 189
//   reverseInt(500) === 5
//   reverseInt(-15) === -51
//   reverseInt(-90) === -9

function reverseInt(n) {
	// my solution:
	// const str = n.toString();

	// let reversedStr = '';
	// for (let char of str) {
	// 	reversedStr = char + reversedStr;
	// }
	// if (Math.sign(n) === 1 || Math.sign(n) === 0) {
	// 	return parseInt(reversedStr);
	// }
	// if (Math.sign(n) === -1) {
	// 	return -parseInt(reversedStr);
	// }

	// first solution:
	// const reversedStr = n.toString().split('').reverse().join('');

	// if (n < 0) {
	// 	return parseInt(reversedStr) * -1;
	// }
	// return parseInt(reversedStr);

	// second solution:
	const reversedStr = n.toString().split('').reverse().join('');

	return parseInt(reversedStr) * Math.sign(n);
}

module.exports = reverseInt;
