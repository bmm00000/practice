const mongoose = require('mongoose');

const { descriptors, professions } = require('./seedHelpers');
const cities = require('./cities');
const Carer = require('../models/carer');

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

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Carer.deleteMany({});
	for (let i = 0; i < 50; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const c = new Carer({
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(professions)}`,
		});
		await c.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
