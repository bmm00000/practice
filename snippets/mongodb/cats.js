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

// before the following, you have to have the db running, so you can connect to it:
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cat_app', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
//if there is not a db named 'cat_app', it will create it for you (otherwise it will find it and connect to it)

const catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

const Cat = mongoose.model('Cat', catSchema);
// we do this, because '.model' returns an object with a bunch of methods, such as create, find, etc. (Schema is only the pattern of the data).
// 'Cat' (parameter of .model) is the singular of the name of the collection that will be assigned authomatically: 'cats'

// const george = new Cat({
// 	name: 'Harris',
// 	age: 12,
// 	temperament: 'Evil'
// });

// george.save().then((cat) => console.log(cat));

// or:

// george.save(function(err, cat) {
// 	if (err) {
// 		console.log('Something went wrong!');
// 	} else {
// 		console.log('We just saved a cat to the db:');
// 		console.log(cat);
// 	}
// });

// the same pattern with find(function(){...}), remove(function(){...}), create(function(){...}), etc. becuase save, find, remove, etc take time, hence we need call back or promise.

//everytime you run the code above with node ('node cats.js'), you will get a new cat

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

// in the empty object you pass to the 'find' method ('{}'), you can specify the properties of the cats that you are looking for.
