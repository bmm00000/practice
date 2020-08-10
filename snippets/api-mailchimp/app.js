const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var apiKey = ''; //Here your API key from Mailchimp
var listID = ''; //Here your list id

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/signup.html');
});

app.post('/', function(req, res) {
	var firstName = req.body.firstname;
	var lastName = req.body.lastname;
	var email = req.body.email;

	var data = {
		members: [
			{
				email_address: email,
				status: 'subscribed',
				merge_fields: {
					FNAME: firstName,
					LNAME: lastName
				}
			}
		]
	};

	var jsonData = JSON.stringify(data);

	const url = 'https://us20.api.mailchimp.com/3.0/lists/' + listID;

	var options = {
		method: 'POST',
		auth: 'jflkasjfl;asjfl;sajl',
		headers: {
			Authorization: 'anagutjor ' + apiKey
		},
		body: jsonData
	};

	const request = https.request(url, options, function(response) {
		if (response.statusCode === 200) {
			res.sendFile(__dirname + '/success.html');
		} else {
			res.sendFile(__dirname + '/failure.html');
		}

		response.on('data', function(data) {
			console.log(JSON.parse(data));
		});
	});

	request.write(jsonData);
	request.end();
});

app.post('/failure', function(req, res) {
	res.redirect('/');
});

app.listen(process.env.PORT || 3000, function() {
	console.log('Server is listening on port 3000');
});
