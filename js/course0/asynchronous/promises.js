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

// how promises work behind the scenes (all the following things are taken care of, when you use an api like 'fetch' (for example, 'fetch' returns a function that is entirely configured and handled by the browser)):
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
		// but in this case we will not wait for 2 seconds! why? because you are refering to the same promise that was already marked as resolved (the promise is the same js object in memory; when a promise is resolved, you cannot mark it as 'pending' again: promises can only be resolved once). if we want to get a new promise that sets a new timer, for that we can do something called 'promisifying existing apis'. for example, let's say we want to turn 'setTimeout' into an api that by default supports promises (a function that we can call to return a promise), so every time we call that function we will return a different promise (now we have a re-usable function that will give us the default timer built into the browser, but such that we can use it in a promise chain instead of just callback functions. another way to put it: we promisify existing apis, so we have re-usable functions that we can use instead of those existing apis provided by the browser, so we avoid entering callback hell (we avoid callback hell by chaining 'then' blocks)):
	});

function setTimer(duration) {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve();
		}, duration);
	});
}

setTimer(2000)
	.then(function () {
		console.log('First timer completed');
		return 123;
	})
	.then(function (data) {
		console.log('Second then');
		console.log(data);
		return setTimer(3000);
	})
	.then(function (data) {
		console.log('Second timer completed');
		console.log(data); // 'undefined', because the promise returned by setTimer doesn't resolve to any data, it resolves to nothing, ie. 'resolve()'.
	});

// btw, we are using the 'new' keyword (which is built into js) with the 'Promise' constructor (built-in constructor function in js that constructs a new promise object). the function that you pass as first argument to the constructor function is the function that will be called when you add a 'then' method to the created promise object (myPromise), and in that moment the function will enter the 'pending' state (and when that function is done, then the function that you add as an argument to the 'then' method will be executed). that function takes two parameters that are also functions: the 'resolve' and 'reject' functions (the browser is passing those functions). whenever we use 'myPromise' (ie. we use a 'then' block) that function will be called by the browser, and whenever the browser calls it, the browser will pass these two functions as arguments
// remember, in js promises are objects that have the duty of creating results (the result could be the response from a server that was fetched, or many other things). when a promise produces a successful result, we consider it as 'resolved' or 'fulfilled', but otherwise 'rejected'

// handling errors:

fetch('https://jsjl;sdfjkl;sjfl;.typicode.com/todos/1', {})
	// we are introducing a bug in the url above, and we will get a runtime error (in the console of the browser), since we are not handling that error. but we don't want to have that error just in the console, but we also want to present the error to the user (NOTE THAT WE ARE INTRODUCING A BUG IN THE URL IN ORDER TO SIMULATE AN ERROR, BUT THIS IS NOT THE SITUATION THAT WE WILL HANDLE IN REAL LIFE! IN REAL LIFE, WE ARE HANDLING ERRORS THAT WE, AS DEVELOPERS, CANNOT AVOID (we can definitely avoid having a bug in the url by fixing it!), EG. WE POST SOME DATA TO A SERVER, THE SERVER DOESN'T LIKE THE DATA, AND SENDS BACK AN ERROR MESSAGE). with promises handling errors, we have two options:
	// FIRST OPTION: in the 'then' block  that you call on the promise that might fail, you can pass more than one argument (the first argument is the function that should be executed if the promise resolves; the second argument that you can pass is the function that should be called if the promise fails):
	.then(
		function (response) {
			return response.json();
		},
		function () {
			console.log('Handling error!');
			// throw new Error();
			return 'Error handled';
		}
	)
	.then(
		function (data) {
			console.log(data); // 'Error handled'
		},
		function (err) {
			alert('This failed!');
			console.log(err);
		} // this function will be triggered if ANY of the promises above fail, eg. if the promise for 'fetch' fails (when any promsise fails, the nearest error handling function will be executed; for example, if the 'fetch' promise fails, we will only console log 'Handling error!', and the second error handling function WILL NOT RUN!). ATTENTION! if you handle an error caused by a promise, the 'then' block still returns a new promise (therefore, the 'then' block will always return a promise, regardless of whether the first function (success) or the second function (error) is executed). therefore, as it happens with the first function, you can also return data in the second (error handling) function, and that data will be passed to the next 'then' block. therefore, 'then' blocks always return a brand new promise (no matter if the previous promise was rejected or not), which is never rejected, always resolved (therefore, in the subsequent 'then' block, the first (success case) function will always be executed, eg. line 103 (unless you throw a new error in your previous 'then' block (eg. line 98), in which case, the promise returned by the 'then' block of line 92 will be rejected, and the error handling function of the next 'then' block will be executed (line 106))
	);

