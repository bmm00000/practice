const { check } = require('express-validator');
const usersRepo = require('../../repositories/users');

module.exports = {
	requireTitle: check('title')
		.trim()
		.isLength({ min: 5, max: 40 })
		.withMessage('Must be between 5 and 40 characters'),
	requirePrice: check('price')
		.trim()
		.toFloat()
		.isFloat({ min: 1 })
		.withMessage('Must be greater than 1'),
	// toFloat converts a string into numbers. isFloat makes sure that it's a float (just in case the user typed letters, for example), and the minimum number is 1
	requireEmail: check('email')
		.trim()
		.normalizeEmail()
		.isEmail()
		.withMessage('Must be a valid email')
		// we add in here in the 'cumstom' function the validations that we had before, so all the validation is located in the same place:
		.custom(async (email) => {
			const existingUser = await usersRepo.getOneBy({ email });
			if (existingUser) {
				throw new Error('Email in use');
			}
		}),
	requirePassword: check('password')
		.trim()
		.isLength({ min: 4, max: 20 })
		.withMessage('Must be between 4 and 20 characters'),
	requirePasswordConfirmation: check('passwordConfirmation')
		.trim()
		.isLength({ min: 4, max: 20 })
		.withMessage('Must be between 4 and 20 characters')
		// we add in here in the 'cumstom' function the validations that we had before, so all the validation is located in the same place:
		.custom((passwordConfirmation, { req }) => {
			// custom functions can take a second argument that revceives the req object (see screenshots and documentation), to do things such as comparing passwords :)
			if (passwordConfirmation !== req.body.password) {
				throw new Error('Passwords must match');
			}
		}),
	requireEmailExists: check('email')
		.trim()
		.normalizeEmail()
		.isEmail()
		.withMessage('Must provide a valid email')
		.custom(async (email) => {
			const user = await usersRepo.getOneBy({ email });

			if (!user) {
				throw new Error('Email not found');
			}
		}),
	requireValidPasswordForUser: check('password')
		.trim()
		.custom(async (password, { req }) => {
			// for the password we don't check now for length, since we may change the requirements for signup in the future, so we would need to change here as well, so it will create dependency and potential for bugs...
			const user = await usersRepo.getOneBy({ email: req.body.email });
			if (!user) {
				// even though we are checking the password, the throw the following message, since it will be next to our password input.
				throw new Error('Invalid password');
			}
			const validPassword = await usersRepo.comparePasswords(
				user.password,
				password
			);

			if (!validPassword) {
				throw new Error('Invalid password');
			}
		}),
};
