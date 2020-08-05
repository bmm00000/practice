const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');

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
router.post('/', isLoggedIn, (req, res) => {
	let name = req.body.name;
	let image = req.body.image;
	let descr = req.body.description;
	let newCampground = { name: name, image: image, description: descr };
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
router.get('/new', isLoggedIn, (req, res) => {
	res.render('campgrounds/new');
});

// show route = shows more info about the campground
//watch out! the show route has to be after the new route, otherwise the new route will be triggered when you type an id in the url:
router.get('/:id', (req, res) => {
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			console.log(foundCampground);
			res.render('campgrounds/show', { campground: foundCampground });
		}
	});
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

module.exports = router;
