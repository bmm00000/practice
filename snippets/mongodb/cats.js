// mongo shell is used to test, learn, etc (like the javascript console), but we won't be using it to add things, update things, etc. since we will do that through a file written in js and use mongoose instead.

// mongo shell commands (CRUD are the most important ones):

// mongod (or:
// brew services start mongodb-community@4.2
// brew services stop mongodb-community@4.2
//)
// mongo (to open the shell)
// help
// show dbs (dbs will only appear if they have collections)
// use (we make a db for every app that we create)
// insert
// show collections
// find
// update
// remove
// https://gist.github.com/bradtraversy/f407d642bdc3b31681bc7e56d95485b6

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cat_app', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

const Cat = mongoose.model('Cat', catSchema); // 'Cat' is the singular of the name of the collection that will be assigned authomatically: 'cats'
//we do this, because '.model' returns an object with a bunch of methods, such as create, find, etc.

// const george = new Cat({
// 	name: 'Harris',
// 	age: 12,
// 	temperament: 'Evil'
// });

// george.save().then((cat) => console.log(cat));

//everytime you run the code above with node, you will get a new cat

//'george' is what we have in js that we are trying to save to the database. 'cat' is what's coming from the database.

//ANOTHER WAY OF DOING WHAT WE DID BEFORE (create and save all at once):

// Cat.create(
// 	{
// 		name: 'Snowwhite',
// 		age: 22,
// 		temperament: 'Nice'
// 	},
// 	function(err, cat) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log(cat);
// 		}
// 	}
// );

Cat.find({}, function(err, cats) {
	if (err) {
		console.log('Error!');
		console.log(err);
	} else {
		console.log('All the cats:');
		console.log(cats);
	}
});
