// as I go through the course, check that all things are updated!!!!

const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
//express checks the 'view' directory authomatically, but not the 'public' directory
app.set('view engine', 'ejs');
//authomatically renders files as ejs, so you don't need to add the extension '.ejs' to the files

app.get('/', (req, res) => res.send('Home page'));

app.get('/dogs', (req, res) => res.send('Dogs page'));

app.get('/dogs/:param', (req, res) => {
	res.send('Dog breed: ' + req.params.param);
});
app.get('/dogs/:subredditName/comments/:id/:title/', (req, res) => res.send('Comments page...'));

app.get('/static', (req, res) => res.render('static-page.html'));

app.get('/dynamic/:something', (req, res) => {
	let thing = req.params.something;
	res.render('dynamic-page', { firstItem: thing });
});
//dynamic-page.ejs is stored in the 'views' folder (it's dynamic because we are also using js, not only html; you need to download ejs from npm)

app.get('/posts', (req, res) => {
	let posts = [
		{ title: 'The problem with time', author: 'Colt' },
		{ title: 'The great stagnation', author: 'Helen' },
		{ title: 'Absolute beauty', author: 'Dua' }
	];
	res.render('posts', { posts: posts });
});

app.get('*', (req, res) => res.send('url contains anything'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
