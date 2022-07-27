import { describe, it, expect, vi } from 'vitest';

import { generateReportData } from './data';

describe('generateReportData(logFn)', () => {
	it('should invoke the logFn function if provided', () => {
		const logger = vi.fn();

		generateReportData(logger);

		expect(logger).toBeCalled();
	});
});
