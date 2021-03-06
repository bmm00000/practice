const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = {
	email: String,
	password: String
};

const User = new mongoose.model('User', userSchema);

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/register', (req, res) => {
	res.render('register');
});

app.get('/login', (req, res) => {
	res.render('login');
});

app.post('/register', (req, res) => {
	const newUser = new User({
		email: req.body.username,
		password: req.body.password
	});

	newUser.save((err) => {
		if (err) {
			console.log(err);
		} else {
			res.render('secrets');
		}
	});
});

app.post('/login', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	User.findOne({ email: username }, (err, foundUser) => {
		if (err) {
			console.log(err);
		} else {
			if (foundUser) {
				if (foundUser.password === password) {
					res.render('secrets');
				}
			}
		}
	});
});

app.listen(3000, () => {
	console.log('Server started on port 3000');
});

// Authentication/security
// =======================
// Level 1: User's email and password in database, but the password is a string in the database, so your employees or a potential hacker could see it.

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
