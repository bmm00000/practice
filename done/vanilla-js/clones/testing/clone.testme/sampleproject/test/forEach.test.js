const { forEach } = require('../index');
const assert = require('assert');

let numbers;
beforeEach(() => {
	numbers = [1, 2, 3];
});

it('Testing forEach, it has to sum the array!', () => {
	let sum = 0;
	forEach(numbers, (value) => {
		sum += value;
	});
	assert.strictEqual(sum, 6);

	numbers.push(4);
	numbers.push(4);
});

it('Testing that beforeEach works!', () => {
	assert.strictEqual(numbers.length, 3);
});
