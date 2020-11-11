// --- Directions
// Write a function that accepts a string.  The function should
// capitalize the first letter of each word in the string then
// return the capitalized string.
// --- Examples
//   capitalize('a short sentence') --> 'A Short Sentence'
//   capitalize('a lazy fox') --> 'A Lazy Fox'
//   capitalize('look, it is working!') --> 'Look, It Is Working!'

function capitalize(str) {
	const resArr = [];
	for (let word of str.split(' ')) {
		const capWord = word[0].toUpperCase().concat('', word.slice(1));
		// instead of the 'concat' method, you can just use '+'
		resArr.push(capWord);
	}
	return resArr.join(' ');
}

module.exports = capitalize;