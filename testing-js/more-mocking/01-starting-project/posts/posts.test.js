import { beforeEach, describe, expect, it } from 'vitest';

import { extractPostData } from './posts';

// you could build your own FormData object, but you need a DOM form element to do that, and it might get too complex. all we need is an object that has a 'get' method that accepts some key ('title' or 'content') and then returns some data for every key.
// before, we learned how to mock global objects or functions with 'stubGlobal', but in this situation, we are going to build our own fake mock object without any special vitest or jest features.
const testTitle = 'Test title';
const testContent = 'Test content';
let testFormData;

describe('extractPostData()', () => {
	beforeEach(() => {
		testFormData = {
			title: testTitle,
			content: testContent,
			get(identifier) {
				return this[identifier];
			},
		};
	});
	// if you had a test that, for example, changes the title, it would be reset before the next test executes. here we only have one test, but this set up will allow us to include more tests that need the same data, and that would potentially manipulate that data.

	it('should extract title and content from the provided form data', () => {
		const data = extractPostData(testFormData);

		expect(data.title).toBe(testTitle);
		expect(data.content).toBe(testContent);
	});
});
