const Carer = require('../models/carer');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
	const carer = await Carer.findById(req.params.id);
	const review = new Review(req.body.review);
	review.author = req.user._id;
	carer.reviews.push(review);
	await review.save();
	await carer.save();
	req.flash('success', 'Review created successfully');
	res.redirect(`/carers/${carer._id}`);
};

module.exports.deleteReview = async (req, res) => {
	const { id, reviewId } = req.params;
	await Carer.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
	await Review.findByIdAndDelete(req.params.reviewId);
	req.flash('success', 'Review deleted sucessfully');
	res.redirect(`/carers/${id}`);
};
