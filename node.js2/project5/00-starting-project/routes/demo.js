const express = require('express');
const bcrypt = require('bcrypt');

const db = require('../data/database');
const { localsName } = require('ejs');

const router = express.Router();

router.get('/', function (req, res) {
	res.render('welcome');
});

router.get('/signup', function (req, res) {
	let sessionEnteredData = req.session.enteredData;
	if (!sessionEnteredData) {
		sessionEnteredData = {
			hasError: false,
			enteredEmail: '',
			enteredConfirmedEmail: '',
			enteredPassword: '',
		};
	}

	req.session.enteredData = null;

	res.render('signup', { enteredData: sessionEnteredData });
});

router.get('/login', function (req, res) {
	let sessionEnteredData = req.session.enteredData;
	if (!sessionEnteredData) {
		sessionEnteredData = {
			hasError: false,
			enteredEmail: '',
			enteredPassword: '',
		};
	}

	req.session.enteredData = null;

	res.render('login', { enteredData: sessionEnteredData });
});

router.post('/signup', async function (req, res) {
	const userData = req.body;
	const enteredEmail = userData.email;
	const enteredConfirmedEmail = userData['confirm-email'];
	const enteredPassword = userData.password;
	const hashedPassword = await bcrypt.hash(enteredPassword, 12);

	if (
		!enteredEmail ||
		!enteredPassword ||
		!enteredConfirmedEmail ||
		enteredEmail !== enteredConfirmedEmail ||
		!enteredEmail.includes('@') ||
		enteredPassword.trim() < 6
	) {
		req.session.enteredData = {
			hasError: true,
			enteredEmail,
			enteredConfirmedEmail,
			enteredPassword,
			message: 'Invalid data. Try again with valid data...',
		};

		req.session.save(function () {
			res.redirect('/signup');
		});
		return;
	}

	const existingUser = await db
		.getDb()
		.collection('users')
		.findOne({ email: enteredEmail });

	if (existingUser) {
		req.session.enteredData = {
			hasError: true,
			enteredEmail,
			enteredConfirmedEmail,
			enteredPassword,
			message: 'The user already exists...',
		};

		req.session.save(function () {
			res.redirect('/signup');
		});
		return;
	}

	const user = {
		email: enteredEmail,
		password: hashedPassword,
	};

	await db.getDb().collection('users').insertOne(user);

	res.redirect('/login');
});

router.post('/login', async function (req, res) {
	const userData = req.body;
	const enteredEmail = userData.email;
	const enteredPassword = userData.password;

	const existingUser = await db
		.getDb()
		.collection('users')
		.findOne({ email: enteredEmail });

	if (!existingUser) {
		req.session.enteredData = {
			hasError: true,
			enteredEmail,
			enteredPassword,
			message: 'The user does not exist...',
		};

		req.session.save(function () {
			res.redirect('/login');
		});
		return;
	}

	const isPasswordCorrect = await bcrypt.compare(
		enteredPassword,
		existingUser.password
	);

	if (!isPasswordCorrect) {
		req.session.enteredData = {
			hasError: true,
			enteredEmail,
			enteredPassword,
			message: 'Password is not correct',
		};

		req.session.save(function () {
			res.redirect('/login');
		});
		return;
	}

	req.session.user = { id: existingUser._id, email: existingUser.email };
	req.session.isAuthenticated = true;
	req.session.save(function () {
		res.redirect('/profile');
	});
});

router.get('/admin', async function (req, res) {
	if (!res.locals.isAuth) {
		return res.status(401).render('401');
	}

	if (!res.locals.isAdmin) {
		return res.status(403).render('403');
	}

	res.render('admin');
});

router.get('/profile', function (req, res) {
	if (!res.locals.isAuth) {
		return res.status(401).render('401');
	}
	res.render('profile');
});

router.post('/logout', function (req, res) {
	req.session.user = null;
	req.session.isAuthenticated = false;
	res.redirect('/');
});

module.exports = router;
