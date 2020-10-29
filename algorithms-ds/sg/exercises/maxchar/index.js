// --- Directions
// Given a string, return the character that is most
// commonly used in the string.
// --- Examples
// maxChar("abcccccccd") === "c"
// maxChar("apple 1231111") === "1"

function maxChar(str) {
	// my solution:
	// const obj = {};

	// for (let char of str) {
	// 	if (!obj[char]) {
	// 		obj[char] = 1;
	// 	} else {
	// 		obj[char] += 1;
	// 	}
	// }

	// const values = [];
	// for (let key in obj) {
	// 	values.push(obj[key]);
	// }

	// const maxFrequency = Math.max(...values);

	// for (let key in obj) {
	// 	if (obj[key] === maxFrequency) {
	// 		return key;
	// 	}
	// }

	// second solution:
	const chars = {};
	let max = 0;
	let maxChar = '';

	for (let char of str) {
		chars[char] = chars[char] + 1 || 1;
	}

	for (let key in chars) {
		if (chars[key] > max) {
			max = chars[key];
			maxChar = key;
		}
	}
	return maxChar;
}

module.exports = maxChar;
