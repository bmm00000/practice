const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const middleware = require('../middleware');
// when you only point at the folder ('middleware'), by default it requires from the 'index.js' file.

// index route - show all campgrounds
router.get('/', (req, res) => {
	Campground.find({}, function(err, campgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds/index', { campgrounds });
		}
	});
});

// create route - add new campground to DB
router.post('/', middleware.isLoggedIn, (req, res) => {
	let name = req.body.name;
	let price = req.body.price;
	let image = req.body.image;
	let descr = req.body.description;
	let author = {
		id: req.user._id,
		username: req.user.username
	};
	let newCampground = { name: name, price: price, image: image, description: descr, author: author };
	// create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/campgrounds');
			//we have two 'campgrounds' routes, but the default is to redirect to the GET route
		}
	});
});

// new route -  form to create new campground
router.get('/new', middleware.isLoggedIn, (req, res) => {
	res.render('campgrounds/new');
});

// show route = shows more info about the campground
//watch out! the show route has to be after the new route, otherwise the new route will be triggered when you type an id in the url:
router.get('/:id', (req, res) => {
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds/show', { campground: foundCampground });
		}
	});
});

// EDIT CAMPGROUND ROUTE
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findById(req.params.id, function(err, foundCampground) {
		res.render('campgrounds/edit', { campground: foundCampground });
	});
});

// UPDATE CAMPGROUND ROUTE
router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
	// find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
		if (err) {
			res.redirect('/campgrounds');
		} else {
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

// DESTROY CAMPGROUND ROUTE
router.delete('/:id', middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			res.redirect('/campgrounds');
		} else {
			res.redirect('/campgrounds');
		}
	});
});

// authentication is to check that you are who you say you are. authorisation is to give you permission to do what kind of things, after we have aunthenticated you. for example, logged in users can add reviews, but cannot edit submissions of camps, only authors can do that.

module.exports = router;
