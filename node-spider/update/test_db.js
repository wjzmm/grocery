var request = require('request'),
	cheerio = require('cheerio'),
	debug   = require('debug')('node-spider:update'),
	mysql   = require('mysql');

	debug('尝试读取招聘信息');

var db = mysql.createConnection({
	host: '127.0.0.1',
	port: 3306,
	database: 'node-spider',
	user: 'root',
	password: '920902',
});

db.query('show tables', function(err, tables){
	if(err) {
		console.log(err.stark);
	} else {
		console.log(tables);
	} 
	db.end();

})
