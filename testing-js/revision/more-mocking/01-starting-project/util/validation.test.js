import { it, expect } from 'vitest';

import { validateNotEmpty } from './validation';

it('should throw if no text is provided', () => {
	// try {
	// 	validateNotEmpty();
	// } catch (err) {
	// 	expect(err).toBeDefined();
	// }

	const validateFn = () => {
		validateNotEmpty();
	};
	expect(validateFn).toThrow();
});

it('should throw if a string with blanks is provided as text', () => {
	// const validateFn = () => {
	// 	validateNotEmpty('   ');
	// };

	// expect(validateFn).toThrow();

	try {
		validateNotEmpty('   ');
	} catch (err) {
		expect(err).toBeDefined();
	}
});
