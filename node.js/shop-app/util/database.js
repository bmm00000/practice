const mysql = require('mysql2');

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	database: 'node-complete',
	password: 'A1s2d3f4g5',
});

module.exports = pool.promise();
