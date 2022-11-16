import { vi } from 'vitest';

const path = {
	join: vi.fn((...args) => {
		return args[args.length - 1];
	}),
};

export default path;
