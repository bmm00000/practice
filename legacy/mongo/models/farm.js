const mongoose = require('mongoose');
const { Schema } = mongoose;

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

const productSchema = new Schema({
	name: String,
	price: Number,
	season: {
		type: String,
		enum: ['Spring', 'Winter', 'Fall', 'Summer'],
	},
});

const farmSchema = new Schema({
	name: String,
	city: String,
	products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// const makeFarm = async () => {
// 	const farm = new Farm({ name: 'Tirilla', city: 'SF' });
// 	const grapes = await Product.findOne({ name: 'Grapes' });
// 	farm.products.push(grapes);
// 	await farm.save();
// 	console.log(farm);
// };

// makeFarm();

const addProduct = async () => {
	const farm = await Farm.findOne({ name: 'Tirilla' });
	const watermelon = await Product.findOne({ name: 'Watermelon' });
	farm.products.push(watermelon);
	await farm.save();
	console.log(farm);
};

// addProduct();

Farm.findOne({ name: 'Tirilla' })
	.populate('products')
	.then((farm) => console.log(farm));
