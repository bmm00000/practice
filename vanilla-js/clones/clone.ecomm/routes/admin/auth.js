const express = require('express');
const { validationResult } = require('express-validator');

const usersRepo = require('../../repositories/users');
const signUpTemplate = require('../../views/admin/auth/signup');
const signInTemplate = require('../../views/admin/auth/signin');
const {
	requireEmail,
	requirePassword,
	requirePasswordConfirmation,
	requireValidEmail,
	requireValidPassword,
} = require('./validators');

const router = express.Router();

router.get('/signup', (req, res) => {
	res.send(signUpTemplate({ req }));
});

router.post(
	'/signup',
	[requireEmail, requirePassword, requirePasswordConfirmation],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.send(signUpTemplate({ req, errors }));
		}

		const { email, password } = req.body;

		const user = await usersRepo.create({ email, password });

		req.session.userId = user.id;

		res.send('Account created');
	}
);

router.get('/signout', (req, res) => {
	req.session = null;
	res.send('You are logged out');
});

router.get('/signin', (req, res) => {
	res.send(signInTemplate({}));
});

router.post(
	'/signin',
	[requireValidEmail, requireValidPassword],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.send(signInTemplate({ errors }));
		}

		const { email } = req.body;
		const user = await usersRepo.getOneBy({ email });
		req.session.userId = user.id;

		res.send('You are logged in');
	}
);

module.exports = router;
