const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview } = require('../middleware');
const Carer = require('../models/carer');
const Review = require('../models/review');

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

router.post(
	'/',
	validateReview,
	catchAsync(async (req, res) => {
		const carer = await Carer.findById(req.params.id);
		const review = new Review(req.body.review);
		carer.reviews.push(review);
		await review.save();
		await carer.save();
		req.flash('success', 'Review created successfully');
		res.redirect(`/carers/${carer._id}`);
	})
);

router.delete(
	'/:reviewId',
	catchAsync(async (req, res) => {
		const { id, reviewId } = req.params;
		await Carer.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
		await Review.findByIdAndDelete(req.params.reviewId);
		req.flash('success', 'Review deleted sucessfully');
		res.redirect(`/carers/${id}`);
	})
);

module.exports = router;
