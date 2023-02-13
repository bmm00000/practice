import { describe, it, expect } from 'vitest';
import { HttpError, ValidationError } from './errors';

describe('class HttpError', () => {
	it('should have the following keys: statusCode, message, data', () => {
		const testStatusCode = 404;
		const testMessage = 'message';
		const testData = 'data';

		const testError = new HttpError(testStatusCode, testMessage, testData);

		expect(testError).toHaveProperty('statusCode');
		expect(testError).toHaveProperty('message');
		expect(testError).toHaveProperty('data');
	});
});

describe('class ValidationError', () => {
	it('should have the following keys: message', () => {
		const testMessage = 'test-message';

		const testError = new ValidationError(testMessage);

		expect(testError).toHaveProperty('message');
	});
});
