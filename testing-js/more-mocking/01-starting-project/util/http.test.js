import { expect, it, vi } from 'vitest';

import { HttpError } from './errors';
import { sendDataRequest } from './http';

const testResponseData = { testKey: 'testData' };

// first version (for the first test):
// const testFetch = vi.fn((url, options) => {
// 	return new Promise((resolve, reject) => {
// 		const testResponse = {
// 			ok: true,
// 			json() {
// 				return new Promise((resolve, reject) => {
// 					resolve(testResponseData);
// 				});
// 			},
// 		};

// 		resolve(testResponse);
// 	});
// });
// as a replacement for 'fetch' we create a function with spy functionality, in case we need it. also, note that we emulate the behaviour of the 'fetch' function, so we are testing that the logic in sendDataRequest (apart from the 'fetch' function) works as expected. if a colleague changed anything in the logic of sendDataRequest (for example, if a colleague accidentally deleted the return of responseData), then the test would fail, so we are testing the behaviour that we want.

// second version (to include the first test and also the second test):
const testFetch = vi.fn((url, options) => {
	return new Promise((resolve, reject) => {
		if (typeof options.body !== 'string') {
			return reject('Not a string.');
		}
		const testResponse = {
			ok: true,
			json() {
				return new Promise((resolve, reject) => {
					resolve(testResponseData);
				});
			},
		};

		resolve(testResponse);
	});
});

// when we call sendDataRequest, we don't want 'fetch' to be executed, we want to mock it away. in former lessons, we did the following:
// vi.mock('fs') // we pass to 'mock' the module to be replaced.
// however, the problem we have now is that 'fetch' is a globally avaialble function (not imported from any module). that's why we call another method from 'vi':
vi.stubGlobal('fetch', testFetch);
// it allows us to replace globally available objects or functions with other implementations. the first argument is a string with the name of the globally available function that you want to replace, and the second argument is the replacement. note that stubGlobal works, no matter if we are in the frontend or backend.

it('should return any available response data', () => {
	const testData = { key: 'test' };

	return expect(sendDataRequest(testData)).resolves.toEqual(testResponseData);
});

// Mocking Frontend Libraries
// In this example project, the global fetch() API / function is used.

// You can, of course, also use third-party libraries in frontend JavaScript projects though. For example, the axios library is a very popular library for sending HTTP requests from the frontend.

// In case you're working with such a library, instead of a global value, you can mock that library as you learned in the previous section (i.e., use vi.mock('axios'), provide a __mocks__/axios.js file if necessary etc.).

// does our code convert to json the data passed to sendDataRequest in the process of sending it to the backend? what we are testing is if we have JSON.stringify() in our code (the real 'fetch' function would fail to send the request if we passed non-stringified data):
// it('should convert the provided data to JSON before sending the request', () => {
// 	const testData = { key: 'test' };

// 	// return expect(sendDataRequest(testData)).not.rejects.toBe('Not a string.');
// 	// WATCH OUT! the line above is WRONG! in the line above, we are expecting sendDataRequest to be rejected! (because we are using the keyword 'rejects'), and what we are expecting is that when it is rejected, the message will not be 'Not a string.' (therefore, if the promise resolves, the test will fail). since this syntax is confusing, there's a better way to write this test, as follows:
// });

it('should convert the provided data to JSON before sending the request', async () => {
	const testData = { key: 'test' };

	let errorMessage;

	try {
		await expect(sendDataRequest(testData));
	} catch (error) {
		errorMessage = error;
	}

	expect(errorMessage).not.toBe('Not a string.');
});

it('should throw an HttpError in case of non-ok responses', () => {
	testFetch.mockImplementationOnce((url, options) => {
		return new Promise((resolve, reject) => {
			const testResponse = {
				ok: false,
				json() {
					return new Promise((resolve, reject) => {
						resolve(testResponseData);
					});
				},
			};

			resolve(testResponse);
		});
	});

	const testData = { key: 'test' };

	return expect(sendDataRequest(testData)).rejects.toBeInstanceOf(HttpError);
	// now, if a colleague by accident changed the error thrown to be a regular error (not a HttpError), then the test would fail.
});
