const fs = require('fs/promises');

function thisMightFail() {
	let fileData = 'haha';
	try {
		// const fileData = fs.readFileSync('book.json');
		const fileData = 'jaja';
		console.log('we read the book, we are so smart');
		console.log(fileData);
	} catch (err) {
		console.log('we didnt find the book');
		// console.log(err);
	}
	console.log('we are done with books');
	console.log(fileData);
}

// thisMightFail();

async function readTheFile() {
	try {
		const fileData = await fs.readFile('data.txt');
		console.log(fileData.toString());
	} catch (error) {
		console.log('error mate!');
	}

	console.log('this comes last');
}

readTheFile();
