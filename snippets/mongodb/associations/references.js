const mongoose = require('mongoose');
const { getMaxListeners } = require('process');
mongoose.connect('mongodb://localhost/blog_demo_2', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const Post = require('./models/post');
const User = require('./models/user');

Post.create(
	{
		title: 'Part 4 of: How to cook a burger',
		content: 'bhello hehh heh'
	},
	function(err, post) {
		User.findOne({ email: 'bob@gmail.com' }, function(err, foundUser) {
			if (err) {
				console.log(err);
			} else {
				foundUser.posts.push(post);
				foundUser.save(function(err, data) {
					if (err) {
						console.log(err);
					} else {
						console.log(data);
					}
				});
			}
		});
	}
);

// User.create({
// 	email: 'bob@gmail.com',
// 	name: 'Bob Belcher'
// });

// if there is only one post, it will appear the whole post in 'data', but if there is more than one, then it will appear only the reference of the posts in 'data'

// How to find the whole posts, and not only reference numbers:

// User.findOne({ email: 'bob@gmail.com' }).populate('posts').exec(function(err, user) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// });
