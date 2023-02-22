import { it, expect, vi } from 'vitest';
import { sendDataRequest } from './http';
import { HttpError } from './errors';

const testResponseData = { resData: 'response data' };

const testFetch = vi.fn((url, configObj) => {
	return new Promise((resolve, reject) => {
		if (typeof url !== 'string') {
			return reject('Url is not of type string');
		}

		if (configObj.method !== 'POST' && configObj.method !== 'post') {
			return reject('Http method is not POST');
		}

		if (
			!configObj.headers['Content-Type'] ||
			configObj.headers['Content-Type'] !== 'application/json'
		) {
			return reject('Headers are incorrect');
		}

		if (typeof configObj.body !== 'string') {
			return reject('Body is not JSON');
		}

		const testResponse = {
			ok: true,
			json: () => {
				return new Promise((resolve, reject) => resolve(testResponseData));
			},
		};
		resolve(testResponse);
	});
});

vi.stubGlobal('fetch', testFetch);

it('the fetch function should receive a url that is a string (first argument)', async () => {
	const testData = { testD: 'test data' };

	let errorMessage;
	try {
		await sendDataRequest(testData);
	} catch (err) {
		errorMessage = err;
	}
	expect(errorMessage).not.toBe('Url is not of type string');
});

it('the fetch function should receive the right configuration object (second argument)', async () => {
	const testData = { testD: 'test data' };

	let errorMessage;
	try {
		await sendDataRequest(testData);
	} catch (err) {
		errorMessage = err;
	}
	expect(errorMessage).not.toBe('Http method is not POST');
	expect(errorMessage).not.toBe('Headers are incorrect');
	expect(errorMessage).not.toBe('Body is not JSON');
});

it('should return a promise that eventually resolves', async () => {
	const testData = { testD: 'test data' };

	await expect(sendDataRequest(testData)).resolves.toBeDefined();
});

it('should throw an HttpError, if the response object that we get from calling "fetch" does not have the key "ok" with a truthy value', async () => {
	testFetch.mockImplementationOnce((url, configObj) => {
		return new Promise((resolve, reject) => {
			const testResponse = {
				ok: false,
				json: () => {
					return new Promise((resolve, reject) => resolve(testResponseData));
				},
			};
			resolve(testResponse);
		});
	});

	const testData = { testD: 'test data' };

	await expect(sendDataRequest(testData)).rejects.toBeInstanceOf(HttpError);
});

it('should return a promise that eventually resolves in the returned value from calling the "json" method to the response object that we get from calling "fetch"', async () => {
	const testData = { testD: 'test data' };

	await expect(sendDataRequest(testData)).resolves.toEqual(testResponseData);
});
