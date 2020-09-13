#!/usr/bin/env node

const debounce = require('lodash.debounce');
const chokidar = require('chokidar');
const program = require('caporal'); // we call it program because we receive an object representing the program that we are trying to build (look at the documentation, it also uses 'prog' or 'program')
const fs = require('fs');
const { spawn } = require('child_process');

program.version('0.0.1').argument('[filename]', 'Name of a file to execute').action(async ({ filename }) => {
	// you can also do 'args.filename'

	// console.log(args); this will print '{filename: filetorun.js}', for example.

	const name = filename || 'index.js';

	// we need to check whether or not there is a file with that name (and we have permission to access it):
	try {
		await fs.promises.access(name);
	} catch (err) {
		throw new Error(`Could not find the file ${name}`);
	}

	const start = debounce(() => {
		spawn('node', [ name ], { stdio: 'inherit' });
	}, 100);
	// we use debounce from npm, or the function will be called many times (look at the screenshots)
	// 'spawn' is a child (or secondary process) we are running. it's as if we run 'node index.js' in the terminal. 'stdio: inherit' means that all the resulting errors, consolelogs, etc from this process will be inherited in our program.
	// in order to test this, we create 'test.js' and run 'watchit test.js', then the 'start' function will be run every time we change and save the code there.

	// EXPLANATION ABOUT 'stdio: inherit': when we start a program from our terminal, we start a 'process' (look at the screenshot). when this process is created, it gets assigned three communication channels: standardin, standardout, standarderror (these channels are used to communicate with the process). For example, if we run someting from our terminal while the program is running, that input is sent to standardin, our program will get that command and can give back something, for example, a console.log, using standardout, or an error, using standarderror.
	// child processes don't have any way to receive or send their info. that's why we use 'stdio: inherit', in order to wire the two processes together.

	chokidar.watch('.').on('add', start).on('change', start).on('unlink', start);
	// 'unlink' means that we are deleting a file
});

program.parse(process.argv);
// look at caporal documentation to understand the different methods: we give it a 'version' and then an optional argument using [] (this is optional, hence if we don't give the filename, the program will run index.js by default. if there is not index.js file, then we will get an error), then a string about what the command is doing ('Name of a file...'). 'args' is an object that includes all the different arguments that we provided.
// if we type in the CLI 'watchit', then we get '{}', because we didn't give any argument. if we type in the CLI 'watchit filetorun.js', then we get the object including this argument (this is when we were doing console.log of the args).
// the good thing about caporal is, if you type in the CLI 'watchit -h', you get nice info about how to use our program
