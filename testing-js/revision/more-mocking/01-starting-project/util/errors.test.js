import { describe, it, expect, beforeAll } from 'vitest';

import { HttpError, ValidationError } from './errors';

describe('HttpError class', () => {
	let testError;
	beforeAll(() => {
		testError = new HttpError('test-status-code', 'test-message', 'test-data');
	});

	it('should create objects with a statusCode property', () => {
		expect(testError).toHaveProperty('statusCode');
	});

	it('should create objects with a message property', () => {
		expect(testError).toHaveProperty('message');
	});

	it('should create objects with a data property', () => {
		expect(testError).toHaveProperty('data');
	});
});

describe('ValidationError class', () => {
	let testError;
	beforeAll(() => {
		testError = new ValidationError('test-message');
	});

	it('should create objects with a message property', () => {
		expect(testError).toHaveProperty('message');
	});
});
