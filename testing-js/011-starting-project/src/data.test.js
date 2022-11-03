import { describe, it, expect, vi } from 'vitest';

import { generateReportData } from './data';

describe('generateReportData()', () => {
	it('should call logFn function if passed', () => {
		const logFn = vi.fn();

		generateReportData(logFn);

		expect(logFn).toHaveBeenCalled();
	});
});
