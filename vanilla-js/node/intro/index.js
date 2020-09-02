const message = require('./myscript.js');

console.log(message);

// when you execute this, node wrappes this code inside of a function and executes it. 5 different arguments are passed into this function authomatically: exports, require, module, __filename, __dirname. You can detect all these arguments:
// console.log(arguments)
// or specific ones, for example:
// console.log(require)
// console.log(__filename)
// etc...

// the Require Cache is an object that stores the result of requiring a file: it has keys and values. The keys are the name of the files from which we export, and the values is what we export from those files. If you require another time the same file, node is going to require from the Require Cache, not from the file, that's why:: we only execute a file ONE single time (whatever you export from that file, is what you will get forever)
