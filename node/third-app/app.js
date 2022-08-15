const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', (req, res, next) => {
	console.log('this middleware applies to all requests');
	next();
});

app.use('/add-user', (req, res, next) => {
	res.send(
		'<html><h1>Add user</h1><form action="/user" method="POST">	<input type="text" name="new-user" /><button>Add user</button></form></html>'
	);
});

app.use('/users', (req, res, next) => {
	console.log(req.body);
	res.redirect('/');
});

app.use('/', (req, res, next) => {
	res.send('<h1>We are in the last middleware!</h1>');
});

app.listen(3000);
