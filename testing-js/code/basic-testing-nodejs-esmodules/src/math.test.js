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
	// BUT remember, you don't hard code the result that you expect, because, if you changed the 'numbers' array but then you forgot to change the hard coded result, then you would have incorrect results, so you will end up looking for the bug in math.js, but the bug is here on the test! to avoid this situation, you derive the results programmatically inside of the test (this way, if you change the 'numbers' array, you don't need to change anything else and the test will run correctly):
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
	// 	add();
	// } catch (error) {
	// 	expect(error).toBeDefined();
	// }
	// but the following is more convenient:
	const resultFn = () => {
		add();
	};

	// expect(resultFn).toThrow();
	// the above would work, but we add a message because of the reasons explained below:
	expect(resultFn).toThrow(/is not iterable/);
	// vitest will call the resultFn function for us, and check whether or not it throws. by adding 'add()' inside of a function, we make sure that it's not executed immediately, but only when the test is run.

	// if you wanted to check for the opposite (for example, not to throw an error):
	// expect(resultFn).not.toThrow();
	// the 'not' property exists for all the functions with 'to' (toBe, toThrow, etc.)
});

it('should throw an error if provided with multiple arguments instead of an array', () => {
	const num1 = 1;
	const num2 = 2;

	const resultFn = () => {
		add(num1, num2);
	};

	// expect(resultFn).toThrow();
	// the above would work, but you can also pass to toThrow an expected value that you expect to be on the error message (or that you expect to be the instance of the error class that was used). scroll over toThrow and the ide will show you that you could pass a string (which will be the error message we expect to get), a regex (so we are looking for a part of a message), an entire class (Constructable, so we will check if the error that is thrown is of that type of class). we do this because we want to make sure that the error that is thrown is not thrown because of any other reason, but it's thrown because of the reason that we are pointing to (we are checking if we get the exact error that we expect).

	// expect(resultFn).not.toThrow();
	// we try the above in order to see in the test report what kind of error we get in reality, as opposed to what we expect, so then we know that we can add 'is not iterable' to the toThrow function above. therefore, we will use a regex, as follows:

	expect(resultFn).toThrow(/is not iterable/);
	// with the above, we make sure that we are only checking the error that contains that message (otherwise, the error with the message 'something went wrong' that we included in the 'add' function will make this test pass)
});
// we are writing this test, just in case someone changes the 'add' function, and includes more parameters. for example, if someone adds a second parameter to the 'add' function, and then you call it with an array as first argument, it would not throw an error. we want to make sure that the test fails if someone makes changes like this.
