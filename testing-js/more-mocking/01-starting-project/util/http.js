import { HttpError } from './errors.js';

export async function sendDataRequest(data) {
	const response = await fetch('https://dummy-site.dev/posts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	const responseData = await response.json();

	if (!response.ok) {
		throw new HttpError(
			response.status,
			'Sending the request failed.',
			responseData
		);
	}

	return responseData;
}

// the 'fetch' function is a globally available function made available by the browser (it's a browser api,that is available in js, in the browser, out of the box) (now it's also available in modern versions of nodejs).
// in order to test this, we want to get rid of the side effect (we don't want to send a real http request to the backend, since we don't want to change anything in the database, or similar..., and also it would slow down the tests, and take badwidth, and hammer our backend api, if we had to send http requests for all our tests)
