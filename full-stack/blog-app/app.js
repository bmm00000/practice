const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const expressSanitizer = require('express-sanitizer');
// express-sanitizer is to disable users to include js in their input

//APP CONFIG
mongoose.connect('mongodb://localhost/blog_app', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
// express-sanitizer should be after body-parser.
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));
mongoose.set('useFindAndModify', false);
// we use this one becuase otherwise the 'Blog.findbyIdAndUpdate' method will appear as deprecated

//MONGOOSE/MODEL CONFIG
const blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);

// Blog.create({
// 	title: 'First post',
// 	image: 'https://cdn.pixabay.com/photo/2018/06/17/20/35/chain-3481377__480.jpg',
// 	body: 'This is the first post. We are testing...'
// });

//RESTFUL ROUTES
app.get('/', (req, res) => {
	res.redirect('/blogs');
});

//index route
app.get('/blogs', (req, res) => {
	Blog.find({}, function(err, blogs) {
		if (err) {
			console.log('Error');
		} else {
			res.render('index', { blogs: blogs });
		}
	});
});

//new route
app.get('/blogs/new', (req, res) => {
	res.render('new');
});

//create route
app.post('/blogs', (req, res) => {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	//req.body is for body-parser, and blog.body is for what the user writes
	Blog.create(req.body.blog, function(err, newBlog) {
		if (err) {
			res.render('new');
		} else {
			res.redirect('/blogs');
		}
	});
});

//show route
app.get('/blogs/:id', (req, res) => {
	Blog.findById(req.params.id, function(err, foundBlog) {
		if (err) {
			res.redirect('/blogs');
		} else {
			res.render('show', { blog: foundBlog });
		}
	});
});

//edit route
app.get('/blogs/:id/edit', (req, res) => {
	Blog.findById(req.params.id, function(err, foundBlog) {
		if (err) {
			res.redirect('/blogs');
		} else {
			res.render('edit', { blog: foundBlog });
		}
	});
});

//update route
app.put('/blogs/:id', (req, res) => {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
		if (err) {
			res.redirect('/blogs');
		} else {
			res.redirect('/blogs/' + req.params.id);
		}
	});
});

//delete route
app.delete('/blogs/:id', (req, res) => {
	Blog.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			res.redirect('/blogs');
		} else {
			res.redirect('/blogs');
		}
	});
});

app.listen(port, () => {
	console.log(`Server listening: http://localhost:${port}`);
});
