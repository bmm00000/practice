import { it, expect } from 'vitest';
import { validateNotEmpty } from './validation';

it('should throw with the error message provided, if no text is provided', () => {
	const testErrorMessage = 'error-message';

	const testFn = () => validateNotEmpty('', testErrorMessage);

	expect(testFn).toThrow(testErrorMessage);
});
