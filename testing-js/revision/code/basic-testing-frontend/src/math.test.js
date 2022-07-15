import { it, expect } from 'vitest';

import { add } from './math';

it('should sum up all the numbers of the array', () => {
	// arrange:
	const numbers = [1, 2];

	// act
	const result = add(numbers);

	// assert:
	const expectedResult = numbers.reduce(
		(prevVal, curVal) => prevVal + curVal,
		0
	);
	expect(result).toBe(expectedResult);
});

it('should return NaN if an invalid value is provided', () => {
	const numbers = ['invalid', 1];

	const result = add(numbers);

	expect(result).toBeNaN();
});

it('should sum up all the numbers even if numbers of type string are provided', () => {
	const numbers = ['1', '2'];

	const result = add(numbers);

	const expectedResult = numbers.reduce(
		(prevVal, curVal) => prevVal + +curVal,
		0
	);
	expect(result).toBe(expectedResult);
});

it('should yield the number 0 if an empty array is provided', () => {
	const numbers = [];

	const result = add(numbers);

	expect(result).toBe(0);
});

it('should throw an error if no argument is passed into the function', () => {
	const result = () => {
		add();
	};

	expect(result).toThrowError(/is not iterable/);

	// try {
	// 	const result = add();
	// } catch (error) {
	// 	expect(error).toBeDefined();
	// }
});

it('should throw an error if provided with multiple arguments instead of an array', () => {
	const result = () => {
		add(1, 2);
	};

	expect(result).toThrow(/is not iterable/);
});
