const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { urlencoded } = require('body-parser');

mongoose.connect('mongodb://localhost/yelp_camp', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

const Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
// 	{
// 		name: 'Granite Hill',
// 		image: 'https://www.photosforclass.com/download/px_699558',
// 		description: 'This is a huge beautiful camp.'
// 	},
// 	function(err, campground) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log('New campground created');
// 			console.log(campground);
// 		}
// 	}
// );

// db.collection.drop()
// this is a mongo command, you have to type 'mongo' to get into the mongo console.
// when you want to eliminate all previous data from one collection, as we did before adding 'description' to our schema

app.get('/', (req, res) => {
	res.render('landing');
});

app.get('/campgrounds', (req, res) => {
	Campground.find({}, function(err, campgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render('index', { campgrounds });
		}
	});
});

app.post('/campgrounds', (req, res) => {
	let name = req.body.name;
	let image = req.body.image;
	let descr = req.body.description;
	let newCampground = { name: name, image: image, description: descr };
	Campground.create(newCampground, function(err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/campgrounds');
			//we have two 'campgrounds' routes, but the default is to redirect to the GET route
		}
	});
});

app.get('/campgrounds/new', (req, res) => {
	res.render('new');
});

//watch out! the show route has to be after the new route, otherwise the new route will be triggered when you type an id in the url:
app.get('/campgrounds/:id', (req, res) => {
	Campground.findById(req.params.id, function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			res.render('show', { campground: foundCampground });
		}
	});
});

app.listen(port, () => {
	console.log(`Server listening: http://localhost:${port}`);
});

// RESTFUL ROUTES (convention to map http routes to CRUD functionality)

// name			url 			http verb 			description
// ===============================================================================
// INDEX 			/dogs			GET				Display a list of all dogs.
// NEW 			/dogs/new 			GET 			Displays form to make a new dog
// CREATE			/dogs			POST 			Add new dog to db
// SHOW			/dogs/:id			GET				Shows info about one dog.
// EDIT			/dogs/:id/edit		GET				Show edit form for one dog.
// UPDATE		/dogs/:id			PUT				Update a dog, then redirect somewhere.
// DESTROY		/dogs/:id			DELETE			Delete a dog, then redirect somewhere.
