function greet(name) {
	console.log('Hi ' + name);
}

greet('Jose');
// we don't use var, let or const for 'name'. what's its scope, global or local...?
console.log(name);
// we should get an error but nothing gets printed instead! this is a niche case: 'name' is a default globally available variable in the browser.

// let's do the same thing with a variable that is not globally available in the browser:
function printAge(age) {
	console.log('I am ' + age);
}
printAge(26);
console.log(age);
// now we get an error: 'age' is not defined.

// in both situations, just because we pass an argument to a function, it doesn't make it globally available. in reality, the argument is function scoped (only available inside the function)

// another special case:
for (var i = 0; i < 10; i++) {
	console.log(i);
}
console.log(i); // it will print 10. with 'var', 'i' is a global variable (there is no block scope when we use 'var')

for (let i = 0; i < 10; i++) {
	console.log(i);
}
console.log(i); // it will throw an error. with 'let', 'i' is defined (and re-defined with every iteration) inside of the block, even though we have a loop, and therefore it's outside of the {}.

// a related special case (try the following in the console of the browser):
try {
	// code that could fail. here, we are going to deliberately trigger an error:
	throw new Error();
	// 'Error' is a built-in constructor function. with the 'new' keyword, we can build an object based on that constructor function.
} catch (err) {
	var test = 'Does this work?';
	const test2 = 'Does this work?';
	console.log(err);
}
console.log(err); // is the 'err' object available here?? it throws an error! even though 'catch' is not a function, and even though there's no 'let' or 'const' in the block, 'catch' has its own scope (that's a special thing in js: try/catch existed long before 'let' and 'const' (hece, before block scopes were proposed), so we are not dealing with some special kind of block scope, this is really an exception: you have a special scope ONLY for the 'err' parameter. THE FOLLOWING WILL WORK:
console.log(test); // 'test' is on the global scope.
console.log(test2); // 'test2' is not visible here, since it's in block scope.
