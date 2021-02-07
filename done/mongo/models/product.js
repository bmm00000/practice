const mongoose = require('mongoose');

mongoose
	.connect('mongodb://localhost:27017/relationshipDemo', {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Mongo connection open...');
	})
	.catch((err) => {
		console.log('Mongo connection error');
		console.log(err);
	});

const productSchema = new mongoose.Schema({
	name: String,
	price: Number,
	season: {
		type: String,
		enum: ['Spring', 'Winter', 'Fall', 'Summer'],
	},
});

const Product = mongoose.model('Product', productSchema);

// Product.insertMany([
// 	{ name: 'Watermelon', price: 44, season: 'Winter' },
// 	{ name: 'Melon', price: 54, season: 'Summer' },
// 	{ name: 'Grapes', price: 64, season: 'Fall' },
// ]);
