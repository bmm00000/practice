const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
	res.send('<h1>Hello there!</h1>');
});

app.get('/current-time', (req, res, next) => {
	res.send('<h1>' + new Date().toISOString() + '</h1>');
});

app.get('/form', (req, res, next) => {
	res.send(
		'<form action="/form" method="POST"><label for="username">Username</label><input type="text" name="username" id="username" /><button type="submit">Submit</button></form>'
	);
});

app.post('/form', (req, res, next) => {
	const userName = req.body.username;
	const filePath = path.join(__dirname, 'data', 'user-data.json');
	const fileJSONData = fs.readFileSync(filePath);
	const usersData = JSON.parse(fileJSONData);
	usersData.push(userName);
	fs.writeFileSync(filePath, JSON.stringify(usersData));
	res.send('Username stored!');
});

app.listen(3000, () => {
	console.log('Server listening at port 3000...');
});
