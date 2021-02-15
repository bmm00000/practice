const assert = require('assert');
const { forEach, map } = require('./index');

// // TEST WITHOUT THIRD-PARTY LIBRARIES
// let sum = 0;
// forEach([ 1, 2, 3 ], (value) => {
// 	sum += value;
// });

// if (sum !== 6) {
// 	throw new Error('The sum must equal to 6!');
// }

// // ANOTHER TEST WITHOUT THIRD-PARTY LIBRARIES
// //(test driven developement: in the following case, we wrote the test first and then the function in 'index.js')
// const result = map([ 1, 2, 3 ], (value) => {
// 	return value * 2;
// });

// if (result[0] !== 2) {
// 	throw new Error(`Expected result 2 but found ${result[0]}`);
// }
// if (result[1] !== 4) {
// 	throw new Error(`Expected result 4 but found ${result[1]}`);
// }
// if (result[2] !== 6) {
// 	throw new Error(`Expected result 6 but found ${result[2]}`);
// }

// HOWEVER, without any third-party libraries, we have a few problems here:
// 1- Our variables have global scope in the file, for example, we cannot use the variable name 'result' in another test, since we already have it, so we would need to use 'result1', 'result2', etc.
// 2- If there is an error, the 'throw' statement will stop the execution of the file, so the rest of the code will not be tested.
// 3- We don't have good description of what test failed, thus it's difficult to identify what test failed: you have to look at the message printed in the console, and then search for that message in the tests of the file, which may not be very practical (if you have hundreds of lines of code, for example)

// IN ORDER TO SOLVE THESE PROBLEMS, we use the test function, as follows:

// const test = (desc, fn) => {
// 	console.log('----', desc);
// 	try {
// 		fn();
// 	} catch (err) {
// 		console.log(err.message);
// 	}
// };

// test('The forEach function', () => {
// 	let sum = 0;
// 	forEach([ 1, 2, 3 ], (value) => {
// 		sum += value;
// 	});

// 	if (sum !== 6) {
// 		throw new Error('The sum must equal to 6!');
// 	}
// });

// test('The map function', () => {
// 	const result = map([ 1, 2, 3 ], (value) => {
// 		return value * 2;
// 	});

// 	if (result[0] !== 2) {
// 		throw new Error(`Expected result 2 but found ${result[0]}`);
// 	}
// 	if (result[1] !== 4) {
// 		throw new Error(`Expected result 4 but found ${result[1]}`);
// 	}
// 	if (result[2] !== 6) {
// 		throw new Error(`Expected result 6 but found ${result[2]}`);
// 	}
// });

// NOW WE SOLVED THE THREE ISSUES: we can reuse the same variable names in different functions, we have a little description of the test, and our execution will not stop when there's an error (since we have a 'catch' and 'error' statement in the 'test' function)
// THIS THE THE APPROACH THAT EVERY THIRD-PARTY LIBRARY USES!!

// HOWEVER, we still have different 'if' statements that look very similar and that we can refactor. That's why we go to the node standard library, and check 'Assertion Testing', look for the 'assert.strictEqual' function.
// Also we can use the same structure to work with Mochajs (a third party library), and we only need to use 'it' instead of 'test'!!
// You need to install mocha from npm (check documentation) (you can do 'npx mocha' to run mocha without installing it. if you use 'npx mocha', you need to rename your file from index.test.js to test.js, since mocha will look for that)
// if you installed mocha, then you can execute it typing 'npm test index.test.js' (look at the 'scripts' in package.json)

it('The forEach function', () => {
	let sum = 0;
	forEach([ 1, 2, 3 ], (value) => {
		sum += value;
	});

	assert.strictEqual(sum, 6, 'Expected forEach to sum the array');
});

it('The map function', () => {
	const result = map([ 1, 2, 3 ], (value) => {
		return value * 2;
	});

	// assert.strictEqual(result[0], 2);
	// assert.strictEqual(result[1], 4);
	// assert.strictEqual(result[2], 6);
	// OR, you can refactor these three statements with the following ('deepStrictEqual' compares the entire array):
	assert.deepStrictEqual(result, [ 2, 4, 6 ]);
});
