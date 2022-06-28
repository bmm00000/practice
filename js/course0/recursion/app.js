// even though js already has a built-in method made available by the browser to calculate factorials in the Math object (Math.factorial()), we are going to write our own factorial function:

// quite often, recursion is an alternative to a regular loop. let's start with a loop based solution:

function factorialLoop(n) {
	let result = 1;

	for (let i = 0; i < n; i++) {
		result = result * (n - i);
	}

	return result;
}

// in the recursive solution, we will have less code, which is one of the reasons why we may prefer a recursive solution:

function factorialRec(n) {
	if (n === 0) {
		return 1;
	}
	// when you use recursion, you need an exit condition or base case. otherwise you will have an infinite loop.

	return n * factorialRec(n - 1);
}

// the same function, refactored into a one liner, using a teranary expression:
function factorialRecRef(n) {
	return n === 0 ? 1 : n * factorialRecRef(n - 1);
}

// keep in mind that there are some limits imposed by the js engine, ie. you can't call an infinite amount of times the function from inside of it (js will complain and your script will crash at some point). in this example, this would happen if you pass an 'n' that is too large, like 10000 or more.

console.log(factorialRec(3));
