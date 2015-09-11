var async = require('async'),
	db = require('../config').db,
	moment = require('moment');


exports.saveArticle = function(title, author, content, selector, summary, callback){
	var time = new Date(+new Date()+8*3600*1000).toISOString().slice(0, 19).replace('T', ' ');
	console.log(time);
	db.query("insert into article(title, type, time, author, summary, content) values (?, ?, ?, ?, ?, ?)", 
		[title, selector, time, author, summary, content], function(err, data){
		if (err) console.log(err);
		callback(null);
		//console.log(data);
	});
}
