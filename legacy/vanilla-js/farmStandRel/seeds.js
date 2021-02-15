const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose
	.connect('mongodb://localhost:27017/farmStandRel', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Database connected...');
	})
	.catch((err) => {
		console.log('Error with the database');
		console.log(err);
	});

// const p = new Product({ name: 'watermelon', price: 0 });
// p.save()
// 	.then((p) => {
// 		console.log(p);
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});

const seedProducts = [
	{ name: 'grapes', price: 5, category: 'fruit' },
	{ name: 'bananas', price: 6, category: 'fruit' },
	{ name: 'apples', price: 3, category: 'fruit' },
	{ name: 'milk', price: 99, category: 'dairy' },
	{ name: 'cucumber', price: 2, category: 'vegetable' },
];

Product.insertMany(seedProducts)
	.then((res) => {
		console.log(res);
	})
	.catch((err) => {
		console.log(err);
	});
