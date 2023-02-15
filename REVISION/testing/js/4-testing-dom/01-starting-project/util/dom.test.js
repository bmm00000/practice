import fs from 'fs';
import path from 'path';
import { it, expect, vi, beforeEach } from 'vitest';
import { Window } from 'happy-dom';
import { showError } from './dom';

const htmlFilePath = path.join(process.cwd(), 'index.html');
const htmlContent = fs.readFileSync(htmlFilePath).toString();
const window = new Window();
const document = window.document;
vi.stubGlobal('document', document);

beforeEach(() => {
	document.body.innerHTML = '';
	document.write(htmlContent);
});

it('should add a paragraph in the div with an id of "errors"', () => {
	const errMessage = 'error message';
	showError(errMessage);

	const errorsEl = document.getElementById('errors');
	const errorsParagraph = errorsEl.firstElementChild;

	expect(errorsParagraph).not.toBeNull();
});

it('should not contain an error paragraph initially', () => {
	const errorsEl = document.getElementById('errors');
	const errorsParagraph = errorsEl.firstElementChild;

	expect(errorsParagraph).toBeNull();
});

it('should provide the provided message in the error paragraph', () => {
	const errMessage = 'error message';
	showError(errMessage);
	const errorsEl = document.getElementById('errors');
	const errorsParagraph = errorsEl.firstElementChild;

	expect(errorsParagraph.textContent).toBe(errMessage);
});
