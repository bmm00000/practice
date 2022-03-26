var myAge = 26;
// here, we declared and defined a variable in global scope. global scope means that the variable is not inside of a function. therefore, the variable is available anywhere in this file, and also even in other js files that we import after this file in index.html

function greet() {
	function printAge() {
		console.log('Hi, I am ' + myAge + ' years old.');
	}
	var name = 'Jose'; // this variable is declared and defined in local scope (function scope)
	console.log('Hello ' + name);
	printAge();
}

console.log(myAge);
greet();
printAge(); // this is out of scope, since the printAge function is in the local scope of the 'greet' function.

// even though we only have one global scope, we can have multiple local or function scopes: you can have several functions next to each other or you can have functions inside of functions (nested)
