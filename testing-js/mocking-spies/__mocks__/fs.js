import { vi } from 'vitest';

export const promises = {
	writeFile: vi.fn((path, data) => {
		return new Promise((resolve, reject) => {
			resolve();
			// we resolve to nothing, like the original writeFile
		});
	}),
	// we are adding our own implementation by passing a function to vi.fn(). remember that the original writeFile returns a promise. therefore, we are going to return a promise as well here (in the first test that we wrote in io.test.js, our mock didn't return a promise, therefore our test was a bit unrealistic)
};
