// From npm:
// "body-parser": "^1.19.0",
// "express": "^4.17.1",
// "express-session": "^1.17.1",
// "mongoose": "^5.9.27",
// "passport": "^0.4.1",
// "passport-local": "^1.0.0",
// "passport-local-mongoose": "^6.0.1"
// ejs

const express = require('express'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	bodyParser = require('body-parser'),
	User = require('./models/user'),
	LocalStrategy = require('passport-local'),
	passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/auth_demo_app', { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	require('express-session')({
		secret: 'Rusty is the best and cutest dog in the world',
		resave: false,
		saveUninitialized: false
	})
);
// sessions is what we use to give 'state' to the http requests, since http requests are stateless (dont' get updated over time)

app.use(passport.initialize());
app.use(passport.session());
// the last two lines are setting up passport

passport.use(new LocalStrategy(User.authenticate()));
//we will use this method to authenticate the user when he is trying to login
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// since we use 'passportLocalMongoose' in 'user.js', the User... methods are already defined for us.

// =========================
// ROUTES
// =========================

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/secret', isLoggedIn, (req, res) => {
	res.render('secret');
});

// AUTH ROUTES
// show sign up form
app.get('/register', (req, res) => {
	res.render('register');
});

// handling user sign up
app.post('/register', (req, res) => {
	req.body.username;
	req.body.password;
	User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
		if (err) {
			console.log(err);
			res.render('register');
		} else {
			passport.authenticate('local')(req, res, function() {
				res.redirect('/secret');
			});
		}
	});
});
// when user registers, we create a new user, but we only store the username in the database, not the password. We pass the password as a second argument. 'User.register' will hash the password (it turns it into a huge string of numbers and letters), and stores that in the database. The user returned by the database 'user' will have the username and the hashed password as well.

// instead of 'local' you can use 'facebook', etc. if you have them installed.

// LOGIN ROUTES
// render login form
app.get('/login', (req, res) => {
	res.render('login');
});

// login logic
app.post(
	'/login',
	passport.authenticate('local', { successRedirect: '/secret', failureRedirect: '/login' }),
	(req, res) => {}
);
//here we use middleware: the second argument of 'app.post'. Middleware is some code that runs before our final callback. this middleware compares that username and password provided with the crazy hash password in the database.

app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});
// with 'logout', password destroys the data from in the user in the session, it doesn't keep track of it anymore from request to request.
// BUT, we can still access 'secret' even if we are logged out, that's why we are going to add middleware in the secret route, it will check if the user is logged in or not:

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}
//'next' refers to the callback of the 'secret' route: when we verified that the user is authanticated, then we run it.

app.listen(3000, () => {
	console.log('Server started...');
});
