const express = require('express');
const router = express.Router();
const carers = require('../controllers/carers');

const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateCarer, isAuthor } = require('../middleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const Carer = require('../models/carer');

router
	.route('/')
	.get(catchAsync(carers.index))
	// .post(isLoggedIn, validateCarer, catchAsync(carers.createCarer));
	.post(upload.array('image'), (req, res) => {
		console.log(req.body, req.files);
		res.send('done');
	});

router.get('/new', isLoggedIn, carers.renderNewForm);

router
	.route('/:id')
	.get(catchAsync(carers.showCarer))
	.put(isLoggedIn, isAuthor, validateCarer, catchAsync(carers.updateCarer))
	.delete(isLoggedIn, isAuthor, catchAsync(carers.deleteCarer));

router.get(
	'/:id/edit',
	isLoggedIn,
	isAuthor,
	catchAsync(carers.renderEditForm)
);

module.exports = router;
