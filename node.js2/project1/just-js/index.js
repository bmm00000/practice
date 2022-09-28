const fs = require('fs');

function thisMightFail() {
	try {
		const fileData = fs.readFileSync('book.json');
		console.log('we read the book, we are so smart');
	} catch (err) {
		console.log('we didnt find the book');
		// console.log(err);
	}
	console.log('we are done with books');
}

thisMightFail();
