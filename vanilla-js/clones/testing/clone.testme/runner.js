const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

class Runner {
	constructor() {
		this.testFiles = [];
	}

	async runTests() {
		for (let file of this.testFiles) {
			console.log(chalk.blue(`We are testing the file ${file.shortName}`));
			const beforeEaches = [];
			global.beforeEach = (func) => {
				beforeEaches.push(func);
			};

			global.it = (desc, fn) => {
				beforeEaches.forEach((func) => func());
				console.log(chalk.yellow(`\tTest description: ${desc}`));
				try {
					fn();
					console.log(
						chalk.green(`\t\tCongratulations! The test was successful`)
					);
				} catch (err) {
					console.log(chalk.red(`\t\tOh no! The test failed!`));
					console.log(chalk.red(`\t\t${err.message}`));
				}
			};

			try {
				require(file.name);
			} catch (err) {
				console.log(
					chalk.red(
						'Oh no! There is something wrong with the file, not related to the tests. This is what we found:'
					)
				);
				console.log(chalk.red(err));
			}
		}
	}

	async collectFiles(targetPath) {
		const files = await fs.promises.readdir(targetPath);

		for (let file of files) {
			const filepath = path.join(targetPath, file);
			const stats = await fs.promises.lstat(filepath);

			if (stats.isFile() && file.includes('test.js')) {
				this.testFiles.push({ name: filepath, shortName: file });
			} else if (stats.isDirectory()) {
				const childFiles = await fs.promises.readdir(filepath);
				files.push(...childFiles.map((f) => path.join(file, f)));
			}
		}
	}
}

module.exports = Runner;
