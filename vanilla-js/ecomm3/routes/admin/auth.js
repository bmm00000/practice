const express = require('express');
const { check, validationResult } = require('express-validator');

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

router.post(
	'/signup',
	[
		check('email').trim().normalizeEmail().isEmail().custom(async (email) => {
			const existingUser = await usersRepo.getOneBy({ email });
			if (existingUser) {
				throw new Error('Email already in use');
				// this error will appear in the CLI
			}
		}),
		// we were doing the existingUser and passwordConfirmation checks in a different location than the 'express-validator' middleware above, which is bad. That's why we are including these checks in the middleware using custom validators (see documentation and screenshots)
		check('password').trim().isLength({ min: 4, max: 20 }).withMessage('Must be between 4 and 20 characters'),
		check('passwordConfirmation')
			.trim()
			.isLength({ min: 4, max: 20 })
			.withMessage('Must be between 4 and 20 characters')
			.custom((passwordConfirmation, { req }) => {
				if (passwordConfirmation !== req.body.password) {
					throw new Error('Passwords must match');
				}
			})
	],
	async (req, res) => {
		// the express-validator library is going to attach the results of all the former validation to the req object:
		const errors = validationResult(req);
		console.log(errors);

		const { email, password, passwordConfirmation } = req.body;
		const user = await usersRepo.create({ email, password });

		// Store the id of that user inside the users cookie:
		// the 'cookie-session' library adds a property to the 'req' object ('req.session'). this property is an object, and we can add to it as many properties as we wish, and this info will be send back to the browser and maintained by this library (for any future requests):
		req.session.userId = user.id;

		res.send('Account created!');
	}
);

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

// 'express-validator' (middleware) will help you to add a message in the form when the user provides an invalid email, etc., otherwise, the 'Invalid Email' message (for example) will appear in a separate html file, and the user will need to press the 'back' button to get back to the form (see screenshot: we pass an array as a second function in the router (middleware), and you check the email, password, etc... see documentation: go to 'API', then 'validation chain api', then 'validator.js docs', and you go to a github document with all the validators (functions that you can chain on to add validation requirements)). validator.js is another library, what express-validator does is to present the functionality from validator.js in a very convenient way to use it with express (that's why we don't use the validating functions as they appear in 'validator.js' documentation (we don't add arguments to 'isEmail()', for example)).

// the other thing we can do with 'express-validator' is sanitization (go to 'Sanitization Chain API') (see screnshot): massage or change the incoming value that the user has provided (for example, to trim an incoming value = to eliminate spaces before or after the password, for example). IN A NUTSHELL: VALIDATION IS ABOUT VERYFYING THAT THE INPUT CONFORMS TO CERTAIN STRUCTURE; SANITIZATION IS ABOUT MASSAGING THE INPUT
// we do first sanitization, then validation.
