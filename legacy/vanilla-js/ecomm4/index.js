const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth'); // we are hooking up the router to the 'app'

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// the cookie-session library is a middleware function, like body-parser:
app.use(
	cookieSession({
		keys: [ 'al;sjdflasjflajsl' ]
		// 'keys' is the encryption key to encrypt our cookies data, therefore it will not be possible to modify a cookie and pretend to be someone else
	})
);
app.use(authRouter); // we are connecting the router to the 'app'. Very important that we place this middleware after the other middleware functions

app.listen(3000, () => {
	console.log('Listening');
});

// to execute the 'scripts in 'package.json' you have to run in the CLI: 'npm run dev'. the 'run' command tells npm that we want to execute one of the scripts that we have in package.json
// why don't we execute in the CLI 'nodemon index.js' directly, so we don't need to include it in the 'scripts' of package.json? Because if we specify it in package.json it will be more clear to other engineers that take a look at our project

// key concepts:
// static sites vs dynamic sites> in static sites you access the html page and that's what you get. in dynamic sites the server gives you different things depending on your request.
// just with node standard library you can create a server, but with express you can do it more conveniently.

// the browser is not responsible for issuing the network request; it handles it to the operating system (see screenshot), the operating system then accesses some network device conected to the computer, and and sends the request over the internet. if you make a request to other than 'localhost', the operating system is going to reach out to a DNS server, the DND server will send back to my computer the IP address of the url that I typed in, and my machine will make a second request (the actual request) to that IP address. Otherwise, if you use 'localhost', the operating system will look at the port that you specified, and then express will receive that incoming request at that port. when the request gets to express, then it doesn't care about the host or the port anymore. What express cares about is the path that we are trying to access and the method.
// if you go to google.com and you put http at the start of the url, the default port is 80, if you put https the default port is 443. that's why when we do a normal request to a website we want to visit, we don't include the port number because there is default value being used.

// keywords: network request, root route, route handler

// express works together with the browser, so when you do res.send of html code between backticks, the browser takes it as html, not as a string.

// when you submit a form clicking on the button, the browser does an authomatic submission: collects all the info from the elements of the form (those that have a 'name' property), and makes a GET request (by default is GET) to the same url that it's looking at. you can see the info in the query string when you click on submit. we could configure the server to receive the info, and use that info to create an account for this user. we will use the POST method for that (method used to create a record). when we use the POST method, there is no query string, and the info gets attached to the 'request body' ( you can see the info in the browser if you go to 'network' and then 'form data' (see screenshot)). how can we access the info sent with the POST request to the server? when making a GET request, the info is in the query string, but with a POST request, the info is in the request body, how to access it? there are 2 ways: first way is looking behind the scenes, the second is more production oriented to be used on a daily basis.
//first way: the info  that we send to the server is not sent in one go, but in many packets of info (see screenshot): we need to write code to assemble all these little chucks of info and assemble them. look at the screenshot: the 'on' method is identical to 'addEventListener'. when we consolelog the info sent by the browser, the data appears in the form of a buffer (an array that contains some raw info). we use the method 'toString('utf8')' to convert the buffer into a legible string, and then we extract what we want (look at screenshot):: we want to extract all that processing work into a middleware function. we call the middleware function BEFORE we call the route handler.  the 'next' function is a function that express gives us to continue the execution of the route handler. We are going to do all this with a library: bodyparser (this library is better than coding it yourself because it accounts for many corner cases). with 'app.use', you don't need to write the middleware in every route.
