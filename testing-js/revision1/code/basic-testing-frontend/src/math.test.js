import { it, expect } from 'vitest';

import { add } from './math';

it('should sum all numbers of the array', () => {
	const numbers = [1, 2, 3];
	const expectedResult = numbers.reduce((curRes, num) => curRes + num, 0);

	const result = add(numbers);

	expect(result).toBe(expectedResult);
});

it('should yield NaN if invalid input is passed', () => {
	const inputs = [1, 2, undefined];

	const result = add(inputs);

	expect(result).toBe(NaN);
});

it('should yield a valid sum if numeric string values are passed', () => {
	const inputs = ['1', '2', '3'];
	const expectedResult = inputs.reduce((curRes, input) => curRes + +input, 0);

	const result = add(inputs);

	expect(result).toBe(expectedResult);
});

it('should yield 0 if an empty array is passed', () => {
	const input = [];

	const result = add(input);

	expect(result).toBe(0);
});

it('should throw an error if no value is passed', () => {
	const addFn = () => {
		add();
	};

	expect(addFn).toThrow();
});

it('should throw an error if no array is passed', () => {
	const num1 = 1;
	const num2 = 2;

	const addFn = () => {
		add(num1, num2);
	};

	expect(addFn).toThrow(/is not iterable/);
});
