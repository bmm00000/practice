// --- Directions
// Given a string, return a new string with the reversed
// order of characters
// --- Examples
//   reverse('apple') === 'leppa'
//   reverse('hello') === 'olleh'
//   reverse('Greetings!') === '!sgniteerG'

function reverse(str) {
	// my solution:
	// let newStr = '';
	// for (let i = str.length - 1; i >= 0; i--) {
	// 	newStr += str[i];
	// }
	// return newStr;
	// but try to avoid the classical loops syntax, since it's very easy to make mistakes

	// first solution:
	// we turn the string into an array, then reverse it, and then turn it into a string:
	// return str.split('').reverse().join('');

	//second solution:
	let reversed = '';
	for (let character of str) {
		reversed = character + reversed;
		// debugger; // it will inspect after each iteration of the for loop is made
	}
	return reversed;

	// third solution:
	// return str.split('').reduce((reversed, character) => {
	// 	return character + reversed;
	// }, '');
	// third solution refactored:
	// return str.split('').reduce((rev, char) => char + rev, '');

	// if you want to use the debugger:
	// debugger;
	// return str.split('').reduce((rev, char) => char + rev, '');
	// you have to call the function in this file if you use the debugger:
}
// reverse('hellothere');
// and then in the CLI you type 'node inspect index.js', then you type 'c' (continue) to execute the function until it pauses in the 'debugger' statement. then you type 'repl' and then you can type to inspect the variables that you are dealing with.

module.exports = reverse;

// to run the tests in jest: 'jest reversestring/test.js --watch', or 'jest reversestring --watch' also works
// when you are running the test, every time you make any changes, it runs the test automatically (you can also do it pressing enter). to exit the running test, press control + C
