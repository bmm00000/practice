import { describe, it, expect } from 'vitest';

import { generateToken, generateTokenPromise } from './async-example';

describe('generateToken()', () => {
	it('should generate a token when the async operation is successful', (done) => {
		const testEmail = 'test@test.com';

		generateToken(testEmail, (err, token) => {
			try {
				expect(token).toBeDefined();
				done();
			} catch (err) {
				done(err);
			}
		});
	});
});

describe('generateTokenPromise()', () => {
	it('should generate a token when the returned promise resolves', () => {
		const testEmail = 'test@test.com';

		return expect(generateTokenPromise(testEmail)).resolves.toBeDefined();
	});
});

// OR:

describe('generateTokenPromise()', () => {
	it('should generate a token when the returned promise resolves (THIS IS THE SAME TEST AS BEFORE)', async () => {
		const testEmail = 'test@test.com';

		const token = await generateTokenPromise(testEmail);
		expect(token).toBeDefined();
	});
});
