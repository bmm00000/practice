const assert = require('assert');

it('has a text input', async () => {
	const dom = await render('index.html');

	const input = dom.window.document.queryselector('input');

	// we are just checking that the input exists, as if we wrote 'if(!input)... throw New error...'
	assert(input);
	// assert is going to throw and error if the value inside is falsy

	// when you removed the 'input' element from the html document and run the test, it said 'OK' and then error message. why? because you didn't have 'await' in your fn() of the 'it' function, so it continued consoleloging the OK message.
});

it('shows a success message with a valid email', async () => {
	const dom = await render('index.html');

	const input = dom.window.document.queryselector('input');
	input.value = 'asdf@asdf.com';
	dom.window.document.querySelector('form').dispatchEvent(new dom.window.Event('submit'));

	const h1 = dom.window.document.querySelector('h1');

	// the following 'h1.innerHTML' will not execute if we don't delay the return of the dom until all js files linked to the html file have been loaded. that's why we are using a promise in the render function.
	// console.log('Contents of h1', h1.innerHTML);

	// thanks to the delay in the render function (the promise), the following will work as well:
	assert.strictEqual(h1.innerHTML, 'Looks good!');
});

it('shows a fail message with an invalid email', async () => {
	const dom = await render('index.html');

	const input = dom.window.document.queryselector('input');
	input.value = 'asdf';
	dom.window.document.querySelector('form').dispatchEvent(new dom.window.Event('submit'));

	const h1 = dom.window.document.querySelector('h1');

	assert.strictEqual(h1.innerHTML, 'Invalid email');
});
