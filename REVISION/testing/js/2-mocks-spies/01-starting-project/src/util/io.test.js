import { it, expect, vi } from 'vitest';
// vi.mock('fs', () => {
// 	return {
// 		promises: {
// 			writeFile: vi.fn((storagePath, data) => {
// 				return new Promise((resolve, reject) => resolve());
// 			}),
// 		},
// 	};
// });
vi.mock('fs');
// vi.mock('path', () => {
// 	return {
// 		default: {
// 			join: vi.fn((...args) => {
// 				return args[args.length - 1];
// 			}),
// 		},
// 	};
// });
vi.mock('path');
import { promises as fs } from 'fs';
import path from 'path';
import writeData from './io';

it('should call the writeFile method from the fs module', () => {
	const data = 'data';
	const fileName = 'file-name.txt';

	writeData(data, fileName);

	expect(fs.writeFile).toHaveBeenCalled();
});

it('should resolve the promise from the writeFile method in the fs module', () => {
	const data = 'data';
	const fileName = 'file-name.txt';

	return expect(writeData(data, fileName)).resolves.toBeUndefined();
});

it('should call the writeFile method from the fs module with fileName and data as arguments', () => {
	const data = 'data';
	const fileName = 'file-name.txt';

	writeData(data, fileName);

	expect(fs.writeFile).toHaveBeenCalledWith(fileName, data);
});

it('should call the join method from the path module', () => {
	const data = 'data';
	const fileName = 'file-name.txt';

	writeData(data, fileName);

	expect(path.join).toHaveBeenCalled();
});
