const path = require('path');

const express = require('express');

const router = express.Router();

const users = [];

router.get('/', (req, res) => {
	res.render('index', { pageTitle: 'Add user!' });
});

router.post('/users', (req, res) => {
	users.push(req.body);
	res.redirect('/users');
});

router.get('/users', (req, res) => {
	res.render('users', { pageTitle: 'Users!', users });
});

module.exports = router;
