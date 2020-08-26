// this level will not work, I would need to configure the developers console in google as well.

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const app = express();

// you can access at any moment your env variables, for example:
// console.log(process.env.API_KEY)

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.use(
	session({
		secret: 'Our little secret.',
		resave: false,
		saveUninitialized: false
	})
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
	email: String,
	password: String,
	googleId: String,
	secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model('User', userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: 'http://localhost:3000/auth/google/secrets', // the same url we specified in google's developer console (see below)
			userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo' // we got this from github, since google is sunsetting google+ auth, this is another endpoint from google.
		},
		function(accessToken, refreshToken, profile, cb) {
			// in order to make the following work, you have to download mongoose-findorcreate from npm.
			User.findOrCreate({ googleId: profile.id }, function(err, user) {
				return cb(err, user);
			});
		}
	)
);

app.get('/', (req, res) => {
	res.render('home');
});

// user is authenticated by google:
app.get('/auth/google', (req, res) => {
	passport.authenticate('google', { scope: [ 'profile' ] });
});

// user is authenticated locally (this route is the url that we typed in google's developer console (see below)):
app.get('/auth/google/secrets', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
	res.redirect('/secrets');
});

app.get('/register', (req, res) => {
	res.render('register');
});

app.get('/login', (req, res) => {
	res.render('login');
});

//IS THIS CORRECT???
app.get('/secrets', (req, res) => {
	User.find({ secret: { $ne: null } }, function(err, foundUsers) {
		if (err) {
			console.log(err);
		} else {
			if (foundUsers) {
				res.render('secrets', { usersWithSecrets: foundUsers });
			}
		}
	});
});

app.get('/submit', (req, res) => {
	if (req.isAuthenticated()) {
		res.render('submit');
	} else {
		res.redirect('/login');
	}
});

app.post('/submit', (req, res) => {
	const submittedSecret = req.body.secret;

	User.findById(req.user.id, function(err, foundUser) {
		if (err) {
			console.log(err);
		} else {
			if (foundUser) {
				foundUser.secret = submittedSecret;
				foundUser.save(function() {
					res.redirect('/secrets');
				});
			}
		}
	});
});

app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

app.post('/register', (req, res) => {
	User.register({ username: req.body.username }, req.body.password, function(err, user) {
		if (err) {
			console.log(err);
			res.redirect('/register');
		} else {
			passport.authenticate('local')(req, res, function() {
				res.redirect('/secrets');
			});
		}
	});
});

app.post('/login', (req, res) => {
	const user = new User({
		username: req.body.username,
		password: req.body.password
	});

	req.login(user, function(err) {
		if (err) {
			console.log(err);
		} else {
			passport.authenticate('local')(req, res, function() {
				res.redirect('/secrets');
			});
		}
	});
});

app.listen(3000, () => {
	console.log('Server started on port 3000');
});

// Authentication/security
// =======================
// Level 1: User's email and password in database, but the password is a string in the database, so your employees or a potential hacker could see it.

// Level 2: Using encryption. Download package from npm: mongoose-encription. However, if a hacker accesses 'app.js', he could see the 'secret' variable, and use the same package to find out about the passwords.

// Also, we use environment variables to avoid pushing encryption keys, api keys/passwords, etc. (for example, AWS) to github or similar. Download package from npm: dotenv.

// Level 3: with encryption, you need a key (moving letters by one space, for example). With hashing, you don't need key. Hash functions make it almost impossible to go back from hash (to the actual password). The way it works is: when the user registers, the hash function turns the password into a hash, and the hash is stored in the database. When the user logs in, this happens again, and both hashes are compared to see if they are equal. If so, then the user logs in. Hence, the only person who knows the password is the user himself.

// For hashing, you need to download a npm package: md5

