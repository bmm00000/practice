const fs = require('fs');

const requestHandler = (req, res) => {
	const url = req.url;
	const method = req.method;

	if (url === '/') {
		res.setHeader('Content-Type', 'text/html');
		res.write(
			'<html><body><h1>Add a new user</h1><form action="/add-user" method="POST"><input type="text"name="username"placeholder="Add a new user here..."/><button type="submit">Add user</button></form></body></html>'
		);
		return res.end();
	}

	if (url === '/users') {
		res.setHeader('Content-Type', 'text/html');
		res.write(
			'<html><body><h1>Our users</h1><ul><li>First user</li><li>Second user</li></ul></body></html>'
		);
		return res.end();
	}

	if (url === '/add-user' && method === 'POST') {
		const body = [];
		req.on('data', (chunk) => {
			body.push(chunk);
		});

		req.on('end', () => {
			const parsedData = Buffer.concat(body).toString();
			console.log(parsedData.split('=')[1]);

			res.statusCode = 302;
			res.setHeader('Location', '/');
			return res.end();
		});
	}
};

module.exports = requestHandler;
