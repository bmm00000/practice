const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//APP CONFIG
mongoose.connect('mongodb://localhost/blog_app', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

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

app.listen(port, () => {
	console.log(`Server listening: http://localhost:${port}`);
});