// Level 4: Then you can use salting (adding a bunch of characters to your password), so the resulting hashing is more complex, even with equal passwords, hashes would be different (you can use many salt rounds). Also, bcrypt makes it much slower for hackers to generate hash tables. Download package from npm: bcrypt (check version is compatible with version of node.js).

// Level 5: cookies and sessions. Download 'passport', 'passport-local', 'passport-local-mongoose', 'express-session' form npm. In this file, thanks to express-session, our site will send a cookie to the browser, so we don't need to login again if we try to access 'localhost:3000/secrets'. The cookie expires when the sessions ends. When you restart the server, the cookie gets deleted.

// Level 6: Third party OAuth::: OAuth (Open Authorisation): when you register on LinkedIn using your Gmail account, and you authorise LinkedIn to see your Gmail contacts, then LinkedIn sends a get request to Gmail to get your list of contacts, then Gmail sends LinkedIn a post request with your list of contacts, and then LinkedIn compares which of your Gmail contacts are already in Linkedin. But we can also use OAuth to use a big company's security system (for example, facebook or google) to allow the users of our website to authenticate themselves securely.
// OAuth gives you:
// 1. Granular Access Levels: you can request specific things from their facebook account (email address, list of friends, etc.)
// 2. It allows for read only or read and write access (for example, posting content on your facebook account).
// 3. The third party can revoke access at any moment (you can do that from your facebook account, for example).
// 1/ you have to set up your app in google's or facebook's developer console, and you will get an app id or client id.
// 2/ you re-direct the user to google's or facebook's authetication page
// 3/ the third party asks for permission for us to access their data.
// 4/ then we will receive an Auth Code from the third party.
// 5/ if you want to go one step further, you can exchange the Auth Code for an Access Token, and we will save it in our database. This is what we will use to request for pieces of info subsequently.
// Our site would receive an Auth Code from facebook, so now we are able to log them on our website. But if we want to go one step further, we can get an Access Token from facebook, which we will use to request for specific pieces of info from facebook. In a nutshell, an Auth Code is a one-time access, but an Access Token is a permanent pass that will allow you to access info in the longer term.
// we are using google oath 2.0 form npm (check passport/s website and npm documentation); you download it from npm; then you have to access google's developers console (link in documentation), fill in credentials, add scopes (things you want to know about the user) through google apis, etc...; then you create credentials clicking on 'OAuth client ID'; then, in 'javascript origins' you type your localhost:3000 url; then, in 'authorized redirect URIs, you type 'http://localhost:3000/auth/google/secrets; then you get your client id and your client secret, and you add these two variables to the environmental variables file.
// we had to download 'findOrCreate' from npm, go make what we copied from google work.

//

// If you would like to see the completed source code for each lesson, be sure to head over to the GitHub repository for this module and git clone the repo.

// Then you can use git log to see all the commits. You should see something like this:

//     commit 98ce8958d78eadfeb37cc7fb95c41cadf86fbd4f
//     Level 6 - Google OAuth 2.0 Authentication

//     commit 4e8349702f16a5570f9ff9b80f7a3740ddd8b108
//     Level 5 - Cookies and Sessions

//     commit d3b3b3a908fc01e72b99616db45e2c28f8975369
//     Level 4 - Hashing and Salting with bcrypt

//     commit 17696f8cfe68c8f91082a98e9750d45e9e176bc3
//     Level 3 - Hashing with md5

//     commit 92a07aa559eb29e5c9c0f50304e7b5e0674a25d1
//     Add Environment Vars

//     commit 1702e1d3f75bfbeb0e43848c8bd921863ea21147
//      Level 2 - Encryption

//     commit 7078af837299a4ff50121d67afe17d9fa522ec68
//     Level 1 - Username and Password Only

// If you would like to see the code after Level 1 - Username and Password Only for example, you can simply type:

// git checkout 7078af837299a4ff50121d67afe17d9fa522ec68 .

// into the Hyper terminal.

// NOTE: the dot at the end is very important, don't miss it out.
