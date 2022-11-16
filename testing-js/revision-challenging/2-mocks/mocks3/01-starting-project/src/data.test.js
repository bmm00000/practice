import { it, expect, vi } from 'vitest';

import { generateReportData } from './data';

it('calls the function passed as an argument', () => {
	const logger = vi.fn();

	// logger.mockImplementationOnce(() => {
	// 	console.log('haha');
	// });

	generateReportData(logger);

	expect(logger).toHaveBeenCalled();
});
