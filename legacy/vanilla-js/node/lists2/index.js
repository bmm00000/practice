#!/usr/bin/env node

const fs = require('fs'); // file system module from node standard library
const util = require('util');
const chalk = require('chalk');
const path = require('path'); // this is another module from node standard library. it will help us to find the path to specific files. otherwise, we only have strings with the name of the files and we will get an error because of it when running lstat. this module is useful to assure cross-platform compability of our code (mac, windows, etc)

// in order to change file permissions for index.js, you have to type the following in the CLI (in the directory of the project): chmod +x index.js
// next, you add a comment at the top to be able to run the file as an executable (look at the top of this file)
// next, you go to the terminal and link your project typing this: npm link (this is going to enable you to execute the command from any directory in your computer, maybe you need to use 'sudo')

// method 2:
// we require 'util' from node standard library (look above)
// const lstat = util.promisify(fs.lstat);

// method 3:
// const lstat = fs.promises.lstat;
// or, destructuring:
const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
	if (err) {
		console.log(err);
	}
	// we have to decide whether to console.log the error, or to 'throw new Error(err)'. if you don't want the program to continue executing when there's an error, use the second (or console.log(err); return). otherwise, if you want to run the other code inside this function, you can use the first.

	// 'filenames' is just an array of strings. we are going to see if the item is a file or a folder

	// BAD CODE HERE!!
	// for (let filename of filenames) {
	// 	fs.lstat(filename, (err, stats) => {
	// 		if (err) {
	// 			console.log(err);
	// 		}
	// 		console.log(filename, stats.isFile());
	// 	});
	// }
	// BAD CODE COMPLETE!! That's bad code because node has to reach the hard drive in order to invoke the callback of fs.lstat, and this may take different amounts of time, and the order of the printed files will not be the same if you invoke this function several times, since it takes different amounts of time for each one, and maybe it prints the second file before the first, etc.

	// the first of the three options to solve the order problem:

	// const allStats = Array(filenames.length).fill(null);

	// for (let filename of filenames) {
	// 	const index = filenames.indexOf(filename);
	// 	fs.lstat(filename, (err, stats) => {
	// 		if (err) {
	// 			console.log(err);
	// 		}
	// 		allStats[index] = stats;

	// 		const ready = allStats.every((stats) => {
	// 			return stats;
	// 		});

	// 		if (ready) {
	// 			allStats.forEach((stats, index) => {
	// 				console.log(filenames[index], stats.isFile());
	// 			});
	// 		}
	// 	});
	// }

	// the second of the three options to solve the order problem (look at the screenshot with the three options):
	// wrapping lstat with a promise (we have three methods to wrap lstat with a promise):

	// // method 1:
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

	// method 2 and method 3 are above, we can any of them, we will get the same result.

	// for (let filename of filenames) {
	// 	try {
	// 		const stat = await lstat(filename);

	// 		console.log(filename, stat.isFile());
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }

	// the third of the three options to solve the order problem (look at the screenshot with the three options):
	// it's like a combination of the two other options(with this option you will get much better performance if you have many operations to do):
	const statPromises = filenames.map((filename) => {
		return lstat(path.join(targetDir, filename));
	});

	const allStats = await Promise.all(statPromises);

	// for (let stats of allStats) {
	// 	const index = allStats.indexOf(stats);
	// 	console.log(filenames[index], stats.isFile());
	// }

	// now we want to add colours or styles to the filename, depending on whether it's a folder or not. in order to do that, we need to download 'chalk' from npm and require it (look above):

	for (let stats of allStats) {
		const index = allStats.indexOf(stats);

		if (stats.isFile()) {
			console.log(filenames[index]);
		} else {
			console.log(chalk.bold(filenames[index]));
		}
	}

	// but in the original 'ls' command, we can print the content of any directory, as far as you pass the path, for example 'ls ljdslf/ljsdlf/jlsdjf'. That's what we are going to do now:

	// console.log(process.argv);
	// if you run this, it will give you information about how the program was executed in an array or strings. if you run 'nls hellothere' it will give you 'hellothere' in the third position of the string (index 2).
	// we will use this in the 'targetDir' (look above)
});
