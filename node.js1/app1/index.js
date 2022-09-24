const path = require('path');

const express = require('express');
const { urlencoded } = require('body-parser');
const methodOverride = require('method-override');

// const dataJSON = require('./data.json');

const app = express();

// app.use((req, res, next) => {
// 	console.log('we have received a request!');
// 	res.send('<h1>haha</h1>');
// });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(methodOverride('_method'));

let comments = [
	{ id: '1', user: 'Helen', text: 'Hello, Im Helen' },
	{ id: '2', user: 'Juan', text: 'Hello, Im Juan' },
	{ id: '3', user: 'Elena', text: 'Hello, Im Elena' },
];

app.get('/comments', (req, res, next) => {
	res.render('comments/index', { comments });
});

app.get('/comments/new', (req, res, next) => {
	res.render('comments/new');
});

app.post('/comments', (req, res, next) => {
	const { user, text } = req.body;
	const id = Math.random().toString();
	comments.push({ user, text, id });
	res.redirect('/comments');
});

app.get('/comments/:id', (req, res, next) => {
	const id = req.params.id;
	const comment = comments.find((c) => c.id === id);
	res.render('comments/show', { comment });
});

app.get('/comments/:id/edit', (req, res, next) => {
	const id = req.params.id;
	const comment = comments.find((c) => c.id === id);
	res.render('comments/edit', { comment });
});

app.patch('/comments/:id', (req, res, next) => {
	const id = req.params.id;
	const newText = req.body.text;
	const existingComment = comments.find((c) => c.id === id);
	existingComment.text = newText;
	res.redirect('/comments');
});

app.delete('/comments/:id', (req, res, next) => {
	const id = req.params.id;
	comments = comments.filter((c) => c.id !== id);
	res.redirect('/comments');
});

app.listen(3000, () => {
	console.log('Listening on port 3000');
});

//
//
//
//
// OLD ROUTES:

// app.get('/', (req, res, next) => {
// 	res.render('home');
// });

// app.get('/cats', (req, res, next) => {
// 	const cats = ['cat1', 'cat2', 'cat3'];
// 	res.render('cats', { cats });
// });

// app.get('/r/:subreddit', (req, res, next) => {
// 	const { subreddit } = req.params;
// 	const data = dataJSON[subreddit];
// 	if (data) {
// 		res.render('subreddit', { ...data });
// 	} else {
// 		res.render('notfound', { subreddit });
// 	}
// });

// app.get('/random', (req, res, next) => {
// 	const num = Math.floor(Math.random() * 100);
// 	res.render('random', { rand: num });
// });

// app.get('/cat', (req, res, next) => {
// 	res.send('miauuu');
// });

// app.post('/cat', (req, res, next) => {
// 	res.send('this is the response of a post req for cats');
// });

// app.get('/dog', (req, res, next) => {
// 	res.send('guauuu');
// });

// app.get('/search', (req, res, next) => {
// 	const { q, color } = req.query;
// 	if (!q) {
// 		res.send('nothing found if nothing searched');
// 	}
// 	res.send(`search results for ${q} that are ${color}:`);
// });

// app.get('*', (req, res, next) => {
// 	res.send('this is for anything else');
// });
