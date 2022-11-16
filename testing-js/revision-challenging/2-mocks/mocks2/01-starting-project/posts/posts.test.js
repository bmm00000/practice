import { describe, it, expect, beforeEach } from 'vitest';

import { extractPostData } from './posts';

describe('function extractPostData', () => {
	const title = 'title';
	const content = 'content';
	let dataForm;
	beforeEach(() => {
		dataForm = {
			title: title,
			content: content,
			get(identifier) {
				return this[identifier];
			},
		};
	});
	it('should return an object with the title and content from the instance of DataForm that we pass as an argument', () => {
		const returnedData = extractPostData(dataForm);

		expect(returnedData).toEqual({ title, content });
	});
});