// IMPORTANT TAKEAWAY: the function that we pass as first argument to 'then' only executes when the promise on which the 'then' block was executed, resolves (eg. the function passed to the second 'then' block will not execute if the first promise returned by the 'fetch' function is rejected). BUT for the second argument that we pass to the 'then' blocks, that's different!! the error handling function will be triggered when any prior promise fails.

// in non-promise programming, we also have try and catch, but with promises you can also call the 'catch' method, which brings us to the second option:
// SECOND OPTION:
fetch('https://jsjl;sdfjkl;sjfl;.typicode.com/todos/1', {})
	.then(function (response) {
		return response.json();
	})
	.catch(function (err) {
		console.log('Failed!'); // this will be executed if either the previous 'then' method returned promise failed, or if the 'fetch' method returned promise failed
	})
	.then(function (data) {
		console.log(data);
	});

// 'catch' takes a function that is executed if ANY previous promise fails. 'catch' behaves exactly the same as the second argument that we used before (FIRST OPTION) (ie. if you have multiple 'catch' blocks only the first one is executed; also, as the 'then' block with a second argument, 'catch' returns a new promise that will always resolve unless you throw a new error inside the 'catch' block (therefore, line 125 will execute after the previous 'catch' block runs). therefore, if you don't want any 'then' blocks to run if any of them failed, you need to move the 'catch' block to the end of the chain (because, since 'catch' returns a new promise, the subsequent 'then' block would execute), as we do as follows (at the end, it depends on what you would want to execute in any scenario):
fetch('https://jsjl;sdfjkl;sjfl;.typicode.com/todos/1', {})
	.then(function (response) {
		return response.json();
	})

	.then(function (data) {
		console.log(data);
	})
	.catch(function (err) {
		console.log('Failed!');
	});

// what happens behind the scenes when a promise is rejected? let's look at our promise from before, but instead of resolve it, we reject it (it doesn't make sense to define a promise to always reject it, but we are doing this for demo purposes; in other cases, imagine that we are doing things inside of a promise that may fail, for example, validating some user input...):
function setTimer(duration) {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			// resolve();
			reject(); // btw, this is what the 'fetch' function does internally when the http request fails.
		}, duration);
	});
}

// when the promise returned by setTimer is rejected, all the success functions (first arguments) of subsequent 'then' blocks are skipped, and the promise will look for the closest second argument in a 'then' function, or for the closest 'catch' block. in the following example, since we are not handling errors, we will just get an error message in the console of the browser ('Uncaught' error):
setTimer(2000)
	.then(function () {
		console.log('First timer completed');
		return 123;
	})
	.then(function (data) {
		console.log('Second then');
		console.log(data);
		return setTimer(3000);
	})
	.then(function (data) {
		console.log('Second timer completed');
		console.log(data);
	});

// in order to handle the error, we can use a second argument or 'catch' block, but we have to be careful about where to place them, depending on what 'then' blocks we want to be executed in case of error:
setTimer(2000)
	.then(function () {
		console.log('First timer completed');
		return 123;
	})
	.then(function (data) {
		console.log('Second then');
		console.log(data);
		return setTimer(3000);
	})
	.catch(function (err) {
		console.log('Error');
	}) // for example, if we place the 'catch' block here, we will catch any error from any of the previous three promises, so in case of error, none of the success functions of the previous 'then' blocks will be executed, but I want to always executed the following 'then' block:
	.then(function (data) {
		console.log('Second timer completed');
		console.log(data);
	});

// take into account that, apart from the 'then', 'catch' methods, there are many other methods for promises. for example, 'finally()', which allows you to always execute code when the promise is settled, no matter if the promise succeeded or failed (check MDN):
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
