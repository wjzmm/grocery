var mysql = require('mysql');

exports.db = mysql.createConnection({
	host: '127.0.0.1',
	port: 3306,
	database: 'node-spider',
	user: 'root',
	password: '920902',
});

exports.xjtu_job_url = {
	url: "http://job.xjtu.edu.cn/"
};

exports.port = 3000;
exports.autoUpdate = '* */30 * * *';