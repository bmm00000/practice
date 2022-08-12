const http = require('http');

const server = http.createServer((req, res) => {
	// console.log(req.url);
	// console.log(req.method);
	// console.log(req.headers);
	// console.log(res);
	// process.exit();
	res.setHeader('Content-Type', 'text/html');
	res.write('<html>');
	res.write('<body><h1>Hey there!</h1></body>');
	res.write('</html>');
	res.end();
});

server.listen(3000);
