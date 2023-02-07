import { describe, it, expect } from 'vitest';
import { validateStringNotEmpty } from './validation';
import { validateNumber } from './validation';

describe('validateStringNotEmpty()', () => {
	it('should throw an error if an empty string is passed as an argument', () => {
		const input = ' ';

		const resultFn = () => validateStringNotEmpty(input);

		expect(resultFn).toThrow(/must not be empty/i);
	});

	it('should not throw an error if a non-empty string is passed as an argument', () => {
		const input = 'input';

		const resultFn = () => validateStringNotEmpty(input);

		expect(resultFn).not.toThrow();
	});
});

describe('validateNumber()', () => {
	it('should throw if a NaN value is passed as an argument', () => {
		const input = NaN;

		const resultFn = () => validateNumber(input);

		expect(resultFn).toThrow(/invalid number input/i);
	});

	it('should not throw if a non-NaN value is passed as an argument', () => {
		const input = 1;

		const resultFn = () => validateNumber(input);

		expect(resultFn).not.toThrow();
	});
});
