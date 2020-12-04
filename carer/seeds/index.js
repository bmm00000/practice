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
		const price = Math.floor(Math.random() * 20 + 10);
		const c = new Carer({
			author: '5fbd6796f73d818aa727f7ea',
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(professions)}`,
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex esse expedita qui provident nobis eveniet commodi iure repudiandae, accusantium veritatis, fuga reprehenderit in tempora enim amet recusandae blanditiis illum tempore!',
			price,
			images: [
				{
					url:
						'https://res.cloudinary.com/dmgkrtebm/image/upload/v1606419899/Carer/ixchyhnomkfv2vpnbcb7.png',
					filename: 'Carer/ixchyhnomkfv2vpnbcb7',
				},
				{
					url:
						'https://res.cloudinary.com/dmgkrtebm/image/upload/v1606419919/Carer/yvyd5jmjotucwavttrfw.png',
					filename: 'Carer/yvyd5jmjotucwavttrfw',
				},
			],
		});
		await c.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
