const { check } = require('express-validator');
const usersRepo = require('../../repositories/users');

module.exports = {
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
		})
};
