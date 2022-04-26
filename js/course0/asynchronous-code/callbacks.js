setTimeout(function () {
	console.log('This will be executed AFTER');
	// this is a callback function, because it's passed as an argument to another function (the setTimeout function), so that internally that api which is exposed by the browser, is able to call the function that we passed at a later point in time.
}, 2000);

console.log('This will be executed BEFORE');

// keep in mind that we are not limited to use callbacks in the context of async operations: we can also write a function that takes a callback as an argument which might or might not be asynchronous. for example:
callItForMe(2, 4, function (res) {
	console.log(res);
});

function callItForMe(num1, num2, callbackFn) {
	const result = num1 + num2;
	callbackFn(result);
}
// esentially, a callback is a function that is passed as an argument to another function, and that will be executed by that other function. it doesn't have to involve an async operation. in a nutshell, just because you are dealing with callbacks, it doesn't mean that you are dealing with async code. callback functions are just a tool that we often use to deal with async operations.

// what we are doing in line 15 (non-async operation example) is what the browser will tell the js engine to do after the timer expires (async operation example), for example.

// another example of a callback to deal with an async operation (callbacks don't have to be anonymous functions, they can also be named functions):
const btn = document.querySelector('button');
btn.addEventListener('click', clickHandler);
function clickHandler() {
	console.log('Clicked!');
}
