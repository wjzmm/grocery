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
/*
*保存评论
* name: 用户昵称， con：评论内容
*/
exports.saveComment = function(name, con, callback){
	var time = new Date(+new Date()+8*3600*1000).toISOString().slice(0, 19).replace('T', ' ');
	var sql = 'insert into comment(name, content, create_time) values ("' + name + '","' + con + '","'+ time + '")';
	console.log(sql);
	db.query(sql, function(err, result, fileds){
		
		callback(null, result);
	})
}

exports.updateCount = function(id, callback){
	
	db.query("update article set rcount=rcount+1 where id = ?", [id], function(err, result, fileds){
		
		callback(null);
	})
}