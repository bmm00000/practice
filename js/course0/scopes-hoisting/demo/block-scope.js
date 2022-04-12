// block scope is only a thing if you are working with let and const. the different thing about block scope compared with global/local scope, is that block scope gives us more places in our code where we create a new scope, esentially everywhere where we use {}, as long as we are not using {} to create a new js object, but where we are using {} for 'if' statements, 'for' loops, 'while' loops, 'switch' statements, etc. all these don't have their own scope when using 'var'.

if (true) {
	var myAge = 26; // global scope
	console.log(myAge);
	let yourAge = 27; // block scope
	console.log(yourAge);
}
console.log(myAge); // it will work.
// if we use 'var' inside of a block, it's global scope.
console.log(yourAge); // it will throw an error.
// if we use 'let' or 'const' inside of a block, it's block scope.

// REMEMBER! objects in js are not blocks!
// but any other {} is a block. you don't see this often, but technically the following is also a block:

{
	// this is a block
	const myName = 'Tony'; // block scope
}

console.log(myName);
// this will throw an error, since that variable is in that block scope.

// block scope gives a more fine grained control over our varibles, because we don't just have global and function scopes, but we have scopes everywhere, and these restrictions forces you to write cleaner code, and to be clear about where things are usable.

// WATCH OUT! the following is also technically block scope:
const yourName = 'Ana'; // block scope, although this variable will be available everywhere in this file, so it would behave the same way as global scope.
// it's not global scope, because it uses the 'const' keyword: every time you have 'let' or 'const', you have block scopes.
