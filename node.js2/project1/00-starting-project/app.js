const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
	res.render('index');
});

app.get('/about', (req, res, next) => {
	res.render('about');
});

app.get('/restaurants', (req, res, next) => {
	const filePath = path.join(__dirname, 'data', 'restaurants.json');
	const fileData = fs.readFileSync(filePath);
	const storedRestaurants = JSON.parse(fileData);
	res.render('restaurants', {
		numberOfRestaurants: storedRestaurants.length,
		restaurants: storedRestaurants,
	});
});

app.get('/restaurants/:id', (req, res, next) => {
	const restaurantId = req.params.id;
	const filePath = path.join(__dirname, 'data', 'restaurants.json');
	const fileData = fs.readFileSync(filePath);
	const storedRestaurants = JSON.parse(fileData);
	const foundRestaurant = storedRestaurants.find(
		(restaurant) => restaurant.id === restaurantId
	);
	res.render('restaurant-details', { restaurant: foundRestaurant });
});

app.get('/confirm', (req, res, next) => {
	res.render('confirm');
});

app.get('/recommend', (req, res, next) => {
	res.render('recommend');
});

app.post('/recommend', (req, res, next) => {
	const restaurant = req.body;
	const filePath = path.join(__dirname, 'data', 'restaurants.json');
	const fileData = fs.readFileSync(filePath);
	const storedRestaurants = JSON.parse(fileData);
	storedRestaurants.push(restaurant);
	fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
	res.redirect('/confirm');
});

app.listen(3000, () => {
	console.log('Listening at port 3000...');
});
