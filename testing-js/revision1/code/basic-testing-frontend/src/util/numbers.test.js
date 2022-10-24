import { it, expect } from 'vitest';

import { transformToNumber } from './numbers';

it('should return a number, if a number is passed', () => {
	const input = 1;

	const result = transformToNumber(input);

	expect(result).toBe(input);
});

it('should return a number, if a string number is passed', () => {
	const input = '1';

	const result = transformToNumber(input);

	const expectedResult = parseInt(input);
	expect(result).toBe(expectedResult);
});
