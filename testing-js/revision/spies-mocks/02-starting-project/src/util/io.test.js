import { it, expect, vi } from 'vitest';
vi.mock('fs');
vi.mock('path', () => {
	return {
		default: {
			join: (...args) => {
				return args[args.length - 1];
			},
		},
	};
});

import { promises as fs } from 'fs';

import writeData from './io.js';

it('should call the function writeFile', () => {
	const testData = 'Test';
	const testFileName = 'test.txt';

	// fs.writeFile.mockImplementation(() => {
	// 	return undefined;
	// });

	writeData(testData, testFileName);

	expect(fs.writeFile).toHaveBeenCalledWith(testFileName, testData);
	return expect(fs.writeFile(testFileName, testData)).resolves.toBeUndefined();
});
