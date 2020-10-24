const express = require('express');
const carts = require('../repositories/carts');
const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products');

const router = express.Router();

// Receive a post request to add an item to the cart
router.post('/cart/products', async (req, res) => {
	// figure out the cart!
	let cart; // we do this to be able to access the cart outside of the 'if' block
	if (!req.session.cartId) {
		// we don't have a cart, we need to create one, and store the cart id on the req.session.cartId property
		cart = await cartsRepo.create({ items: [] });
		req.session.cartId = cart.id;
	} else {
		// we have a cart! let's get it from the repository
		cart = await cartsRepo.getOne(req.session.cartId);
	}

	// Either increment quantity to existing product or add new product to items array
	const existingItem = cart.items.find(
		(item) => item.id === req.body.productId
	);
	if (existingItem) {
		// increment quantity and save cart
		existingItem.quantity++;
	} else {
		// add new product id to items array
		cart.items.push({ id: req.body.productId, quantity: 1 });
	}

	res.send('Product added');
});

// Receive a get request to show all items in the cart

// Receive a post request to delete an item from the cart

module.exports = router;
