const fs = require('fs');

const requestHandler = (req, res) => {
	const url = req.url;
	const method = req.method;
	if (url === '/') {
		res.setHeader('Content-Type', 'text/html');
		res.write('<html>');
		res.write(
			'<body><h1>My form</h1><form method="POST" action="/message"><input  type="text" name="message"><button>Click here</button></form></body>'
		);
		res.write('</html>');
		return res.end();
	}

	if (url === '/message' && method === 'POST') {
		const body = [];
		req.on('data', (chunk) => {
			// console.log(chunk);
			body.push(chunk);
		});

		return req.on('end', () => {
			const parsedData = Buffer.concat(body).toString();
			const message = parsedData.split('=')[1];
			fs.writeFile('message.txt', message, () => {
				res.statusCode = 302;
				res.setHeader('Location', '/');
				res.end();
			});
		});
	}

	res.setHeader('Content-Type', 'text/html');
	res.write('<html>');
	res.write('<body><h1>Hey there!</h1></body>');
	res.write('</html>');
	res.end();
};

// module.exports = requestHandler;

// module.exports = { reqHandler: requestHandler, someText: 'Some text here...' };

// module.exports.reqHandler = requestHandler;
// module.exports.someText = 'Some text here...';

exports.reqHandler = requestHandler;
exports.someText = 'Some text here...';
