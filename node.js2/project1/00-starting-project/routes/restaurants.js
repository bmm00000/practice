const express = require('express');
const uuid = require('uuid');

const {
	getStoredRestaurants,
	storeRestaurants,
} = require('../util/restaurants-data');

const router = express.Router();

router.get('/restaurants', (req, res, next) => {
	let order = req.query.order;
	let nextOrder = 'des';

	if (order !== 'asc' && order !== 'des') {
		order = 'asc';
	}

	if (order === 'des') {
		nextOrder = 'asc';
	}

	const storedRestaurants = getStoredRestaurants();

	storedRestaurants.sort((resA, resB) => {
		if (
			(order === 'asc' && resA.name > resB.name) ||
			(order === 'des' && resA.name < resB.name)
		) {
			return 1;
		}
		return -1;
	});

	res.render('restaurants', {
		numberOfRestaurants: storedRestaurants.length,
		restaurants: storedRestaurants,
		nextOrder,
	});
});

router.get('/restaurants/:id', (req, res, next) => {
	const restaurantId = req.params.id;
	const storedRestaurants = getStoredRestaurants();
	const foundRestaurant = storedRestaurants.find(
		(restaurant) => restaurant.id === restaurantId
	);
	if (!foundRestaurant) {
		return res.status(404).render('404');
	}
	res.render('restaurant-details', { restaurant: foundRestaurant });
});

router.get('/confirm', (req, res, next) => {
	res.render('confirm');
});

router.get('/recommend', (req, res, next) => {
	res.render('recommend');
});

router.post('/recommend', (req, res, next) => {
	const restaurant = req.body;
	restaurant.id = uuid.v4();
	const storedRestaurants = getStoredRestaurants();
	storedRestaurants.push(restaurant);
	storeRestaurants(storedRestaurants);
	res.redirect('/confirm');
});

module.exports = router;
