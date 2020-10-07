const assert = require('assert');
const { forEach, map } = require('../index');

// let sum = 0;
// forEach([ 1, 2, 3 ], (value) => {
// 	sum += value;
// });

// assert.strictEqual(sum, 6);

// const result = map([ 1, 2, 3 ], (value) => {
// 	return value * 2;
// });

// assert.deepStrictEqual(result, [ 2, 4, 6 ]);

// const test = (desc, fn) => {
// 	console.log('---', desc);
// 	try {
// 		fn();
// 	} catch (err) {
// 		console.log(err.message);
// 	}
// };

// test('This is forEach', () => {
// 	let sum = 0;
// 	forEach([ 1, 2, 3 ], (value) => {
// 		sum += value;
// 	});

// 	assert.strictEqual(sum, 6);
// });

// test('This is map', () => {
// 	const result = map([ 1, 2, 3 ], (value) => {
// 		return value * 2;
// 	});

// 	assert.deepStrictEqual(result, [ 2, 4, 6 ]);
// });

it('This is forEach', () => {
	let sum = 0;
	forEach([ 1, 2, 3 ], (value) => {
		sum += value;
	});

	assert.strictEqual(sum, 6);
});

it('This is map', () => {
	const result = map([ 1, 2, 3 ], (value) => {
		return value * 2;
	});

	assert.deepStrictEqual(result, [ 2, 4, 6 ]);
});
