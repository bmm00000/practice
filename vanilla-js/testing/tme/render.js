// we are going to load up an html file and its associated js file inside of a node environment (this is what jsdom does (look at the screenshot))

const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
// JSDOM is a constructor, or class of sorts that we can use to create an instance of a fake browser inside of node.
// we are going to use a sample project (sample-web-project) to learn how to use jsdom in general, later we will apply it to our framework.

const render = async (filename) => {
	const filePath = path.join(process.cwd(), filename);

	const dom = await JSDOM.fromFile(filePath, {
		runScripts: 'dangerously',
		resources: 'usable'
	});
	// 'dangerously' because we are going to run some js code (the one linked to the html file) in the node.js environment, node has access to the file system of our computer, so things could get deleted, etc.

	return new Promise((resolve, reject) => {
		dom.window.document.addEventListener('DOMContentLoaded', () => {
			resolve(dom);
		});
	});
};

module.exports = render;
