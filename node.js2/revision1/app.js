const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res, next) {
	res.send('<h1>This is the home page</h1>');
});

app.get('/time', function (req, res, next) {
	res.send('<h1>' + new Date().toISOString() + '</h1>');
});

app.get('/store-username', function (req, res, next) {
	res.send(
		'<form action="/store-username" method="POST"><label for="username">Name:</label><input type="text" id="username" name="username" /><button type="submit">Store name</button></form>'
	);
});

app.post('/store-username', function (req, res, next) {
	const userName = req.body.username;

	const filePath = path.join(__dirname, 'data', 'users.json');
	const fileData = fs.readFileSync(filePath);
	const existingUsers = JSON.parse(fileData);
	existingUsers.push(userName);
	fs.writeFileSync(filePath, JSON.stringify(existingUsers));

	res.send('Username stored! :)');
});

app.get('/users', function (req, res, next) {
	const filePath = path.join(__dirname, 'data', 'users.json');
	const fileData = fs.readFileSync(filePath);
	const existingUsers = JSON.parse(fileData);
	let responseData = '<ul>';
	for (const user of existingUsers) {
		responseData += `<li>${user}</li>`;
	}
	responseData += '</ul>';
	res.send(responseData);
});

app.listen(3000);

// const http = require('http');

// const serverHandler = (req, res) => {
// 	if (req.url === '/time') {
// 		res.statusCode = 200;
// 		res.end('<h1>' + new Date().toISOString() + '</h1>');
// 	} else if (req.url === '/') {
// 		res.statusCode = 200;
// 		res.end('<h1>This is the home page</h1>');
// 	} else {
// 		res.statusCode = 200;
// 		res.end('<h1>This is just another page</h1>');
// 	}
// };

// const server = http.createServer(serverHandler);

// server.listen(3000);
