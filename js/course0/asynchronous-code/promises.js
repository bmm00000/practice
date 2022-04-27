// let's start with an api that is made available by modern browsers that helps you send an AJAX http request (a request to a server to fetch data, store data... that is sent behind the scenes, without the page reloading or anything like that, ie. an http request that is fully managed by js) (btw, this is an async operation):

// if 'fetch' were callback based (it is not, btw! so the following example does NOT apply in real life!), it might expect a callback function as a third argument that would receive the response authomatically (the 'fetch' api would give you that authomatically) and would be executed once the request is completed (the second argument is an object to configure the method and body of the request, etc.). therefore, it might look like this:
fetch('https://jsonplaceholder.typicode.com/todos/1', {}, function (response) {
	// here you would have another async operation: parsing and converting the body of the received json data into js data (objects or arrays) might also take some time. and then the 'json' method might take a callback where we then authomatically receive the parsed data (again, given by the 'fetch' api):
	response.json(function (data) {
		// do something with the data.
		setTimeout(() => {
			// YET ANOTHER CALLBACK HERE! we are getting into 'callback hell'. at the end we will be writing code on the right side of the IDE. as we get more complex, this is not readable, and this is not how we want to write code.
		}, 1000);
	});
});
// remember, this is not how the 'fetch' api works! we are just taking this hypothetical example of how the 'fetch' api might have been designed, so we understand the benefits of promises.

// THANKFULLY, 'fetch' doesn't work as we did before. instead, it returns a promise (a js object provided by the browser with some built-in features, and one of those features is that you can call the 'then' method on that object, which takes a function that will be triggered when the 'fetch' operation is completed. in that function, we get authomatically a 'response' object that is fed in by the browser, and that 'response' object has a 'json' method which allow us to convert the data that is part of the received response, to data that we can work with in js (it converts a json string into a js object or array)). 'json' is also an async operation that returns a promise, so we can call 'then' again, and add a function where we get the parsed 'data':
fetch('https://jsonplaceholder.typicode.com/todos/1', {}).then(function (
	response
) {
	response.json().then(function (data) {
		console.log(data);
	});
});
// by doing it like this, we still have a kind of a 'callback hell' (we are avoiding the callback function that we would need to pass instead of 'then', but we still have to add a callback function as an argument to 'then'). that's why, promises have a cool feature: in the function that you pass to 'then', you can return data that is not a promise, or data that is a promise, and in both cases, 'then' overall will return a new promise that wraps either the promise that you returned inside of that function, or that non-promise data that was returned inside of there. therefore, we can simplify as follows, which is much more readable (you can chain as many 'then' blocks as needed):
fetch('https://jsonplaceholder.typicode.com/todos/1', {})
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		console.log(data);
	});
// in a nutshell, 'then' blocks always return promises, so you can chain 'then' blocks after one another, which is more readable.

// how promises work behind the scenes (all the following things are taken care of when you use an api like 'fetch' (for example, 'fetch' returns a function that is entirely configured and handled by the browser)):
const myPromise = new Promise(function (resolve, reject) {
	// you can do anything here, but if we are building a promise, you will want to resolve it under certain conditions (otherwise, it will always be in 'pending' state). for example:
	setTimeout(function () {
		resolve('It worked!');
		// when the status is 'resolved' then the function that we passed to 'then' will be executed, and the data that you pass as an argument to 'resolve' (you can pass anything, a number, an object, an array, etc.) will be provided as an argument to the function that you passed to 'then' (in our example, it will come under 'successString')
	}, 2000);
	// keep in mind that a promise can only be resolved once, so for example if we do the following, that's the only time that 'resolve' will be executed:
	// resolve('It worked early!')
});

myPromise
	.then(function (successString) {
		console.log(successString);
		// the 'then' method always returns a new promise, no matter if you returned anything here or just consoled log something, for example. and the functions that you pass to the 'then' blocks always trigger in order. remember, promises are often used for async operations, but you don't have to use them necessarily for async operations, you can do any sync operations there too (in any case, the promise will resolve when the code in it (asyc or not) is done)
		return 123;
		// the default promise returned by 'then' will resolve to the data that you return. whatever you return here will be passed as an argument to the callback of the next 'then' method, BUT only to the next one, NOT to any subsequent 'then' block:
	})
	.then(function (data) {
		console.log('Second "then"');
		console.log(data);
		return myPromise;
		// if you return a promise, in that case, the default promise returned by 'then' ('then' always returns a promise, regardless of if what you are doing is async or sync) will be replaced by the promise that you return
	})
	.then(function (data) {
		console.log(data); // 'It worked'
		// but in this case we will not wait for 2 seconds! why? because you are refering to the same promise that was already marked as resolved (the promise is the same js object in memory; when a promise is resolved, you cannot mark it as 'pending' again: promises can only be resolved once)
	});
// we will use the 'new' keyword (which is built into js) with the 'Promise' constructor (built in constructor function in js that constructs a new promise object). the function that you pass as first argument to the constructor function is the function that will be called when you add a 'then' method to the created promise object (myPromise), and in that moment the function will enter the 'pending' state (and when that function is done, then the function that you add as an argument to the 'then' method will be executed). that function takes two parameters that are also functions: the 'resolve' and 'reject' functions (the browser is passing those functions). whenever we use 'myPromise' (ie. we use a 'then' block) that function will be called by the browser, and whenever the browser calls it, the browser will pass these two functions as arguments
// remember, in js promises are objects that have the duty of creating results (the result could be the response from a server that was fetched, or many other things). when a promise produces a successful result, we consider it as 'resolved' or 'fulfilled', but otherwise 'rejected'
