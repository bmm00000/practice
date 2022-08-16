const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
	console.log('this applies to all requests');
	next();
});

app.use('/users', (req, res, next) => {
	res.send('<h1>This applies only to users!</h1>');
});

app.use('/', (req, res, next) => {
	res.send('<h1>This applies only to /!</h1>');
});

app.listen(3000);
