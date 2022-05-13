import { it, expect } from 'vitest';

import { add } from './math';

it('should summarize all number values in an array', () => {
	// Arrange:
	const numbers = [1, 2];

	// Act:
	const result = add(numbers);

	// Assert:
	// you could do the following:
	// expect(result).toBe(6);
	// BUT remember, you don't hard code the result that you expect, because, if you changed the 'numbers' array but then you forgot teh change the hard coded result, then you would have incorrect results, so you will end up looking for the bug in math.js, but the bug is on the test! to avoid this situation, you derive the results programmatically inside of the test (this way, if you change the 'numbers' array, you don't need to change anything else and the test will run correctly):
	const expectedResult = numbers.reduce(
		(prevVal, curVal) => prevVal + curVal,
		0
	);
	expect(result).toBe(expectedResult);
});

it('should yield NaN if at least one invalid number is provided', () => {
	const inputs = ['invalid', 1];

	const result = add(inputs);

	expect(result).toBeNaN();
});
// this test will fail with the original 'add' function. since the behaviour that we expect is what we are describing in the test, now we know that there's something wrong with the 'add' function (our test detected a problem with the 'add' function: this is the idea behind of writing tests: you want to detect a problem with your code now, or in the future if any of your colleagues changes something in the code), so we need to correct the 'add' function. if we follow the TDD approach, first we define in the tests the behaviours that we expect, and then we write the code to fulfill the expectations of the tests.

it('should yield a correct sum if an array of numeric string values is provided', () => {
	const numbers = ['1', '2'];

	const result = add(numbers);

	const expectedResult = numbers.reduce(
		(prevVal, curVal) => +prevVal + +curVal,
		0
	);

	expect(result).toBe(expectedResult);
});
// in this test, it happens the same as in the former test.

it('should yield 0 if an empty array is provided', () => {
	const numbers = [];

	const result = add(numbers);

	expect(result).toBe(0);
});

it('should throw an error if no value is passed into the function', () => {
	// how to write that you expect this to throw an error? (because an error is not a value returned when you call the 'add' function above, since in js errors bubble up). so how to check if certain function throws an error? you can't look for the returned value, because in js, errors are not returned, but thrown, so you have to catch it. the following would work:
	// try {
	// 	const result = add();
	// } catch (error) {
	// 	expect(error).toBeDefined();
	// }
	// but the following is more convenient:
	const resultFn = () => {
		add();
	};
	expect(resultFn).toThrow();
	// vitest will call the resultFn function for us, and check whether or not it throws. by adding 'add()' inside of a function, we make sure that it's not executed immediately, but only when the test is run.

	// if you wanted to check for the opposite (for example, not to throw an error):
	// expect(resultFn).not.toThrow();
	// the 'not' property exists for all the functions with 'to' (toBe, toThrow, etc.)
});
