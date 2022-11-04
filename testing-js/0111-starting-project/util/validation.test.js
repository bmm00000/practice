import { it, expect } from 'vitest';

import { validateNotEmpty } from './validation';

it('should throw if an empty string is passed', () => {
	const fn = () => {
		validateNotEmpty('', 'error message');
	};
	expect(fn).toThrow();
});

it('should throw if no argument is passed', () => {
	const fn = () => {
		validateNotEmpty();
	};
	expect(fn).toThrow();
});
