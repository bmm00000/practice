import fs from 'fs';
import path from 'path';

import { vi, it, expect, beforeEach } from 'vitest';
import { Window } from 'happy-dom';

import { showError } from './dom';

const htmlFilePath = path.join(process.cwd(), 'index.html');
const htmlFileContent = fs.readFileSync(htmlFilePath).toString();
const document = new Window().document;
vi.stubGlobal('document', document);

beforeEach(() => {
	document.body.innerHTML = '';
	document.write(htmlFileContent);
});

it('should not render a child paragraph inside the "errors" element if the "showError" function has not been called', () => {
	const errorsEl = document.getElementById('errors');
	const errorParagraph = errorsEl.firstElementChild;
	expect(errorParagraph).toBeNull();
});

it('should render a child paragraph inside the "errors" element if the "showError" function has been called', () => {
	showError('test');

	const errorsEl = document.getElementById('errors');
	const errorParagraph = errorsEl.firstElementChild;
	expect(errorParagraph).not.toBeNull();
});

it('should render the message passed to the "showError" function, in the paragraph', () => {
	const errorMessage = 'error message';

	showError(errorMessage);

	const errorsEl = document.getElementById('errors');
	const errorParagraph = errorsEl.firstElementChild;
	expect(errorParagraph.textContent).toBe(errorMessage);
});
