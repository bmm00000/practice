import { promises as fs } from 'fs';

import { vi, it, expect } from 'vitest';

import writeData from './io';

vi.mock('fs');
vi.mock('path');

it('should call the "writeFile" method of the "fs" module', () => {
	const testData = 'test data';
	const testFilename = 'test.txt';

	writeData(testData, testFilename);

	expect(fs.writeFile).toHaveBeenCalled();
});

it('should call the "writeFile" method of the "fs" module with the right arguments', () => {
	const testData = 'test data';
	const testFilename = 'test.txt';

	writeData(testData, testFilename);

	expect(fs.writeFile).toHaveBeenCalledWith(testFilename, testData);
});

it('should call the "writeFile" method of the "fs" module and it should return a promise that will resolve', () => {
	const testData = 'test data';
	const testFilename = 'test.txt';

	writeData(testData, testFilename);

	return expect(writeData(testData, testFilename)).resolves.toBeUndefined();
});
