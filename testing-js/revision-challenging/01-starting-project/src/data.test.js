import { describe, it, expect, vi } from 'vitest';

import { generateReportData } from './data';

describe('generateReportData()', () => {
	it('should call the function passed as an argument', () => {
		const logger = vi.fn();

		generateReportData(logger);

		expect(logger).toHaveBeenCalled();
	});
});
