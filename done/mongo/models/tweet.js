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

const userSchema = new mongoose.Schema({
	first: String,
	last: String,
});

const tweetSchema = new mongoose.Schema({
	text: String,
	likes: Number,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

const makeTweet = async () => {
	const user = new User({ first: 'Jose', last: 'Boix' });
	const tweet1 = new Tweet({ text: 'hello helloooo', likes: 0 });
	tweet1.user = user;
	await user.save();
	await tweet1.save();
	console.log(tweet1);
};

// makeTweet();

const getTweet = async () => {
	const t = await Tweet.findOne({}).populate('user', 'first');
	console.log(t);
};

getTweet();
