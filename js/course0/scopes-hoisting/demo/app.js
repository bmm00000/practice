var myAge = 26;
// here, we declared and defined a variable in global scope. global scope means that the variable is not inside of a function. therefore, the variable is available anywhere in this file, and also even in other js files that we import after this file in index.html

function greet() {
	var name = 'Jose'; // this variable is declared and defined in local scope (function scope)
	console.log('Hello ' + name);
}

console.log(myAge);
greet();
