#!/usr/bin/env node

const fs = require('fs'); // file system module from node standard library
const util = require('util');
const chalk = require('chalk');
const path = require('path');

// in order to change file permissions for index.js, you have to type the following in the CLI (in the directory of the project): chmod +x index.js
// next, you add a comment at the top to be able to run the file as an executable (look at the top of this file)
// next, you go to the terminal and link your project typing this: npm link (this is going to enable you to execute the command from any directory in your computer)

// Method 2
// const lstat = util.promisify(fs.stat);

// Method 3
const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd(); // the process module is added to the global scope of every project, so we don't have to require it. We use process.cwd becuase it has better crossplatform compability than the '.'

fs.readdir(targetDir, async (err, filenames) => {
	if (err) {
		console.log(err);
		// we have to decide whether to console.log the error, or to 'throw new Error(err)'. if you don't want the program to continue executing when there's an error, use the second (or console.log(err); return). otherwise, if you want to run the other code inside this function, you can use the first.
	}

	const statPromises = filenames.map((filename) => {
		return lstat(path.join(targetDir, filename));
	});

	const allStats = await Promise.all(statPromises);

	for (let stats of allStats) {
		const index = allStats.indexOf(stats);
		if (stats.isFile()) {
			console.log(filenames[index]);
		} else {
			console.log(chalk.bold(filenames[index]));
		}
	}
});

// the easiest approach is to do 'BAD CODE' (look at the screenshot), but with that approach we don't know which callback from the different iterations of the for loop is going to go first (because it takes some time). Now we are going to see different methods to refactor this:

// Method 1
// with fs.lstat (from the node standard library), we can see if it's a file or a folder. Otherwise, the fs.readdir will give us an array of strings, and we don't know which one is a file and which one is a folder.
// const lstat = (filename) => {
// 	return new Promise((resolve, reject) => {
// 		fs.lstat(filename, (err, stats) => {
// 			if (err) {
// 				reject(err);
// 			}
// 			resolve(stats);
// 		});
// 	});
// };
