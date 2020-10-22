const express = require('express');
const cartRepo = require('../repositories/carts');
const products = require('../repositories/products');

const router = express.Router();

// Receive a post request to add an item to the cart
router.post('/cart/products', async (req, res) => {
	// figure out the cart!
	let cart; // we do this to be able to access the cart outside of the 'if' block
	if (!req.session.cartId) {
		// we don't have a cart, we need to create one, and store the cart id on the req.session.cartId property
		cart = await cartRepo.create({ items: [] });
		req.session.cartId = cart.id;
	} else {
		// we have a cart! let's get it from the repository
		cart = await cartRepo.getOne(req.session.cartId);
	}

	// Either increment quantity to existing product or add new product to items array
	const existingItem = cart.items.find(
		(item) => item.id === req.body.productId
	);
	if (existingItem) {
		// increment quantity and save cart
	} else {
		// add new product id to items array
	}

	res.send('Product added');
});

// Receive a get request to show all items in the cart

// Receive a post request to delete an item from the cart

module.exports = router;
