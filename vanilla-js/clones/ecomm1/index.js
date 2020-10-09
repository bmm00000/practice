const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send(`
    <div>
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

app.post('/', (req, res) => {
	console.log(req.body);
	res.send('Account created!');

	// this callback is run before we have all the additional information about email, passowrd, passowrd-confirmation (see timeline in screenshot). that's why we have to write some code to stop the execution until we have all the info (in order to parse the body by hand, without any libraries)
});

app.listen(3000, () => {
	console.log('Listening...');
});

// when we go to google.com, we don't specify the port (':3000', for exmple), because it's fixed by default: if you type http the default port is 80, if https the default port is 443. as a path, you don't put anything, '/' is used by default. also, the method by default is GET.

// the router object is inside 'app', the route is the same as the path (for example, '/'), the route handler is the callback
