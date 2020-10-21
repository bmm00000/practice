const { validationResult } = require('express-validator');

module.exports = {
	handleErrors(templateFunc, dataCb) {
		// we return a function because in express all middlewares must be functions (this will be executed every single time that a req comes in)
		return async (req, res, next) => {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				// we do the following to access the data variable outside of the if statement:
				let data = {}; // we assign it to an empty object just in case there is no dataCb, and 'data' is undefined (we don't want errors when we include ...data)
				if (dataCb) {
					data = await dataCb(req);
				}
				return res.send(templateFunc({ errors, ...data }));
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
