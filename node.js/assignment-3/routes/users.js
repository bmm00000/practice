const path = require('path');

const express = require('express');

const rootDir = require('../utils/dirname');

const router = express.Router();

router.get('/', (req, res) => {
	res.sendFile(path.join(rootDir, 'views', 'index.html'));
});

router.get('/users', (req, res) => {
	res.sendFile(path.join(rootDir, 'views', 'users.html'));
});

module.exports = router;
