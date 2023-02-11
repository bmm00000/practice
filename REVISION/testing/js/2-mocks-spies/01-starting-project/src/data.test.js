import { describe, it, expect, vi } from 'vitest';
import { generateReportData } from './data';

describe('generateReportData()', () => {
	it('should call the function that we pass as an argument', () => {
		const logger = vi.fn();

		generateReportData(logger);

		expect(logger).toHaveBeenCalled();
	});
});
