#!/usr/bin/env node

const debounce = require('lodash.debounce');
const chokidar = require('chokidar');
const program = require('caporal'); // we call it program because we receive an object representing the program that we are trying to build (look at the documentation, it also uses 'prog' or 'program')

program.version('0.0.1').argument('[filename]', 'Name of a file to execute').action((args) => {
	console.log(args);
});

program.parse(process.argv);
// look at caporal documentation to understand the different methods: we give it a 'version' and then an optional argument using [] (this is optional, hence if we don't give the filename, the program will run index.js by default. if there is not index.js file, then we will get an error), then a string about what the command is doing ('Name of a file...'). 'args' is an object that includes all the different arguments that we provided.
// if we type in the CLI 'watchit', then we get '{}', because we didn't give any argument. if we type in the CLI 'watchit filetorun.js', then we get the object including this argument.
// the good thing about caporal is, if you type in the CLI 'watchit -h', you get nice info about how to use our program

// const start = debounce(() => {
// 	console.log('Starting users program');
// }, 100); we use debounce from npm, so the function will be called many times (look at the screenshots)

// chokidar
// 	.watch('.')
// 	.on('add', start)
// 	.on('change', () => {
// 		console.log('file changed');
// 	})
// 	.on('unlink', () => {
// 		console.log('file unlinked');
// 	});
