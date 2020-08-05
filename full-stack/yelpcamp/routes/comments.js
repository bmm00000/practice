const express = require('express');
const router = express.Router({ mergeParams: true });
// we add 'mergeParams: true' to be able to access req.params.id.
const Campground = require('../models/campground');
const Comment = require('../models/comment');

// ===========================================
// COMMENTS ROUTES
// ===========================================

//comments 'new'
router.get('/new', isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
		} else {
			res.render('comments/new', { campground: campground });
		}
	});
});

//comments 'create'
router.post('/', isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
			res.redirect('/campgrounds');
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if (err) {
					console.log(err);
				} else {
					// add username and id to comment
					comment.author.id = req.user._i;
					comment.author.username = req.user.username;
					// save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});
// we add 'isLoggedIn' as middleware here, because we want to avoid someone accessing the comments without being logged in (using postman, for example)

// comments edit route
router.get('/:comment_id/edit', (req, res) => {
	Comment.findById(req.params.comment_id, function(err, foundComment) {
		if (err) {
			res.redirect('back');
		} else {
			res.render('comments/edit', { campground_id: req.params.id, comment: foundComment });
		}
	});
});

// comments update route
router.put('/:comment_id', (req, res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
		if (err) {
			res.redirect('back');
		} else {
			res.redirect('/campgrounds/' + req.params.id);
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
