const express = require('express');

const { handleErrors } = require('./middlewares');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const {
	requireEmail,
	requirePassword,
	requirePasswordConfirmation,
	requireEmailExists,
	requireValidPasswordForUser,
} = require('./validators');

const router = express.Router();
// we required 'express' in order to use the 'router'. 'router' redirects to the 'app' of index.js. This way, we can have different files redirecting to the same 'app'

router.get('/signup', (req, res) => {
	res.send(signupTemplate({ req })); // same as 'req: req'
});

router.post(
	'/signup',
	[requireEmail, requirePassword, requirePasswordConfirmation],
	handleErrors(signupTemplate),
	async (req, res) => {
		const { email, password } = req.body;
		// create a user in the user repo to represent this person:
		const user = await usersRepo.create({ email, password });

		// now we have to decide how to interact with the users cookie. there are two ways: do it manually using the different apis offered by express, or we can use a third party package to manage the cookie for us (we are going to do the second, because cookies are notoriously difficult to deal with, and there are mistakes you can make and expose your users' identities, so outside libraries are highly recommended when dealing with cookies), so we go to npm and install 'cookie-session'

		// store the id of that user inside the user's cookie (we are adding 'userId', but we can call it as we wish):
		req.session.userId = user.id;
		// the library 'cookie-session' will store the cookie in the req object: 'req.session' (this will not happen if you don't use this library). req.session is an object, and you can add as many properties as you wish to it. if you add or change any properties, the library is going to encrypt all that info into a string, and that is what it will send to the client browser.

		res.redirect('/admin/products');
	}
);

router.get('/signout', (req, res) => {
	req.session = null;
	res.send('You are logged out');
});

router.get('/signin', (req, res) => {
	res.send(signinTemplate({}));
	// we pass an empty object becuase in the singinTemplate function we expect to receive an object, otherwise it will give us an error
});

router.post(
	'/signin',
	[requireEmailExists, requireValidPasswordForUser],
	handleErrors(signinTemplate),
	async (req, res) => {
		const { email } = req.body;
		const user = await usersRepo.getOneBy({ email });

		req.session.userId = user.id;
		// this is what makes the user authenticated so the user can come back without signing in again.

		res.redirect('/admin/products');
	}
);

module.exports = router;

// key ideas: if you get someone else's cookies, you can fake their identity and access their accounts in facebook, or whatever. when you loggin a website, you send a post request to their servers, and your browser receives the cookies that identify you. you can see the cookies if you loggin somewhere, and you check in the browser 'network', and 'headers', 'response headers', 'set-cookie'. then, every time your browser makes a subsequent request, it will includes the cookies (you can see them in the subsequest requests that you make to the server, if you go to 'network', click on the request, and then 'headers'). in order to check this, you can use POSTMAN, which allows you to make different kinds of network requests, and specify what options you want to include with every request that you make. in postman, you can go to 'headers', then type 'cookie' in 'key', paste the the cookie from your browser's headers in 'value', and you can fake your identity, and access that site with postman (see screenshot)

// properties of hashing algorithms: with the same input, you always get the same output. if you change the input just a little bit, the whole hash changes a lot. with the hash, you can't get the original password (it does not work in reverse)

// even using a hashing algorithm (you store the hash, never the password), there's a security risk: a malicious user can use a rainbow table attack (to use a hash table) (see screenshot). how to prevent this? we are going to add a random string of characters to the password (salt), and then we will hash that (see screenshot)
