import { it, expect, describe } from 'vitest';

import { validateStringNotEmpty } from './validation';
import { validateNumber } from './validation';

// MY TESTS:

describe('My suit: validateStringNotEmpty()', () => {
	it('should throw for empty strings', () => {
		const input = '';

		// const result = validateStringNotEmpty(input);
		// expect(result).toThrow()
		// like this, the test would always fail, because validateStringNotEmpty would always throw an error before we get to the 'expect' line, so we could never get to the assertion. that's why we include the function in another function, so we don't call it until we get to the assertion:

		const resultFn = () => {
			validateStringNotEmpty(input);
		};

		expect(resultFn).toThrow(/Invalid input - must not be empty./);
	});

	it('should not throw for non-empty strings', () => {
		const input = 'string';

		const resultFn = () => {
			validateStringNotEmpty(input);
		};

		expect(resultFn).not.toThrow(/Invalid input - must not be empty./);
	});
});

describe('My suit: validateNumber()', () => {
	it('should throw for NaN values', () => {
		const input = NaN;

		const resultFn = () => {
			validateNumber(input);
		};

		expect(resultFn).toThrow(/Invalid number input./);
	});

	it('should not throw for number values', () => {
		const input = 1;

		const resultFn = () => {
			validateNumber(input);
		};

		expect(resultFn).not.toThrow(/Invalid number input./);
	});
});

// THE COURSE'S TESTS:

describe('The course suit: validateStringNotEmpty()', () => {
	it('should throw an error, if an empty string is provided', () => {
		const input = '';
		const validationFn = () => validateStringNotEmpty(input);
		expect(validationFn).toThrow();
	});

	it('should throw an error with a message that contains a reason (must not be empty)', () => {
		const input = '';
		const validationFn = () => validateStringNotEmpty(input);
		expect(validationFn).toThrow(/must not be empty/);
	});

	it('should throw an error if a long string of blanks is provided', () => {
		const input = '';
		const validationFn = () => validateStringNotEmpty(input);
		expect(validationFn).toThrow();
	});

	it('should throw an error if any other value than a string is provided', () => {
		const inputNum = 1;
		const inputBool = true;
		const inputObj = {};

		const validationFnNum = () => validateStringNotEmpty(inputNum);
		const validationFnBool = () => validateStringNotEmpty(inputBool);
		const validationFnObj = () => validateStringNotEmpty(inputObj);

		expect(validationFnNum).toThrow();
		expect(validationFnBool).toThrow();
		expect(validationFnObj).toThrow();
	});

	it('should not throw an error, if a non-empty string is provided', () => {
		const input = 'valid';
		const validationFn = () => validateStringNotEmpty(input);
		expect(validationFn).not.toThrow();
	});
});

describe('The course suit: validateNumber()', () => {
	it('should throw an error if NaN is provided', () => {
		const input = NaN;
		const validationFn = () => validateNumber(input);
		expect(validationFn).toThrow();
	});

	it('should throw an error with a message that contains a reason (invalid number)', () => {
		const input = NaN;
		const validationFn = () => validateNumber(input);
		expect(validationFn).toThrow(/Invalid number/);
	});

	it('should throw an error if a non-numeric value is provided', () => {
		const input = '1';
		const validationFn = () => validateNumber(input);
		expect(validationFn).toThrow();
	});

	it('should not throw an error, if a number is provided', () => {
		const input = 1;
		const validationFn = () => validateNumber(input);
		expect(validationFn).not.toThrow();
	});
});
