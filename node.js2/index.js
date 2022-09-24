const http = require('http');

function handleRequest(request, response) {
	response.statusCode = 200;
	response.end('<h1>Hello there!</h1>');
}

const server = http.createServer(handleRequest);

server.listen(3000);
