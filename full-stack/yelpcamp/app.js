const express = require('express'),
	app = express(),
	port = 3000,
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	Campground = require('./models/campground'),
	Comment = require('./models/comment'),
	User = require('./models/user'),
	seedDB = require('./seeds');

// requiring routes
const commentRoutes = require('./routes/comments'),
	campgroundRoutes = require('./routes/campgrounds'),
	indexRoutes = require('./routes/index');

mongoose.connect('mongodb://localhost/yelp_camp', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
// seedDB(); // seed the database.

// PASSPORT CONFIGURATION
app.use(
	require('express-session')({
		secret: 'Once again Rusty win cutest dog!',
		resave: false,
		saveUninitialized: false
	})
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// 'User.authenticate/serializeUser/deserializeUser' methods come from 'passportLocalMongoose'

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});
// we use this middleware to define 'currentUser' in all our routes. Everytime we use middleware, we need 'next()', otherwise it will stop.

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

app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
// it means that all routes will start with, for example, '/campgrounds', so you delete '/campgrounds' in the routes of 'campgrounds.js'

app.listen(port, () => {
	console.log(`Server listening: http://localhost:${port}`);
});

// db.collection.drop()
// this is a mongo command, you have to type 'mongo' to get into the mongo console.
// when you want to eliminate all previous data from one collection, as we did before adding 'description' to our schema

// RESTFUL ROUTES (convention to map http routes to CRUD functionality)

// name			url 			http verb 			description									mongoose method
// =====================================================================================================================
// INDEX 			/dogs			GET				Display a list of all dogs.					Dog.find()
// NEW 			/dogs/new 			GET 			Displays form to make a new dog				N/A
// CREATE			/dogs			POST 			Add new dog to db							Dog.create()
// SHOW			/dogs/:id			GET				Shows info about one dog.					Dog.findById()
// EDIT			/dogs/:id/edit		GET				Show edit form for one dog.					Dog.findById()
// UPDATE		/dogs/:id			PUT				Update a dog, then redirect somewhere.		Dog.findByIdAndUpdate()
// DESTROY		/dogs/:id			DELETE			Delete a dog, then redirect somewhere.		Dog.findByIdAndRemove()

// NESTED ROUTES (comments routes)::
// NEW		campgrounds/:id/comments/new		GET
// CREATE	campgrounds/:id/comments			POST
