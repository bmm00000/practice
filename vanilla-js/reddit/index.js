const express = require('express');
const path = require('path');

const data = require('./data.json');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/r/:subreddit', (req, res) => {
	const { subreddit } = req.params;
	const subData = data[subreddit];
	if (subData) {
		res.render('subreddit', { ...subData });
	} else {
		res.render('notfound', { subreddit });
	}
});

app.get('/random', (req, res) => {
	const num = Math.floor(Math.random() * 10 + 1);
	res.render('random', { num });
});

app.get('/cats', (req, res) => {
	const cats = ['persian', 'siamese', 'streetcat', 'citycat'];
	res.render('cats', { cats });
});

app.listen(3000, () => {
	console.log('Listening...');
});
