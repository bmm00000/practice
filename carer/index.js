const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const { carerSchema } = require('./schemas');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');

const Carer = require('./models/carer');

mongoose.connect('mongodb://localhost:27017/carer', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const validateCarer = (req, res, next) => {
	const { error } = carerSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

app.get('/', (req, res) => {
	res.render('home');
});

app.get(
	'/carers',
	catchAsync(async (req, res) => {
		const carers = await Carer.find({});
		res.render('carers/index', { carers });
	})
);

app.get('/carers/new', (req, res) => {
	res.render('carers/new');
});

app.post(
	'/carers',
	validateCarer,
	catchAsync(async (req, res, next) => {
		// if (!req.body.carer) throw new ExpressError('Invalid carer data...', 400);

		const carer = new Carer(req.body.carer);
		await carer.save();
		res.redirect(`/carers/${carer._id}`);
	})
);

app.get(
	'/carers/:id',
	catchAsync(async (req, res) => {
		const carer = await Carer.findById(req.params.id);
		res.render('carers/show', { carer });
	})
);

app.get(
	'/carers/:id/edit',
	catchAsync(async (req, res) => {
		const carer = await Carer.findById(req.params.id);
		res.render('carers/edit', { carer });
	})
);

app.put(
	'/carers/:id',
	validateCarer,
	catchAsync(async (req, res) => {
		const { id } = req.params;
		const carer = await Carer.findByIdAndUpdate(id, { ...req.body.carer });
		res.redirect(`/carers/${carer._id}`);
	})
);

app.delete(
	'/carers/:id',
	catchAsync(async (req, res) => {
		const { id } = req.params;
		await Carer.findByIdAndDelete(id);
		res.redirect('/carers');
	})
);

app.all('*', (req, res, next) => {
	next(new ExpressError('Page not found...', 404));
});

app.use((err, req, res, next) => {
	const { statusCode = 500 } = err;
	if (!err.message) err.message = 'Something went wrong...';
	res.status(statusCode).render('error', { err });
});

app.listen(3000, () => {
	console.log('Server listening at port 3000...');
});
