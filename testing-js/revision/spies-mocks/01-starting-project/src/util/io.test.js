import { it, expect, vi } from 'vitest';
import { promises as fs } from 'fs';

import writeData from './io';

vi.mock('fs'); // it replaces the whole 'fs' module with your implementation in the __mocks__ folder, or if you don't have it, then with spy empty functions.
vi.mock('path', () => {
	return {
		default: {
			join: (...args) => {
				return args[args.length - 1];
			},
		},
	};
});

it('should execute the writeFile method', () => {
	const testData = 'Test';
	const testFileName = 'test.txt';

	writeData(testData, testFileName);

	expect(fs.writeFile).toBeCalledWith(testFileName, testData);
});

it('should return a promise that resolves', () => {
	const testData = 'Test';
	const testFileName = 'test.txt';

	writeData(testData, testFileName);

	return expect(writeData(testData, testFileName)).resolves.toBeUndefined();
});
