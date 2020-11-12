const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
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

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/carers', async (req, res) => {
	const carers = await Carer.find({});
	res.render('carers/index', { carers });
});

app.get('/carers/new', (req, res) => {
	res.render('carers/new');
});

app.post('/carers', async (req, res) => {
	const carer = new Carer(req.body.carer);
	await carer.save();
	res.redirect(`/carers/${carer._id}`);
});

app.get('/carers/:id', async (req, res) => {
	const carer = await Carer.findById(req.params.id);
	res.render('carers/show', { carer });
});

app.get('/carers/:id/edit', async (req, res) => {
	const carer = await Carer.findById(req.params.id);
	res.render('carers/edit', { carer });
});

app.put('/carers/:id', async (req, res) => {
	const { id } = req.params;
	const carer = await Carer.findByIdAndUpdate(id, { ...req.body.carer });
	res.redirect(`/carers/${carer._id}`);
});

app.delete('/carers/:id', async (req, res) => {
	const { id } = req.params;
	await Carer.findByIdAndDelete(id);
	res.redirect('/carers');
});

app.listen(3000, () => {
	console.log('Server listening at port 3000...');
});
