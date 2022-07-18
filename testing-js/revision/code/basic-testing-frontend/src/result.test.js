import { describe, it, expect } from 'vitest';

import { generateResultText } from './result.js';

describe('generateResultText()', () => {
	it('should return a string', () => {
		const input = 1;

		const result = generateResultText(input);

		expect(result).toBeTypeOf('string');
	});
});
