const assert = require('assert');
const render = require('../../render');

it('Has a text input', async () => {
	const dom = await render('index.html');

	const input = dom.window.document.querySelector('input');

	assert(input);
});

it('Shows a success message when a valid email is introduced', async () => {
	const dom = await render('index.html');

	const input = dom.window.document.querySelector('input');
	input.value = 'jal;sjdf@ljsf.com';

	dom.window.document
		.querySelector('form')
		.dispatchEvent(new dom.window.Event('submit'));

	const h1 = dom.window.document.querySelector('h1');

	assert.strictEqual(h1.innerHTML, 'Valid email');
});

it('Shows a fail message when an invalid email is introduced', async () => {
	const dom = await render('index.html');

	const input = dom.window.document.querySelector('input');
	input.value = 'jal;sjdfljsf.com';

	dom.window.document
		.querySelector('form')
		.dispatchEvent(new dom.window.Event('submit'));

	const h1 = dom.window.document.querySelector('h1');

	assert.strictEqual(h1.innerHTML, 'Not valid email');
});
