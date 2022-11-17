import fs from 'fs';
import path from 'path';

import { vi, it, expect, beforeEach } from 'vitest';
import { Window } from 'happy-dom';

import { showError } from './dom';

const htmlFilePath = path.join(process.cwd(), 'index.html');
const htmlFileContent = fs.readFileSync(htmlFilePath).toString();

const window = new Window();
const document = window.document;
vi.stubGlobal('document', document);

beforeEach(() => {
	document.body.innerHTML = '';
	document.write(htmlFileContent);
});

it('should create a paragraph element inside of the "errors" element', () => {
	showError('test');

	const errorElement = document.getElementById('errors');
	const errorParagraph = errorElement.firstElementChild;
	expect(errorParagraph).not.toBeNull();
});

it('should not be any element inside of the "errors" element at the beginning', () => {
	const errorElement = document.getElementById('errors');
	const errorParagraph = errorElement.firstElementChild;
	expect(errorParagraph).toBeNull();
});

it('should create a paragraph element with the error message passed', () => {
	const errorMessage = 'test error message';

	showError(errorMessage);

	const errorElement = document.getElementById('errors');
	const errorParagraph = errorElement.firstElementChild;
	expect(errorParagraph.textContent).toBe(errorMessage);
});
