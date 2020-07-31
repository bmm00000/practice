const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// POST - title, content
const postSchema = new mongoose.Schema({
	title: String,
	content: String
});
const Post = mongoose.model('Post', postSchema);

// USER - email, name
const userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [ postSchema ]
	// you need to define the 'postSchema' before you assign it here
});
const User = mongoose.model('User', userSchema);

// const newUser = new User({
// 	email: 'hermaine@edu.com',
// 	name: 'Hermaine Orange'
// });
// newUser.posts.push({
// 	title: 'How to start a business',
// 	content: 'Just kidding, this is not a long post...'
// });
// newUser.save(function(err, user) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// });

// const newPost = new Post({
// 	title: 'Reflections on Apples',
// 	content: 'They are delicious'
// });
// newPost.save(function(err, post) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(post);
// 	}
// });

User.findOne({ name: 'Hermaine Orange' }, function(err, user) {
	if (err) {
		// console.log(err);
	} else {
		user.posts.push({
			title: 'Another short post',
			content: 'I dont know what to say...'
		});
		user.save(function(err, user) {
			if (err) {
				console.log(err);
			} else {
				console.log(user);
			}
		});
	}
});
