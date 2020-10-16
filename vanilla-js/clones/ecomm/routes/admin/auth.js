const express = require('express');
const { check, validationResult } = require('express-validator');

const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const { requireEmail, requirePassword, requirePasswordConfirmation } = require('./validators');

const router = express.Router();

router.get('/signup', (req, res) => {
	res.send(signupTemplate({ req }));
});

router.post('/signup', [ requireEmail, requirePassword, requirePasswordConfirmation ], async (req, res) => {
	const errors = validationResult(req);
	console.log(errors);

	const { email, password, passwordConfirmation } = req.body;

	const user = await usersRepo.create({ email, password });

	req.session.userId = user.id;

	res.send('Account created!');
});

router.get('/signout', (req, res) => {
	req.session = null;
	res.send('You are signed out');
});

router.get('/signin', (req, res) => {
	res.send(signinTemplate());
});

router.post('/signin', async (req, res) => {
	const { email, password } = req.body;

	const user = await usersRepo.getOneBy({ email });

	if (!user) {
		return res.send('There is no user with this email');
	}

	const samePassword = await usersRepo.comparePasswords(user.password, password);
	if (!samePassword) {
		return res.send('Incorrect password');
	}

	req.session.userId = user.id;

	res.send('User logged in');
});

module.exports = router;
