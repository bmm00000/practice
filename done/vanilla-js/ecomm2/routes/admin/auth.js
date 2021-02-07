const express = require('express');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');

// we are going to create a sub-router:
const router = express.Router();

router.get('/signup', (req, res) => {
	res.send(signupTemplate({ req }));
});

// const bodyParser = (req, res, next) => {
// 	if (req.method === 'POST') {
// 		req.on('data', (data) => {
// 			const parsed = data.toString('utf8').split('&');
// 			const formData = {};
// 			for (let pair of parsed) {
// 				const [ key, value ] = pair.split('=');
// 				formData[key] = value;
// 			}
// 			req.body = formData;
// 			next();
// 		});
// 	} else {
// 		next();
// 	}
// };
// this callback is run before we have all the additional information about email, passowrd, passowrd-confirmation (see timeline in screenshot). that's why we have to write some code to stop the execution until we have all the info (in order to parse the body by hand, without any libraries)

router.post('/signup', async (req, res) => {
	const { email, password, passwordConfirmation } = req.body;

	const existingUser = await usersRepo.getOneBy({ email });
	if (existingUser) {
		return res.send('A user with this email already exists');
	}

	if (password !== passwordConfirmation) {
		return res.send('Passwords do not match');
	}

	// Create a user in our user repo to represent this person:
	const user = await usersRepo.create({ email, password });

	// Store the id of that user inside the users cookie:
	// the 'cookie-session' library adds a property to the 'req' object ('req.session'). this property is an object, and we can add to it as many properties as we wish, and this info will be send back to the browser and maintained by this library (for any future requests):
	req.session.userId = user.id;

	res.send('Account created!');
});

router.get('/signout', (req, res) => {
	req.session = null;
	res.send('You are signed out');
});

router.get('/signin', (req, res) => {
	res.send(signinTemplate());
});

router.post('/signin', async (req, res) => {
	const { email, password } = req.body;

	const user = await usersRepo.getOneBy({ email });

	if (!user) {
		return res.send('User not found');
	}

	const validPassword = await usersRepo.comparePasswords(user.password, password);
	if (!validPassword) {
		return res.send('Incorrect password');
	}

	req.session.userId = user.id;

	res.send('You are signed in');
});

module.exports = router;
