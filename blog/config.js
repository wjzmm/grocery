var mysql = require('mysql');

exports.db = mysql.createConnection({
	host: '127.0.0.1',
	port: 3306,
	database: 'blog',
	user: 'root',
	password: '920902',
});

exports.port = 3001;
exports.pageSize = 10;