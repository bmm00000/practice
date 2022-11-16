import fs from 'fs';
import path from 'path';

import { beforeEach, expect, it, vi } from 'vitest';
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

it('should create a child element inside of the element with id="errors"', () => {
	showError('test-message');
	const errorsEl = document.getElementById('errors');
	const childEl = errorsEl.firstElementChild;
	expect(childEl).not.toBeNull();
});

it('should not exist a child element inside of the element with id="errors" before we call "showError"', () => {
	const errorsEl = document.getElementById('errors');
	const childEl = errorsEl.firstElementChild;
	expect(childEl).toBeNull();
});

it('should provide the provided message in the error paragraph', () => {
	const testMessage = 'test-message';

	showError(testMessage);

	const errorsEl = document.getElementById('errors');
	const childEl = errorsEl.firstElementChild;
	expect(childEl.textContent).toBe(testMessage);
});
