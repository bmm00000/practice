const express = require('express');
const morgan = require('morgan');

const AppError = require('./AppError');

const app = express();

// app.use((req, res, next) => {
// 	console.log('this is the first middleware');
// 	return next();
// 	console.log('this is hte last things');
// });
// app.use((req, res, next) => {
// 	console.log('thjis is the second middleware');
// 	next();
// });

// app.use(morgan('tiny'));
// app.use((req, res, next) => {
// 	req.reqTime = Date.now();
// 	console.log(req.method, req.path, req.reqTime);
// 	next();
// });
// app.use('/dogs', (req, res, next) => {
// 	console.log('dogsheree');
// 	next();
// });

// app.use((req, res, next) => {
// 	const { password } = req.query;
// 	if (password === 'hello') {
// 		next();
// 	}
// 	res.send('no way in!');
// });

const verifyPassword = (req, res, next) => {
	const { password } = req.query;
	if (password === 'hello') {
		next();
	}
	// res.status(401);
	// throw new Error('get out of here! password required!');
	throw new AppError('Password redddquried', 401);
};

app.get('/', (req, res) => {
	res.send('Home page');
});

app.get('/admin', (req, res) => {
	throw new AppError('You are not an adminn', 403);
});

app.get('/error', (req, res) => {
	hello.hello();
});

app.get('/dogs', (req, res) => {
	res.send('wof wof');
});

app.get('/secret', verifyPassword, (req, res) => {
	res.send('This is my Big secrett!!');
});

app.use((req, res) => {
	res.status(404).send('Not found!');
});

app.use((err, req, res, next) => {
	// console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
	// console.log('^^^^^^^^^^^^^^error^^^^^^^^^^');
	// console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
	// // res.status(500).send('e3rror!!');
	// console.log(err);
	// next(err);
	const { status = 500, message = 'our default error message' } = err;
	res.status(status).send(message);
});

app.listen(3000, () => {
	console.log('Listening...');
});
