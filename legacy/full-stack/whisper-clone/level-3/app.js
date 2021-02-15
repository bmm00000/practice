require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const md5 = require('md5');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
	email: String,
	password: String
});

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
		password: md5(req.body.password)
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
	const password = md5(req.body.password);

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

// Level 2: Using encryption. Download package from npm: mongoose-encription. However, if a hacker accesses 'app.js', he could see the 'secret' variable, and use the same package to find out about the passwords.
// Also, we use environment variables to avoid pushing encryption keys, api keys/passwords, etc. (for example, AWS) to github or similar. Download package from npm: dotenv.

// Level 3: with encryption, you need a key (moving letters by one space, for example). Therefore, if a hacker finds out your key, then you are done. With hashing, you don't need key. Hash functions make it almost impossible to go back from hash (to the actual password). The way it works is: when the user registers, the hash function turns the password into a hash, and the hash is stored in the database. When the user logs in, this happens again, and both hashes are compared to see if they are equal. If so, then the user logs in. Hence, the only person who knows the password is the user himself.
// However, hash tables can be generated (hashes of most usual passwords, combinations of characters, dictionary words, etc.). Therefore, if a hacker access your database with all the hashes of passwords, then he can compare the hashes with his hash tables and find out some passwords.
// By brute force, GPUs or botnets can generate 20 billion + hashes per second. If they get your hash, you are probably fucked.
// The longer the password, the time a brute force attack needs to crack it grows exponentially.
// For hashing, you need to download a npm package: md5

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
