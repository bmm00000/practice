const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Our fake database:
let comments = [
	{
		username: 'Todd',
		comment: 'lol that is so funny!',
		id: uuid(),
	},
	{
		username: 'Skyler',
		comment: 'I like to go birdwatching with my dog',
		id: uuid(),
	},
	{
		username: 'Sk8erBoi',
		comment: 'Plz delete your account, Todd',
		id: uuid(),
	},
	{
		username: 'onlysayswoof',
		comment: 'woof woof woof',
		id: uuid(),
	},
];

// index route
app.get('/comments', (req, res) => {
	res.render('comments/index', { comments });
});

// new route
app.get('/comments/new', (req, res) => {
	res.render('comments/new');
});

// create route
app.post('/comments', (req, res) => {
	const { username, comment } = req.body;
	comments.push({ username, comment, id: uuid() });
	res.redirect('/comments');
});

// show route
app.get('/comments/:id', (req, res) => {
	const { id } = req.params;
	const comment = comments.find((c) => c.id === id);
	res.render('comments/show', { comment });
});

// edit route
app.get('/comments/:id/edit', (req, res) => {
	const { id } = req.params;
	const comment = comments.find((c) => c.id === id);
	res.render('comments/edit', { comment });
});

// update route
app.patch('/comments/:id', (req, res) => {
	const { id } = req.params;
	const newCommentText = req.body.comment;
	const foundComment = comments.find((c) => c.id === id);
	foundComment.comment = newCommentText;
	res.redirect('/comments');
});

// delete route
app.delete('/comments/:id', (req, res) => {
	const { id } = req.params;
	comments = comments.filter((c) => c.id !== id);
	res.redirect('/comments');
});

app.listen(3000, () => {
	console.log('Listening...');
});
