// --- Directions
// Write a function that accepts a positive number N.
// The function should console log a step shape
// with N levels using the # character.  Make sure the
// step has spaces on the right hand side!
// --- Examples
//   steps(2)
//       '# '
//       '##'
//   steps(3)
//       '#  '
//       '## '
//       '###'
//   steps(4)
//       '#   '
//       '##  '
//       '### '
//       '####'

function steps(n) {
	// for (let row = 0; row < n; row++) {
	// 	let string = '';
	// 	for (let column = 0; column < n; column++) {
	// 		if (row >= column) {
	// 			string += '#';
	// 		} else {
	// 			string += ' ';
	// 		}
	// 	}
	// 	console.log(string);
	// }

	for (let i = 0; i < n; i++) {
		let str = '';
		for (let j = 0; j < n; j++) {
			if (i >= j) {
				str += '#';
			} else {
				str += ' ';
			}
		}
		console.log(str);
	}
}

module.exports = steps;
