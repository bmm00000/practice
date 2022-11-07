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

it('the error element should contain a paragraph with the error message', () => {
	showError('test');

	const errorsEl = document.getElementById('errors');
	const errParagraph = errorsEl.firstElementChild;
	expect(errParagraph).not.toBeNull();
});

it('should not contain an error paragraph initially', () => {
	const errorsEl = document.getElementById('errors');
	const errParagraph = errorsEl.firstElementChild;
	expect(errParagraph).toBeNull();
});

it('should provide the paragraph with the error message that we passed', () => {
	showError('test');
	const errorsEl = document.getElementById('errors');
	const errParagraph = errorsEl.firstElementChild;
	expect(errParagraph.textContent).toBe('test');
});
