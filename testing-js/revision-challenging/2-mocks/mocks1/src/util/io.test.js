vi.mock('fs');
vi.mock('path');

import { promises as fs } from 'fs';
import path from 'path';

import { it, expect, vi } from 'vitest';

import writeData from './io';

it('should call "writeFile" with the right arguments', () => {
	const testData = 'test-data';
	const testFilename = 'test-filename.txt';

	writeData(testData, testFilename);

	expect(fs.writeFile).toHaveBeenCalled();
	expect(fs.writeFile).toHaveBeenCalledWith(testFilename, testData);
	expect(path.join).toHaveBeenCalled();
	return expect(fs.writeFile(testFilename, testData)).resolves.toBeUndefined();
});
