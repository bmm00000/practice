import { describe, it, expect } from 'vitest';

import { transformToNumber, cleanNumbers } from './numbers';

describe('transformToNumber()', () => {
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
});

describe('cleanNumbers()', () => {
	it('should return an array of number values if an array of string number values is provided', () => {
		const numberValues = ['1', '2'];

		const cleanedNumbers = cleanNumbers(numberValues);

		// expect(cleanedNumbers[0]).toBeTypeOf('number');
		// the former assertion works, but you could think that the following would also work, but it doesnt! because 'toBe' checks for exact equality, and arrays are reference values:
		// expect(cleanedNumbers).toBe([1, 2]);
		// given this situation, for convenience, jest and vitest support the 'toEqual' method (it doesn't check for exact equality, but it goes through the value that you pass, and it does a deep comparison (all the properties and values will be compared to each other) of that value with the value that you are evaluating). therefore, it will compare if the values inside of the array are the same or not:
		expect(cleanedNumbers).toEqual([1, 2]);
	});

	it('should throw an error if an array with at least one empty string is provided', () => {
		const numberValues = ['', 1];

		const cleanFn = () => cleanNumbers(numberValues);

		expect(cleanFn).toThrow();
	});
});
// the two former tests could be considered as integration tests, because, by executing cleanNumbers, we are also implicitly executing the validation functions inside of cleanNumbers. this matters, because, even though we can successfully test all units, we could combine them in such a way that they still don't work correctly in combination (in our example, imagine that you made in a mistake in the order of the validation functions inside of cleanNumbers. in that case, the unit tests will pass, but the integration test will fail, which will lead us to realize about our mistake in the cleanNumbers function).

// you could think 'why to write so many unit tests? since a single integration test already implicitly tests all these functions!' but you should always write tests for all units that make sense, because otherwise, as code changes in the future, if a bug is introduced, it would be challenging to find the cause.
