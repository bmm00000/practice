const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

//this will go to the database:
const campgrounds = [
	{
		name: 'Salmon Creek',
		image: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350'
	},
	{
		name: 'Granite Hill',
		image:
			'https://images.pexels.com/photos/6757/feet-morning-adventure-camping.jpg?auto=compress&cs=tinysrgb&h=350'
	},
	{
		name: 'La Mateta',
		image: 'https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg?auto=compress&cs=tinysrgb&h=350'
	}
];

app.get('/', (req, res) => {
	res.render('landing');
});

app.get('/campgrounds', (req, res) => {
	res.render('campgrounds', { campgrounds });
});

app.post('/campgrounds', (req, res) => {
	let name = req.body.name;
	let image = req.body.image;
	let newCampground = { name: name, image: image };
	campgrounds.push(newCampground);
	res.redirect('/campgrounds'); //we have two 'campgrounds' routes, but the default is to redirect to the GET route
});

app.get('/campgrounds/new', (req, res) => {
	res.render('new');
});

app.listen(port, () => {
	console.log(`Server listening: http://localhost:${port}`);
});
