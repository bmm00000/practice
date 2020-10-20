const { validationResult } = require('express-validator');

module.exports = {
	handleErrors(templateFunc) {
		// we return a function because in express all middlewares must be functions (this will be executed every single time that a req comes in)
		return (req, res, next) => {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.send(templateFunc({ errors }));
			}

			next();
		};
	},

	// why is the structure of these two middleware functions different? becuase in handleErrors, we wanted to customize the middleware, depending on the route handler.

	requireAuth(req, res, next) {
		if (!req.session.userId) {
			return res.redirect('/signin');
		}

		next();
	},
};
