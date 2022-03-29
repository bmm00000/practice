function greet(name) {
	console.log('Hi ' + name);
}

greet('Jose');
// we don't use var, let or const for 'name'. what's its scope, global or local...?
console.log(name);
// nothing gets printed! this is a niche case: 'name' is a default globally available variable in the browser.

// let's do the same thing with a variable that is not globally available in the browser:
function printAge(age) {
	console.log('I am ' + age);
}
printAge(26);
console.log(age);
// now we get an error: 'age' is not defined.

// in both situations, just because we pass an argument to a function, it doesn't make it globally available. in reality, the argument is function scoped (only available inside the function)
