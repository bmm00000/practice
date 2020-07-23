const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('search');
});

app.get('/results', (req, res) => {
	let keyword = req.query.search;
	let url = `http://www.omdbapi.com/?apikey=thewdb&s=${keyword}`;
	axios
		.get(url)
		.then((response) => {
			res.render('results', { response });
		})
		.catch((err) => {
			console.log(err);
		});
});

app.listen(3000, () => {
	console.log(`Server listening in http://localhost:${port}`);
});
