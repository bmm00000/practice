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

// productSchema.methods.greet = function () {
// 	console.log(`Greetings from ${this.name}`);
// };

productSchema.methods.toggleOnSale = function () {
	this.onSale = !this.onSale;
	return this.save();
};

productSchema.methods.addCategory = function (newCat) {
	this.categories.push(newCat);
	return this.save();
};

productSchema.statics.fireSale = function () {
	return this.updateMany({}, { onSale: true, price: 0 });
};

const Product = mongoose.model('Product', productSchema);

const findProduct = async () => {
	const foundProduct = await Product.findOne({ name: 'anotherasmallbike' });
	console.log(foundProduct);
	await foundProduct.toggleOnSale();
	await foundProduct.addCategory('outdoors');
	console.log(foundProduct);
};

Product.fireSale().then((res) => console.log(res));

// findProduct();

// const bike = new Product({
// 	name: 'anotherasmallbike',
// 	price: 44,
// 	categories: ['cycling', 'mountain'],
// 	size: 'L',
// });

// bike
// 	.save()
// 	.then((data) => {
// 		console.log(data);
// 	})
// 	.catch((err) => {
// 		console.log('Error here!');
// 		console.log(err);
// 	});

// bike.greet();

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
