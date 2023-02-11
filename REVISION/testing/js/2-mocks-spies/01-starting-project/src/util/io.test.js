import { it, expect, vi } from 'vitest';
vi.mock('fs', () => {
	return {
		promises: {
			writeFile: (storagePath, data) => {
				return new Promise((resolve, reject) => resolve());
			},
		},
	};
});
vi.mock('path', () => {
	return {
		default: {
			join: (...args) => {
				return args[args.length - 1];
			},
		},
	};
});
import writeData from './io';
import { promises as fs } from 'fs';
import path from 'path';

it('should call the writeFile method from the fs module', () => {
	const data = 'data';
	const fileName = 'file-name.txt';

	return expect(writeData(data, fileName)).resolves.toBeUndefined();
});

// it('should call the writeFile method from the fs module', () => {
// 	const data = 'data';
// 	const fileName = 'file-name.txt';

// 	writeData(data, fileName);

// 	expect(fs.writeFile).toHaveBeenCalled();
// });

it('should call the writeFile method from the fs module with fileName and data as arguments', () => {
	const data = 'data';
	const fileName = 'file-name.txt';

	writeData(data, fileName);

	expect(fs.writeFile).toBeCalledWith(fileName, data);
});

// it('should call the join method from the path module', () => {
// 	const data = 'data';
// 	const fileName = 'file-name.txt';

// 	writeData(data, fileName);

// 	expect(path.join).toHaveBeenCalled();
// });

// it('should call the join method from the path module with fileName as an argument', () => {
// 	const data = 'data';
// 	const fileName = 'file-name.txt';

// 	writeData(data, fileName);

// 	expect(path.join).toHaveBeenCalledWith(fileName);
// });
