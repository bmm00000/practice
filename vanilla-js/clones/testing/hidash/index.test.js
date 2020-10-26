const assert = require('assert');
const { forEach, map } = require('./index');

// let sum = 0;
// forEach([1, 2, 3], (num) => {
// 	sum += num;
// });
// if (sum !== 6) {
// 	throw new Error('It should have been 6!');
// }

// const result = map([1, 2, 3], (num) => {
// 	return num * 2;
// });
// if (result[0] !== 2) {
// 	throw new Error('el primer valor falla');
// }
// if (result[1] !== 4) {
// 	throw new Error('el second valor falla');
// }
// if (result[2] !== 6) {
// 	throw new Error('el thirddd valor falla');
// }

const test = (desc, fn) => {
	console.log('---', desc);
	try {
		fn();
	} catch (err) {
		console.log(err);
	}
};

it('This is the for each test', () => {
	let sum = 0;
	forEach([1, 2, 3], (num) => {
		sum += num;
	});
	assert.strictEqual(sum, 6);
});

it('This is the map test', () => {
	const result = map([1, 2, 3], (num) => {
		return num * 2;
	});
	assert.deepStrictEqual(result, [2, 5, 6]);
});
