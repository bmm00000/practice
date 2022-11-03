import { expect, it, test } from 'vitest';

import { generateToken, generateTokenPromise } from './async-example';

it('should generate token (callback approach))', (done) => {
	const testUserEmail = 'test@user.com';

	generateToken(testUserEmail, (err, token) => {
		try {
			expect(token).toBeDefined();
			done();
		} catch (err) {
			done(err);
		}
	});
});

it('should generate token (promise approach)', () => {
	const testUserEmail = 'test@user.com';

	return expect(generateTokenPromise(testUserEmail)).resolves.toBeDefined();
});

it('should generate token (promise approach)', async () => {
	const testUserEmail = 'test@user.com';

	const token = await generateTokenPromise(testUserEmail);

	expect(token).toBeDefined();
});
