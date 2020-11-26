const Carer = require('../models/carer');

module.exports.index = async (req, res) => {
	const carers = await Carer.find({});
	res.render('carers/index', { carers });
};

module.exports.renderNewForm = (req, res) => {
	res.render('carers/new');
};

module.exports.createCarer = async (req, res, next) => {
	const carer = new Carer(req.body.carer);
	carer.images = req.files.map((f) => ({ url: f.path, filename: f.filename }));
	carer.author = req.user._id;
	await carer.save();
	req.flash('success', 'Profile added successfully!');
	res.redirect(`/carers/${carer._id}`);
};

module.exports.showCarer = async (req, res) => {
	const carer = await Carer.findById(req.params.id)
		.populate({ path: 'reviews', populate: { path: 'author' } })
		.populate('author');
	if (!carer) {
		req.flash('error', 'Cannot find that carer');
		return res.redirect('/carers');
	}
	res.render('carers/show', { carer });
};

module.exports.renderEditForm = async (req, res) => {
	const { id } = req.params;
	const carer = await Carer.findById(id);
	if (!carer) {
		req.flash('error', 'Cannot find that carer');
		return res.redirect('/carers');
	}
	res.render('carers/edit', { carer });
};

module.exports.updateCarer = async (req, res) => {
	const { id } = req.params;
	const carer = await Carer.findByIdAndUpdate(id, { ...req.body.carer });
	req.flash('success', 'Profile updated successfully');
	res.redirect(`/carers/${carer._id}`);
};

module.exports.deleteCarer = async (req, res) => {
	const { id } = req.params;
	await Carer.findByIdAndDelete(id);
	req.flash('success', 'Profile deleted sucessfully');
	res.redirect('/carers');
};
