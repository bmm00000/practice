import { vi } from 'vitest';

export const promises = {
	writeFile: vi.fn((storagePath, data) => {
		return new Promise((resolve, reject) => resolve());
	}),
};
