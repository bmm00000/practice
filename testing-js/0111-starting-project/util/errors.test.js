import { describe, it, expect, beforeAll } from 'vitest';

import { HttpError } from './errors';

describe('HttpError', () => {
	let error;
	beforeAll(() => {
		const statusCode = 'status-code';
		const message = 'message';
		const data = 'data';
		error = new HttpError(statusCode, message, data);
	});

	it('should have statusCode property', () => {
		expect(error).toHaveProperty('statusCode');
	});

	it('should have message property', () => {
		expect(error).toHaveProperty('message');
	});

	it('should have data property', () => {
		expect(error).toHaveProperty('data');
	});
});
