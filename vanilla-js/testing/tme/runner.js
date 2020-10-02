// requirements (see screenshot): we are not going to be running anything inside of the browser, it's a CLI based tool.
// must be able to test browser-based apps: this is interesting, becuase we have to use mocha if you want to test browser-based js code, because node does not know anything about the DOM. how to combine this with the former requirement(it has to be a CLI tool)? you will see how to do it.

// the goal is to collect all the 'test.js' files first from whatever directory we are in at the moment. then we have to set up the environment to do the tests in the browser if needed. then we do the tests, and tabulate the results in the terminal (see screenshot)

const fs = require('fs');
const path = require('path');

class Runner {
	constructor() {
		this.testFiles = [];
	}

	async runTests() {
		for (let file of this.testFiles) {
			// global is a special keyword in node.js, similar to the window in the browser. if 'it' is not defined in this file, node is going to look for 'it' in the properties of the 'global' variable (again, like window in the browser). the 'global' object is shared between all different files (this is how mocha does it with 'it', btw)
			global.it = (desc, fn) => {
				console.log(desc);
			};
			require(file.name);
			// we use 'require' and not childProcess becuase we want to execute the files in the same process, not as a different process (with 'require', node finds and executes the file)
		}
	}

	// we want to go through all the files of the directory (including nested files), find all that end in a particular sufix, and include them in 'this.testFiles':
	async collectFiles(targetPath) {
		// the 'targetPath' is the path of the folder to investigate, for example: users/joseboix/documents/movies
		const files = await fs.promises.readdir(targetPath);
		// we use fs.promises because dealing with promises es much easier than dealing with callbacks.

		for (let file of files) {
			const filepath = path.join(targetPath, file);
			const stats = await fs.promises.lstat(filepath);

			if (stats.isFile() && file.includes('.test.js')) {
				this.testFiles.push({ name: filepath });
			} else if (stats.isDirectory()) {
				const childFiles = await fs.promises.readdir(filepath);

				files.push(
					...childFiles.map((f) => {
						path.join(file, f);
					})
				);
				// we use '...' to avoid including a nested array inside of the files array.
				// we use path.join to include the parent folder, or we will get the wrong filepath when we iterate through the childFiles
			}
		}
	}
}

module.exports = Runner;

// how do we go through all the files of a directory (nested files included)? (see example of 'movies' directory in the screenshot): this directory looks like a very common data structure, known as the 'tree' (look at the diagram of the movies tree in the screenshot). how to iterate through a tree data structure? there are two ways: Breath First search or traversal, and Deepth First search or traversal. We are going to use a Breath First search: we start from the top file, ask ask him: 'do you have any children?' if yes, we put the children in an array, and run a for loop over the array, and ask the same question to each file/folder, including the resulting children in the same array (see screenshot). At the end, we have all the elements of the main folder in the array. After that, we can go through all the elements of the array, and find the ones that end in 'test.js'. We are going to use this approach in our 'collectFiles' function.

// we are going to modify our Breath First traversal: we will only add folders to the array, not files. if it's a file and it ends in 'test.js', we will add that file to our 'this.test.Files'.
