import {
	it,
	expect,
	beforeAll,
	beforeEach,
	afterEach,
	afterAll,
	describe,
} from 'vitest';

import { User } from './hooks';

// const testEmail = 'test@test.com';
// let user = new User(testEmail);
// we extracted the two lines above because they were repeated in all the tests, but if we don't add hooks, then these initial conditions will change as we manipulate them in order to perform the tests, and at some point the tests will fail becuase of that. that's why we have hooks.

const testEmail = 'test@test.com';
let user;

beforeAll(() => {
	user = new User(testEmail);
	// in some scenarios, for example, if we have multiple suits, and we don't want an overall global value in the testing file, but you want a general shared value for the specific suit, and maybe multiple suits should share the same variable with different values though. for such scenarios, you could declare a variable globally and define it and set a value locally inside of beforeAll (then, you would have a user for all your tests, and if you had multiple suits, each suit would get its own user with the same shared global variable)
});

beforeEach(() => {
	user = new User(testEmail);
	// you can do this either beforeEach or afterEach, it will work in both cases.
});

afterEach(() => {
	// user = new User(testEmail);
});

afterAll(() => {
	// imagine that you create some testing database before all your tests are executed, and once your tests finish you want to erase that database, so that nothing is saved on your file system. in afterAll, you could perform that clean up work.
});

// if you have multiple suits, you can also add the hooks on a suit level (inside of the 'describe' function). in that case, they apply to that suit only.

it.concurrent('should update the email', () => {
	const testEmail = 'test@test.com';
	const newTestEmail = 'test2@test.com';

	const user = new User(testEmail);
	user.updateEmail(newTestEmail);

	expect(user.email).toBe(newTestEmail);
});

it.concurrent('should have an email property', () => {
	const testEmail = 'test@test.com';

	const user = new User(testEmail);

	expect(user).toHaveProperty('email');
});

it.concurrent('should store the provided email value', () => {
	const testEmail = 'test@test.com';

	const user = new User(testEmail);

	expect(user.email).toBe(testEmail);
});

it.concurrent('should clear the email', () => {
	const testEmail = 'test@test.com';

	const user = new User(testEmail);
	user.clearEmail();

	expect(user.email).toBe('');
});

it.concurrent(
	'should still have an email property after clearing the email',
	() => {
		const testEmail = 'test@test.com';

		const user = new User(testEmail);
		user.clearEmail();

		expect(user).toHaveProperty('email');
	}
);

// hooks (have nothing to do with react hooks) are special functions (provided by vitest and also by jest) that are executed authomatially by the test runner at certain points in time.

// a feature of vitest and jest: you can run your tests concurrently, and this will speed up the overall time that it takes to execute your tests. by default, your tests are run one after the other, and this is often quick enough. however, you can also call the 'concurrent' method on 'it', and then that particular test will run in parallel with the other tests that also have the 'concurrent' annotation. if you have a huge amount of tests, this feature can help you to run the tests faster. you can also add this annotation on the 'describe' function:
// describe.concurrent();
// now all the tests in this suit will be executed in parallel (so you don't need to add this annotation to every single test of this suit).

// Concurrency & Default Behavior:
// Even when not adding the .concurrent property / annotation, tests that are stored in different files are executed concurrently (i.e., in parallel). This is done by both Vitest and Jest - ensuring that your tests run in a short amount of time.
// With .concurrent you can enforce this behavior also inside the individual files (i.e., tests that live in one and the same file are executed concurrently).
// Concurrent execution can reduce the amount of time your tests need to execute. A downside of concurrent execution is, that tests that perform clashing (global) state manipulations may interfere with each other.
