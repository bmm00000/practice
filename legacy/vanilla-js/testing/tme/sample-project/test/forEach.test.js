const assert = require('assert');
const { forEach } = require('../index');

// we are going to implement a beforeEach function (same as mocha). keep in mind that beforeEach in mocha takes care of many corner cases that we will not care about (that's why our framework will work in only 80% of the situations), we will just make sure that our beforeEach is run before any 'it' test.
let numbers;
beforeEach(() => {
	numbers = [ 1, 2, 3 ];
});

it('Should sum an array', () => {
	let total = 0;
	forEach(numbers, (value) => {
		total += value;
	});

	assert.strictEqual(total, 6);

	// now we are destroying the 'numbers' array to test the following test (meta):
	numbers.push(3);
	numbers.push(3);
	numbers.push(3);
	numbers.push(3);
});

// we are implementing a test for our testing framework (meta) lol:
it('beforeEach is run each time', () => {
	assert.strictEqual(numbers.length, 3);
});
