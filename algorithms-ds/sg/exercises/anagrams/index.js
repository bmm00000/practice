// --- Directions
// Check to see if two provided strings are anagrams of eachother.
// One string is an anagram of another if it uses the same characters
// in the same quantity. Only consider characters, not spaces
// or punctuation.  Consider capital letters to be the same as lower case
// --- Examples
//   anagrams('rail safety', 'fairy tales') --> True
//   anagrams('RAIL! SAFETY!', 'fairy tales') --> True
//   anagrams('Hi there', 'Bye there') --> False

// word.replace(/[^\w]/g, "").toLowerCase()

function anagrams(stringA, stringB) {
	// my solution:
	// const strA = stringA.replace(/[^\w]/g, '').toLowerCase();
	// const strB = stringB.replace(/[^\w]/g, '').toLowerCase();

	// const objA = {};
	// for (let char of strA) {
	// 	objA[char] = objA[char] + 1 || 1;
	// }

	// const objB = {};
	// for (let char of strB) {
	// 	objB[char] = objB[char] + 1 || 1;
	// }

	// const results = [];
	// for (let key in objA) {
	// 	const res = objA[key] === objB[key];
	// 	results.push(res);
	// }

	// return (
	// 	strA.length === strB.length && results.every((result) => result === true)
	// );

	// my solution refactored:
	const strA = stringA.replace(/[^\w]/g, '').toLowerCase();
	const strB = stringB.replace(/[^\w]/g, '').toLowerCase();

	const createObj = (str) => {
		const obj = {};
		for (let char of str) {
			obj[char] = obj[char] + 1 || 1;
		}
		return obj;
	};

	const objA = createObj(strA);
	const objB = createObj(strB);

	const results = [];
	for (let key in objA) {
		results.push(objA[key] === objB[key]);
	}

	return (
		strA.length === strB.length && results.every((result) => result === true)
	);
}

module.exports = anagrams;
