const { check } = require('express-validator'); // 'express-validator' will help you to add a message in the form when the user provides an invalid email, etc., otherwise, the 'Invalid Email' message (for example) will appear in a separate html file, and the user will need to press the 'back' button to get back to the form (see screenshot: we pass an array as a second function in the router (middleware), and you check the email, password, etc... see documentation: go to 'API', then 'validation chain api', then 'validator.js docs', and you go to a github document with all the validators (functions that you can chain on to add validation requirements)). validator.js is another library, what express-validator does is to present the functionality from validator.js in a very convenient way to use it with express (that's why we don't use the validating functions as they appear in 'validator.js' documentation (we don't add arguments to 'isEmail()', for example)).

// the other thing we can do with 'express-validator' is sanitization (go to 'Sanitization Chain API') (see screnshot): massage or change the incoming value that the user has provided (for example, to trim an incoming value = to eliminate spaces before or after the password, for example). IN A NUTSHELL: VALIDATION IS ABOUT VERYFYING THAT THE INPUT CONFORMS TO CERTAIN STRUCTURE; SANITIZATION IS ABOUT MASSAGING THE INPUT
// we do first sanitization, then validation.
const usersRepo = require('../../repositories/users');

module.exports = {
	requireEmail: check('email')
		.trim()
		.normalizeEmail()
		.isEmail()
		.withMessage('Must be a valid email')
		// we we are going to use custom functions to validate properties (see 'express'validator' documentation in the screnshot)
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
		.custom((passwordConfirmation, { req }) => {
			if (passwordConfirmation !== req.body.password) {
				throw new Error('Passwords must match');
			}
		})
	// the 'express-validator' library is going to attach the results of all these validators in the 'req' object. That's how we pass the info from these validators into 'validationResult(req)'
};
