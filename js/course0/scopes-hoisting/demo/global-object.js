var myName = 'Jose';

console.log(this.myName);
// the value of 'this' depends on the execution context. in this case, it refers to the global object (we are not inside of any other object). in the browser, the global object is the 'window' object.
console.log(self.myName); // the 'self' keyword will always refer to the global object. therefore, in this case, we two console.logs will be the same.

// all our variables and functions are added to our global object. again, this is something characteristic of js, not all programming languages have it:
function printAge(age) {
	console.log('I am ' + age);
}
this.printAge(26);
self.printAge(26);
// both will work and will be the same.

// BUT, if we use 'let' or 'const':
let yourName = 'Tatiana';
console.log(this.yourName); // undefined
console.log(self.yourName); // undefined

// with 'let' or 'const', this js behaviour whereby variables are added to the global object, IS DISABLED.
// therefore, the global object (the 'window' object if we are in the browser) is not the same as the global scope (or as scope in general): the global object is just a js object. 'scope' is a concept behind the scenes, not something that you can create, but something that is created authomatically when you use 'var', 'let' or 'const' in functions, blocks, etc.

// if we use a function expression:
const printSomething = function () {
	console.log('Something');
};
this.printSomething();
self.printSomething();
// throws an error in both cases, because we are storing the anonymous function in a 'const', so it's not getting added to the global object.
