const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const AppError = require('./AppError');

const app = express();

const Product = require('./models/product');

mongoose
	.connect('mongodb://localhost:27017/farmStandErr', {
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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const categories = ['fruit', 'vegetable', 'dairy', 'fingi'];

app.get('/products', async (req, res) => {
	const { category } = req.query;
	if (category) {
		const products = await Product.find({ category });
		res.render('products/index', { products, category });
	} else {
		const products = await Product.find({});
		res.render('products/index', { products, category: 'All' });
	}
});

app.get('/products/new', (req, res) => {
	throw new AppError('not allowweddd', 404);
	res.render('products/new', { categories });
});

app.post('/products', async (req, res) => {
	const newProduct = new Product(req.body);
	await newProduct.save();
	res.redirect(`/products/${newProduct._id}`);
});

app.get('/products/:id', async (req, res, next) => {
	const { id } = req.params;
	const product = await Product.findById(id);
	if (!product) {
		next(new AppError('Error here', 401));
	}
	res.render('products/show', { product });
});

app.get('/products/:id/edit', async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id);
	res.render('products/edit', { product, categories });
});

app.put('/products/:id', async (req, res) => {
	const { id } = req.params;
	const product = await Product.findByIdAndUpdate(id, req.body, {
		runValidators: true,
		new: true,
	});
	res.redirect(`/products/${product._id}`);
});

app.delete('/products/:id', async (req, res) => {
	const { id } = req.params;
	const deletedProduct = await Product.findByIdAndDelete(id);
	res.redirect('/products');
});

app.use((err, req, res, next) => {
	const { status = 401, message = 'something is wrong here' } = err;
	res.status(status).send(message);
});

app.listen(3000, () => {
	console.log('Listening...');
});
