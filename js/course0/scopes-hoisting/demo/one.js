var myName = 'Jose';

// when you are creating a variable on the global scope in one file, it is avaialble in the global scope of all files, because there's no file specific scope (at least when you are importing scripts like this). therefore, what's in this file global scope, it's in the general global scope, and therefore, also in the global scope of two.js
// there's also one global object. therefore, if myName is added in the global object, it will also be available in the global object in two.js because we are talking about the same global object.

const myAge = 26;
// however, with 'let' or 'const', the situation is different: the variable or constant is not added to the global object, so it's not available in the global object. however, myAge is available in two.js, because there's no file specific scope, and that does not change for block scope: something that is available in the higher block scope in one.js is also available in the most top block scope of two.js, because they are sharing the same most top block scope.
