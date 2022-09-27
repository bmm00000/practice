const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
	res.send('<h1>Hello there!</h1>');
});

app.listen(3000, () => {
	console.log('Listening at port 3000...');
});
