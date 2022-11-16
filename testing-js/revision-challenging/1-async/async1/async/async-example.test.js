import { it, expect } from 'vitest';

import { generateToken, generateTokenPromise } from './async-example';

it('should resolve to a token', (done) => {
	const testEmail = 'test@email.com';

	generateToken(testEmail, (err, token) => {
		try {
			expect(token).toBeDefined();
			done();
		} catch (err) {
			done(err);
		}
	});
});

it('promise should resolve to a token', () => {
	const testEmail = 'test@email.com';

	expect(generateTokenPromise(testEmail)).resolves.toBeDefined();
});

it('promise should resolve to a token', async () => {
	const testEmail = 'test@email.com';

	const token = await generateTokenPromise(testEmail);

	expect(token).toBeDefined();
});
