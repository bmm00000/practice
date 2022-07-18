import { it, expect } from 'vitest';

import { validateStringNotEmpty, validateNumber } from './validation';

it('should throw an "invalid input" error if empty string is passed as an argument', () => {
	const input = '   ';

	const result = () => {
		validateStringNotEmpty(input);
	};

	expect(result).toThrow(/Invalid input - must not be empty./);
});

it('should throw an "invalid number input" error if a NaN is passed as an argument', () => {
	const input = NaN;

	const result = () => {
		validateNumber(input);
	};

	expect(result).toThrow(/Invalid number input./);
});
