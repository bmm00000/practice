#!/usr/bin/env node

const fs = require('fs'); // file system module from node standard library
const util = require('util');
const chalk = require('chalk');
const path = require('path');

// Method 2
// const lstat = util.promisify(fs.stat);

// Method 3
const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd(); // the process module is added to the global scope of every project, so we don't have to require it.

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

// Method 1
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
