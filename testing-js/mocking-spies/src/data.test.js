import { describe, it, expect, vi } from 'vitest';
// in jest, the equivalent to the 'vi' object is the 'jest' object

import { generateReportData } from './data';

describe('generateReportData()', () => {
	it('should execute logFn if provided', () => {
		const logger = vi.fn();
		// 'fn' creates an empty function that keeps track of any function executions of that function (it also keeps track of the arguments that were provided with those calls).

		// sometimes, you want to have different implementation of certain methods provided by the modules that you have in __mocks__, but only for some tests. in order to do this, inside of the test, you can call the mockImplementation or mockImplementationOnce methods, and then you can pass a function to it which acts as a replacement (with mockImplementationOnce, your replacement function will only be used once, so in our case, logger will go back to being an empty function after we use it here):
		// logger.mockImplementationOnce(() => {
		// 	// our implementation...
		// });

		generateReportData(logger);

		expect(logger).toBeCalled();
		// toBeCalled and toHaveBeenCalled are equivalent methods.
		// the test will only pass if logger was called. if some of your colleagues deleted 'if (logFn) {logFn(data)' from the generateReportData function, then the test would fail, so we would find out about the problem.
	});
	// we won't import the logFn function, we just want to find out if it was called, so we can create such a spy replacement object (the logFn also has a side effect: interacts with the system console, which is an external system, so you want to get rid of it (you don't want to test whether or not console.log works well))
});

// when working with spies, you can formulate different spectations, for example:
// expect(logger).toBeCalledTimes(4) (we expect that the logger was called 4 times)
// expect(logger).toBeCalledWith() (we can check what arguments were passed to the function when it was called)

// when working with spies and mocks, you can pass a function into the method, and this function will be used as an implementation for this dummy function that is being created (sometimes you want some test specific behaviour):
// const logger = vi.fn(() => {});
// see the example for our mock in io.test.js
