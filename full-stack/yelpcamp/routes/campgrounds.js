const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const campground = require('../models/campground');

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
	let author = {
		id: req.user._id,
		username: req.user.username
	};
	let newCampground = { name: name, image: image, description: descr, author: author };
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
			res.render('campgrounds/show', { campground: foundCampground });
		}
	});
});

// EDIT CAMPGROUND ROUTE
router.get('/:id/edit', checkCampgroundOwnership, (req, res) => {
	Campground.findById(req.params.id, function(err, foundCampground) {
		res.render('campgrounds/edit', { campground: foundCampground });
	});
});

// UPDATE CAMPGROUND ROUTE
router.put('/:id', checkCampgroundOwnership, (req, res) => {
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
router.delete('/:id', checkCampgroundOwnership, (req, res) => {
	Campground.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			res.redirect('/campgrounds');
		} else {
			res.redirect('/campgrounds');
		}
	});
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

function checkCampgroundOwnership(req, res, next) {
	// is user logged in?
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, function(err, foundCampground) {
			if (err) {
				res.redirect('back');
			} else {
				// does the user own the campground?
				if (foundCampground.author.id.equals(req.user._id)) {
					// we use the 'equals' method and not '===' because one is a string and the other one is an object.
					next();
				} else {
					res.redirect('back');
				}
			}
		});
	} else {
		res.redirect('back');
	}
}

// authentication is to check that you are who you say you are. authorisation is to give you permission to do what kind of things, after we have aunthenticated you. for example, logged in users can add reviews, but cannot edit submissions of camps, only authors can do that.

module.exports = router;
