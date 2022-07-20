// ASYNC/AWAIT:
// this is another feature, part of modern js, that supports us to work with async code. it basically uses promises under the hood, but it gives us a nicer way of working with promises and creating promise chains.

// at the moment, async/await is only avaiable inside of functions. therefore, you have to include the async operation inside of a function. then you add the keyword 'async' in front of the function, so you are telling js that you are working with a promise inside of that function (any function that you annotate with 'async' will return a promise, so, in our example, sendRequest will return a promise, even if we don't have any return statement in it, and if we add a return statement, whatever we return will be what the promise will resolve to (whatever you return will be wrapped by this authomatically returned promise)).
// we also use the 'await' keyword in front of a promise, and we can store what the promise resolves to, in a constant. under the hood, the 'await' keyword adds a 'then' block to the 'fetch' promise, which gets the response (the same that we had before in the 'then' block, but now we have syntactic sugar)

async function sendRequest() {
	const response = await fetch(
		'https://jsonplaceholder.typicode.com/todos/1',
		{}
	);
	console.log('Got response');
	const data = await response.json();
	console.log(data);
}

sendRequest();

// how to handle errors? our code now looks like regular synchronous js code (even though it's transformed behind the scenes). therefore, we can use the regular error handling mechanism for synchronous code: try/catch. this will also be converted behind the scenes to the 'catch' block that comes after the 'then' block that we had before:
async function sendRequest() {
	try {
		const response = await fetch(
			'https://asjfdlasjfjasfjasdfasjgsdgjsdfl/1',
			{}
		);
		console.log('Got response');
		const data = await response.json();
		console.log(data);
	} catch (err) {
		console.log('Got error!');
	}
}

sendRequest();

// in a nutshell, with async/await YOU ARE USING PROMISES (SAME AS BEFORE), BUT IT JUST LOOKS DIFFERENT, IT'S JUST SYNTACTIC SUGAR.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
