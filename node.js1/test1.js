const fs = require('fs');

const folderName = process.argv[2];
fs.mkdirSync(folderName);

fs.writeFileSync(`${folderName}/index.html`, 'hello');
fs.writeFileSync(`${folderName}/app.css`, 'styles');
fs.writeFileSync(`${folderName}/app.js`, 'script');
