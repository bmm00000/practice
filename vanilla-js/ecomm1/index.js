const express = require('express');
const bodyParser = require('body-parser');
const usersRepo = require('./repositories/users');
const cookieSession = require('cookie-session');
const { response } = require('express');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cookieSession({
		keys: [ 'lsajf;dl' ]
	})
);

app.get('/signup', (req, res) => {
	res.send(`
	<div>
		Your id is: ${req.session.userId}
        <form method="POST">
            <input type="text" placeholder="Email" name="email">
            <input type="text" placeholder="Password" name="password">
            <input type="text" placeholder="Password Confirmation" name="passwordConfirmation">
            <button>Sign Up</button>
        </form>
    </div>
    `);
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

app.post('/signup', async (req, res) => {
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

app.get('/signout', (req, res) => {
	req.session = null;
	res.send('You are signed out');
});

app.get('/signin', (req, res) => {
	res.send(`
		<div>
			<form method="POST">
				<input type="text" placeholder="Email" name="email">
				<input type="text" placeholder="Password" name="password">
				<button>Sign In</button>
			</form>
		</div>`);
});

app.post('/signin', async (req, res) => {
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

app.listen(3000, () => {
	console.log('Listening...');
});

// when we go to google.com, we don't specify the port (':3000', for exmple), because it's fixed by default: if you type http the default port is 80, if https the default port is 443. as a path, you don't put anything, '/' is used by default. also, the method by default is GET.

// the router object is inside 'app', the route is the same as the path (for example, '/'), the route handler is the callback
