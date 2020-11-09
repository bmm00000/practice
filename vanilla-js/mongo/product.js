const mongoose = require('mongoose');
mongoose
	.connect('mongodb://localhost:27017/products1', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Connected to MongoDB...');
	})
	.catch((err) => {
		console.log('There is an error!');
		console.log(err);
	});

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		maxlength: 20,
	},
	price: {
		type: Number,
		required: true,
		min: 0,
	},
	onSale: {
		type: Boolean,
		default: false,
	},
	categories: [String],
	quantity: {
		online: {
			type: Number,
			default: 0,
		},
		instore: {
			type: Number,
			default: 0,
		},
	},
	size: {
		type: String,
		enum: ['L', 'X', 'XXS'],
	},
});

const Product = mongoose.model('Product', productSchema);

const bike = new Product({
	name: 'asmallbike',
	price: 44,
	categories: ['cycling', 'mountain'],
	size: 'L',
});
bike
	.save()
	.then((data) => {
		console.log(data);
	})
	.catch((err) => {
		console.log('Error here!');
		console.log(err);
	});

// Product.findOneAndUpdate(
// 	{ name: 'Trek-bike' },
// 	{ price: 44 },
// 	{ new: true, runValidators: true }
// )
// 	.then((data) => {
// 		console.log(data);
// 	})
// 	.catch((err) => {
// 		console.log('Error here!');
// 		console.log(err);
// 	});
