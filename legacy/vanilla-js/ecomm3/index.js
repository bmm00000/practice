const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cookieSession({
		keys: [ 'lsajf;dl' ]
	})
);
app.use(authRouter);

app.listen(3000, () => {
	console.log('Listening...');
});

// when we go to google.com, we don't specify the port (':3000', for exmple), because it's fixed by default: if you type http the default port is 80, if https the default port is 443. as a path, you don't put anything, '/' is used by default. also, the method by default is GET.

// the router object is inside 'app', the route is the same as the path (for example, '/'), the route handler is the callback
