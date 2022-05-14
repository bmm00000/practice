import { it, expect } from 'vitest';

import { transformToNumber } from './numbers';

it('should transform a string number to a number of type number', () => {
	const input = '1';

	const result = transformToNumber(input);

	expect(result).toBeTypeOf('number');
});
// you always have to be thinking about corner cases in different scenarios. for example, the former test will still pass if we return NaN in the transformToNumber function (because NaN is of type number). in this situation, that's why we add the following test (the same description, but covering this corner case):

it('should transform a string number to a number of type number', () => {
	const input = '1';

	const result = transformToNumber(input);

	// const expectedValue = +input;
	// expect(result).toBe(expectedValue);

	// or:

	expect(result).toBe(+input);
});

it('should yield NaN for non-transformable values', () => {
	const input = 'invalid';
	const input2 = {};

	const result = transformToNumber(input);
	const result2 = transformToNumber(input2);

	expect(result).toBeNaN();
	expect(result2).toBeNaN();
});
// you can add multiple expectations to the same test (as soon as one of the multiple expectations throws an error, the whole test will fail), but you should be careful about it, so everything makes sense.
// note that, technically 'expect()' does not return 'true' or 'false'. instead, it throws an error, if the expectation is not met. the test runner treats thrown errors as failed tests and tests that do not throw as passed.

// the following test is mine (not in the course):
it('should yield a number for number values', () => {
	const number = 1;

	const result = transformToNumber(number);

	const expectedValue = number;
	expect(result).toBe(expectedValue);
});
