const { check } = require('express-validator');
const usersRepo = require('../../repositories/users');

module.exports = {
	requireEmail: check('email')
		.trim()
		.isEmail()
		.normalizeEmail()
		.withMessage('Must be a valid email')
		.custom(async (email) => {
			const existingUser = await usersRepo.getOneBy({ email });
			if (existingUser) {
				throw new Error('This user already exists');
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
		.custom((passwordConfirmation, { req }) => {
			if (passwordConfirmation !== req.body.password) {
				throw new Error('Passwords do not match');
			}
		}),
	requireEmailExists: check('email')
		.trim()
		.isEmail()
		.normalizeEmail()
		.withMessage('Must be a valid email')
		.custom(async (email) => {
			const user = await usersRepo.getOneBy({ email });
			if (!user) {
				throw new Error('There is no user with this email');
			}
		}),
	requireValidPasswordForUser: check('password')
		.trim()
		.custom(async (password, { req }) => {
			const user = await usersRepo.getOneBy({ email: req.body.email });
			if (!user) {
				throw new Error('Invalid password');
			}

			const validPassword = await usersRepo.comparePasswords(
				user.password,
				password
			);
			if (!validPassword) {
				throw new Error('Incorrect password');
			}
		}),
};
