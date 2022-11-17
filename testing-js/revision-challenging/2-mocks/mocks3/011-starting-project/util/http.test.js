import { it, expect, vi } from 'vitest';

import { sendDataRequest } from './http';
import { HttpError } from './errors';

const parsedTestFetchResponse = { parsedRes: 'parsed res' };

const testFetch = vi.fn((url, options) => {
	return new Promise((resolve, reject) => {
		if (typeof options.body !== 'string') {
			reject('The data should be stringified!');
		}

		const testFetchResponse = {
			ok: true,
			json() {
				return new Promise((resolve, reject) => {
					resolve(parsedTestFetchResponse);
				});
			},
		};
		resolve(testFetchResponse);
	});
});

vi.stubGlobal('fetch', testFetch);

it('should return a response from the request', () => {
	const testData = { test: 'test' };

	return expect(sendDataRequest(testData)).resolves.toEqual(
		parsedTestFetchResponse
	);
});

it('should stringify the data passed as a body', async () => {
	const testData = { test: 'test' };

	let errorMessage;
	try {
		await sendDataRequest(testData);
	} catch (err) {
		errorMessage = err;
	}

	expect(errorMessage).not.toBe('The data should be stringified!');
});

it('should throw an error of type HttpError if response is not ok', () => {
	const testData = { test: 'test' };

	testFetch.mockImplementationOnce((url, options) => {
		return new Promise((resolve, reject) => {
			const testFetchResponse = {
				ok: false,
				json() {
					return new Promise((resolve, reject) => {
						resolve(parsedTestFetchResponse);
					});
				},
			};
			resolve(testFetchResponse);
		});
	});

	expect(sendDataRequest(testData)).rejects.toBeInstanceOf(HttpError);
});
