import { describe, it, expect } from 'vitest';

import { generateToken, generateTokenPromise } from './async-example';

describe('generateToken()', () => {
	it('should yield a token', (done) => {
		const testUserEmail = 'test@test.com';
		const testDoneFn = (error, token) => {
			try {
				expect(token).toBeDefined();
				done();
			} catch (err) {
				done(err);
			}
		};

		generateToken(testUserEmail, testDoneFn);
	});
});

describe('generateTokenPromise()', () => {
	it('should yield a token', () => {
		const testUserEmail = 'test@test.com';

		return expect(generateTokenPromise(testUserEmail)).resolves.toBeDefined();
	});

	it('should yield a token', async () => {
		const testUserEmail = 'test@test.com';

		const token = await generateTokenPromise(testUserEmail);

		expect(token).toBeDefined();
	});
});
