import { it, expect, vi } from 'vitest';

import { sendDataRequest } from './http';

const responseData = { resData: 'res-data' };
const fetchStub = vi.fn((url, config) => {
	return new Promise((resolve, reject) => {
		if (typeof config.body !== 'string') {
			reject('this is not json!');
		}

		resolve({
			ok: true,
			json() {
				return new Promise((resolve, reject) => {
					resolve(responseData);
				});
			},
		});
	});
});
vi.stubGlobal('fetch', fetchStub);

it('should resolve to response data', () => {
	const testData = { data: 'data' };

	expect(sendDataRequest(testData)).resolves.toEqual(responseData);
});

it('should have a body converted to json', async () => {
	const testData = { data: 'data' };

	let errMessage;
	try {
		await sendDataRequest(testData);
	} catch (err) {
		errMessage = err;
	}

	expect(errMessage).not.toBe('this is not json!');
});
