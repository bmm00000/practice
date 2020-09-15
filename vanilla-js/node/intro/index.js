const message = require('./myscript');

console.log(message);

// when you execute this, node wrappes this code inside of a function and executes it. 5 different arguments are passed into this function authomatically: exports, require, module, __filename, __dirname. You can detect all these arguments:
// console.log(arguments)
// or specific ones, for example:
// console.log(require)
// console.log(__filename)
// etc...

// the Require Cache is an object that stores the result of requiring a file: it has keys and values. The keys are the name of the files from which we export, and the values is what we export from those files. If you require another time the same file, node is going to require from the Require Cache, not from the file, that's why:: we only execute a file ONE single time (whatever you export from that file, is what you will get forever)
// You can access the Require Cache:
// console.log(require.cache)

// debugging:
// once you are inside 'node inspect index.js', you can use c, n, s, o. Also, the REPL command starts an execution environment where we can inspect variables that we already covered while debugging. Once you have inspected the variables that you want, you type 'control + c' and you get back to the debug prompt (and you can continue using c, n, s, o)

// '--inspect-brk' stops at the first line of code and waits until you start to inspect. '--inspect' runs authomatically until a 'debugger statement is hit (this is useful for longer scripts, like in a server). you will use '--inspect-brk' in most cases.
