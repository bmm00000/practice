// as I go through the course, check that all things are updated!!!!

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Home page'));

app.get('/dogs', (req, res) => res.send('Dogs page'));

app.get('/dogs/:param', (req, res) => {
	res.send('Dog breed: ' + req.params.param);
});
app.get('/dogs/:subredditName/comments/:id/:title/', (req, res) => res.send('Comments page...'));

app.get('/static', (req, res) => res.render('static-page.html'));

app.get('/dynamic/:something', (req, res) => {
	let thing = req.params.something;
	res.render('dynamic-page.ejs', { firstItem: thing });
});
//dynamic-page.ejs is stored in the 'views' folder (it's dynamic because we are also using js, not only html; you need to download ejs from npm)

app.get('*', (req, res) => res.send('url contains anything'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
