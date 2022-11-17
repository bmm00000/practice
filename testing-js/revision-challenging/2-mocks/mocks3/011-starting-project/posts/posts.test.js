import { it, expect } from 'vitest';

import { extractPostData } from './posts';

it('should return the data from the form object passed', () => {
	const testTitle = 'title';
	const testContent = 'content';
	const testForm = {
		title: testTitle,
		content: testContent,
		get(identifier) {
			return this[identifier];
		},
	};

	const data = extractPostData(testForm);
	expect(data.title).toBe(testTitle);
	expect(data.content).toBe(testContent);
});
