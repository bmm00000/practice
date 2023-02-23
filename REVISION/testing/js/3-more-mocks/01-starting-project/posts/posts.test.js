import { it, describe, expect, beforeEach } from 'vitest';
import { extractPostData } from './posts';

const testTitle = 'Form title';
const testContent = 'Form content';
let testFormData;

describe('extractPostData()', () => {
	// you could do the following, just in case you manipulated the testFormData object in other tests:
	beforeEach(() => {
		testFormData = {
			title: testTitle,
			content: testContent,
			get(identifier) {
				return this[identifier];
			},
		};
	});
	it('should return an object with the title and content of the form data object that we passed as an argument', () => {
		const formData = extractPostData(testFormData);
		expect(formData.title).toBe(testTitle);
		expect(formData.content).toBe(testContent);
	});
});
