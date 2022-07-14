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
