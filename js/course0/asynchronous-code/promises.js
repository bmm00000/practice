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
// by doing it like this, we still have a kind of a 'callback hell' (we are avoiding the callback function that we would need to pass instead of 'then', but we still have to add a callback function as an argument to 'then'). that's why, promises have a cool feature: in the function that you pass to 'then', you can return data that is not a promise, or data that is a promise, and in both cases, 'then' overall will return a new promise that wraps either the promise that you returned inside of that function, or that non-promise data that returned inside of there. therefore, we can simplify as follows, which is much more readable (you can chain as many 'then' blocks as needed):
fetch('https://jsonplaceholder.typicode.com/todos/1', {})
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		console.log(data);
	});
// in a nutshell, 'then' blocks always return promises, so you can chain 'then' blocks after one another, which is more readable.
