const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { carerSchema } = require('../schemas');
const ExpressError = require('../utils/ExpressError');
const Carer = require('../models/carer');

const validateCarer = (req, res, next) => {
	const { error } = carerSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

router.get(
	'/',
	catchAsync(async (req, res) => {
		const carers = await Carer.find({});
		res.render('carers/index', { carers });
	})
);

router.get('/new', (req, res) => {
	res.render('carers/new');
});

router.post(
	'/',
	validateCarer,
	catchAsync(async (req, res, next) => {
		// if (!req.body.carer) throw new ExpressError('Invalid carer data...', 400);

		const carer = new Carer(req.body.carer);
		await carer.save();
		req.flash('success', 'Profile added successfully!');
		res.redirect(`/carers/${carer._id}`);
	})
);

router.get(
	'/:id',
	catchAsync(async (req, res) => {
		const carer = await Carer.findById(req.params.id).populate('reviews');
		if (!carer) {
			req.flash('error', 'Cannot find that carer');
			return res.redirect('/carers');
		}
		res.render('carers/show', { carer });
	})
);

router.get(
	'/:id/edit',
	catchAsync(async (req, res) => {
		const carer = await Carer.findById(req.params.id);
		if (!carer) {
			req.flash('error', 'Cannot find that carer');
			return res.redirect('/carers');
		}
		res.render('carers/edit', { carer });
	})
);

router.put(
	'/:id',
	validateCarer,
	catchAsync(async (req, res) => {
		const { id } = req.params;
		const carer = await Carer.findByIdAndUpdate(id, { ...req.body.carer });
		req.flash('success', 'Profile updated successfully');
		res.redirect(`/carers/${carer._id}`);
	})
);

router.delete(
	'/:id',
	catchAsync(async (req, res) => {
		const { id } = req.params;
		await Carer.findByIdAndDelete(id);
		req.flash('success', 'Profile deleted sucessfully');
		res.redirect('/carers');
	})
);

module.exports = router;
