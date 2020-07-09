// const http = require('http');

// const server = http.createServer((request, response) => {
// 	console.log('headers', request.headers);
// 	console.log('method', request.method);
// 	console.log('url', request.url);
// 	const user = {
// 		name: 'John',
// 		surname: 'Smith'
// 	};

// 	response.setHeader('Content-Type', 'application/json');
// 	response.end(JSON.stringify(user));
// });

// server.listen(3000);

const express = require('express');

const app = express();

app.get('/', (req, res) => {
	res.send('jsdksdjflds');
});

app.listen(3000);
