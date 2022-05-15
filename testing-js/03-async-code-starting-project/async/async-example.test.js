import { expect, it } from 'vitest';

import { generateToken, generateTokenPromise } from './async-example';

// it('should generate a token value', () => {
// 	const testUserEmail = 'test@test.com';

// 	generateToken(testUserEmail, (err, token) => {
// 		// expect(token).toBeDefined();
// 		// here we have the assertion inside of the callback function. when we run it, the test passes, but the test doesnt work! check this:
// 		expect(token).toBe(2);
// 	});
// });
// this happens because vitest and jest won't wait for any inner callback functions to finish (it will not wait for the callback to be executed), and therefore it will not find any assertion in the test code (because the callback has not been executed yet), and hence it will mark the test as passed (simply because there was no assertion at all).

// when working with callback functions like above, you have to accept an extra parameter in the inner test function (a function that you should call once you are done in your testing code):

// it('should generate a token value', (done) => {
// 	const testUserEmail = 'test@test.com';

// 	generateToken(testUserEmail, (err, token) => {
// 		expect(token).toBeDefined();
// 		done();
// 		// you call 'done()' in the place where you know that you will be done with all your testing related work, and vitest (and also jest) will wait until 'done()' was called (the test is not done until 'done()' is called).
// 	});
// });

// however, the test doesn't fail if we add a wrong expectation (it just times out):
// it('should generate a token value', (done) => {
// 	const testUserEmail = 'test@test.com';

// 	generateToken(testUserEmail, (err, token) => {
// 		expect(token).toBe(2);
// 		done();
// 	});
// });
// this is because the 'to' functions (like 'toBe', etc.) in the end throw an error if they fail, and vitest (or jest) will pick up that error and will consider the test to have failed and show you the reason why it failed. but if you are using the 'done' function, the error thrown by the 'to' function will not be picked up by the test runner (since we throw an error, we will never reach 'done'). that's why, only in this case, you need to add a try/catch block:
// it('should generate a token value', (done) => {
// 	const testUserEmail = 'test@test.com';

// 	generateToken(testUserEmail, (err, token) => {
// 		try {
// 			expect(token).toBe(2);
// 			done();
// 		} catch (err) {
// 			done(err);
// 		}
// 	});
// });

// therefore, we are going to use the following structure, so we can catch any errors and get some helpful output in our future tests, if they fail:

it('should generate a token value', (done) => {
	const testUserEmail = 'test@test.com';

	generateToken(testUserEmail, (err, token) => {
		try {
			expect(token).toBeDefined();
			done();
		} catch (err) {
			done(err);
		}
	});
});

// this is how we can deal with async code and write asyc tests if we work with callbacks. what about for functions that yield promises? we have two approaches:

// first approach:
// it('should generate a token value', () => {
// 	const testUserEmail = 'test@test.com';

// 	expect(generateTokenPromise(testUserEmail)).resolves.toBeDefined();
// 	// 'expect' supports promises out of the box, and then you can use the keywords 'rejects' or 'resolves', so you can expect the value resolved by the promise 'toBe' something... (similarly, if you expect the promise to reject and you want to evaluate the error you get after the rejection, you can also use 'rejects', and then any 'to' method)
// 	// (in case your test fails (and you don't expect it to fail), add 'return' before 'expect')
// });

// second approach:
it('should generate a token value', async () => {
	const testUserEmail = 'test@test.com';

	const token = await generateTokenPromise(testUserEmail);

	expect(token).toBeDefined();
});
// async/await makes sense if there are a lot of steps in what you want to execute (instead of just one single function call)

//

// Returning Promises In Tests:
// Even though the test worked as expected in the previous lecture, you should actually return the promise assertion in your tests:

// it('should generate a token value', () => {
//  const testUserEmail = 'test@test.com';

//  return expect(generateTokenPromise(testUserEmail)).resolves.toBeDefined();
// });
// This guarantees that Vitest / Jest wait for the promise to be resolved.

// You don't need to return when using async / await (since a function annotated with async returns a promise implicitly).
