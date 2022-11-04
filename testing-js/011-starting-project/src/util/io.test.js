vi.mock('fs');
vi.mock('path', () => {
	return {
		default: {
			join: (...args) => args[args.length - 1],
		},
	};
});

import { promises as fs } from 'fs';

import { it, expect, vi } from 'vitest';

import writeData from './io';

it('should call "writeFile"', () => {
	const testData = 'test-data';
	const fileName = 'file-name.txt';

	writeData(testData, fileName);

	expect(fs.writeFile).toBeCalled();
	expect(fs.writeFile).toHaveBeenCalledWith(fileName, testData);
	return expect(writeData(testData, fileName)).resolves.toBeUndefined();
});
