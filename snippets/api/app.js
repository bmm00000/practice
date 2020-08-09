// endpoint:
//      https://sv443.net/jokeapi/v2/joke/
// paths:
//      https://sv443.net/jokeapi/v2/joke/Programming
// parameters:
//      https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=sexist&type=single
// authentication
// (you have limits on the data that you can get)

const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
	const city = req.body.cityName;
	const apiKey = 'a814111a3946d5f78cebe1c028bed917';
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
	// you have to include 'https://' in the url!!
	https.get(url, (response) => {
		console.log(response.statusCode);
		response.on('data', (data) => {
			const dataJS = JSON.parse(data);
			// res.send(dataJS); // now we see the data in the browser, so we can see what paths we are interested in.
			// btw, the opposite of JSON.parse() is JSON.stringify()
			const temp = dataJS.weather[0].id;
			const weather = dataJS.weather[0].description;
			const icon = dataJS.weather[0].icon;
			const iconImg = `http://openweathermap.org/img/wn/${icon}@2x.png`;
			res.write('<p>The weather is currently: ' + weather + '</p>');
			res.write('<h1>The temperature in ' + city + ' is ' + temp + ' strange degrees.</h1>');
			res.write('<img src=' + iconImg + '>');
			res.send();
			// we use 'res.write' to send several lines. you can only use one 'res.send'.
		});
	});
});

app.listen(PORT, () => {
	console.log('The server is working...');
});
