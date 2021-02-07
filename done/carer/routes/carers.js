const express = require('express');
const router = express.Router();
const carers = require('../controllers/carers');

const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateCarer, isAuthor } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router
	.route('/')
	.get(catchAsync(carers.index))
	.post(
		isLoggedIn,
		upload.array('image'),
		validateCarer,
		catchAsync(carers.createCarer)
	);

router.get('/new', isLoggedIn, carers.renderNewForm);

router
	.route('/:id')
	.get(catchAsync(carers.showCarer))
	.put(
		isLoggedIn,
		isAuthor,
		upload.array('image'),
		validateCarer,
		catchAsync(carers.updateCarer)
	)
	.delete(isLoggedIn, isAuthor, catchAsync(carers.deleteCarer));

router.get(
	'/:id/edit',
	isLoggedIn,
	isAuthor,
	catchAsync(carers.renderEditForm)
);

module.exports = router;
