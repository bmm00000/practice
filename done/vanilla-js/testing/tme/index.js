#!/usr/bin/env node

const Runner = require('./runner');
const runner = new Runner();

// now we are going to call the collectFiles function. however, collectFiles is async and we are probably running a version of node that does not allow for top level await expressions (we cannot just say 'await runner.collectFiles()'), so we have to use a helper function and wrap the await expression inside of it:
const run = async () => {
	await runner.collectFiles(process.cwd());
	runner.runTests();
};

run();
