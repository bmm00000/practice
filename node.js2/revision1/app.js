const http = require('http');

const serverHandler = (req, res) => {
	if (req.url === '/time') {
		res.statusCode = 200;
		res.end('<h1>' + new Date().toISOString() + '</h1>');
	} else if (req.url === '/') {
		res.statusCode = 200;
		res.end('<h1>This is the home page</h1>');
	} else {
		res.statusCode = 200;
		res.end('<h1>This is just another page</h1>');
	}
};

const server = http.createServer(serverHandler);

server.listen(3000);
