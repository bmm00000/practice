import { vi, it, expect } from 'vitest';

import { sendDataRequest } from './http';
import { HttpError } from './errors';

const parsedData = { parsedData: 'parsed-data' };

const fetchTest = vi.fn((url, configObj) => {
	return new Promise((resolve, reject) => {
		if (typeof configObj.body !== 'string') {
			return reject('Not a string!');
		}
		resolve({
			ok: true,
			json: () => {
				return new Promise((resolve, reject) => {
					resolve(parsedData);
				});
			},
		});
	});
});

vi.stubGlobal('fetch', fetchTest);

it('should return the response data from the "fetch" function after it has been parsed, if response from "fetch" is ok', () => {
	const inputData = 'input-data';

	expect(sendDataRequest(inputData)).resolves.toBe(parsedData);
});

it('should convert the provided data to JSON before sending the request', async () => {
	const inputData = { data: 'data' };
	let errMessg;
	try {
		await sendDataRequest(inputData);
	} catch (err) {
		errMessg = err;
	}
	expect(errMessg).not.toBe('Not a string!');
});

it('should throw an HttpError if response is not ok', () => {
	const inputData = { data: 'data' };
	fetchTest.mockImplementationOnce((url, configObj) => {
		return new Promise((resolve, reject) => {
			resolve({
				ok: false,
				json: () => {
					return new Promise((resolve, reject) => {
						resolve(parsedData);
					});
				},
			});
		});
	});

	return expect(sendDataRequest(inputData)).rejects.toBeInstanceOf(HttpError);
});
