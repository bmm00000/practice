import { it, expect } from 'vitest';

import { transformToNumber } from './numbers';

it('should yield a number if a number type is passed as an argument', () => {
	const number = 1;

	const result = transformToNumber(number);

	expect(result).toBe(number);
});

it('should yield a number if a number of type string is passed as an argument', () => {
	const number = '1';

	const result = transformToNumber(number);

	const expectedResult = +number;
	expect(result).toBe(expectedResult);
});

it('should yield a NaN if a non-number string is passed as an argument', () => {
	const number = 'invalid';

	const result = transformToNumber(number);

	expect(result).toBeNaN();
});
