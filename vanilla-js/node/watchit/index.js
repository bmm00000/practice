#!/usr/bin/env node

const debounce = require('lodash.debounce');
const chokidar = require('chokidar');
const program = require('caporal'); // we call it program because we receive an object representing the program that we are trying to build (look at the documentation, it also uses 'prog' or 'program')
const fs = require('fs');
const { spawn } = require('child_process');
const chalk = require('chalk');

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

	let proc;
	const start = debounce(() => {
		if (proc) {
			proc.kill();
		}
		console.log(chalk.blue('>>> Starting process...'));
		proc = spawn('node', [ name ], { stdio: 'inherit' });
	}, 100);
	// look at 'kill()' in documentation for child processes. we do this, or the old processes will still run as we create new ones (for example, if we use 'setInterval()' in 'test.js').

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

// explanation about 4 child_process functions (look at the screenshots):
// are the commands that we pass executed in the shell or not? are the outputs passed to our program in a stream or not?
// the terminal is the interface, the shell is the brain of the terminal
// for example if we type in the terminal: cat index.js | wc -l (this counts the number of lines, the shell takes the stuff from 'cat index.js' and throws it into the other part. had it not been for the shell, we could not run complex commands like this, we would be limited to one-off simple commands).
// in the exec function of the screenshot, the first command passed it is executed in the shell, so it can be complex (look at the examples in the documentation). therefore, if you need to run some complex commands, use 'exec'.
// 'stream' is how the information from the child process is sent back to the primary process (look at screenshot). if there is no stream of info, the child process finishes before everything is sent back to the primary process (look at screenshot). if there is stream of info, the different outputs of the child process are sent back to the primary process one by one.
// 'spawn' is the most important function, the other ones are just using 'spawn' with other options to it. Also, you can add the option of using the shell when you use 'spawn' (look at the documentation). also, you can get streammed info from 'exec' and 'execFile' by inpecting the object that you get back as the process... the entire point is that: what you really need to know is the 'spawn' function, becuase you can pass options and make it behave like the other functions. The one exeption to this is the 'fork' function.
