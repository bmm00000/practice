import { it, expect } from 'vitest';
import { transformToNumber } from './numbers';

it('returns a number when a numerical string is provided as an argument', () => {
	const numString = '1';

	const result = transformToNumber(numString);

	const expectedResult = +numString;
	expect(result).toBe(expectedResult);
});
