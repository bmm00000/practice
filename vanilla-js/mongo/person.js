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

const personSchema = new mongoose.Schema({
	first: String,
	last: String,
});

personSchema.virtual('fullName').get(function () {
	return `${this.first} ${this.last}`;
});

personSchema.pre('save', async function () {
	console.log('About to save');
});

personSchema.post('save', async function () {
	console.log('Just saaved!');
});

const Person = mongoose.model('Person', personSchema);
