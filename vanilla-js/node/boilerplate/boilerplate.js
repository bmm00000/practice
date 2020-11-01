const fs = require('fs');

const folderName = process.argv[2] || 'Project';

try {
	fs.mkdirSync(folderName);
	fs.writeFileSync(`${folderName}/index.html`);
	fs.writeFileSync(`${folderName}/app.css`);
	fs.writeFileSync(`${folderName}/app.js`);
} catch (err) {
	console.log('Something went wrong');
	console.log(err);
}
