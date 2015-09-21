var async = require('async'),
	db = require('../config').db,
	moment = require('moment');
var crypto = require('crypto');
var md5 = crypto.createHash('md5');


exports.saveArticle = function(title, author, content, selector, summary, callback){
	var time = new Date(+new Date()+8*3600*1000).toISOString().slice(0, 19).replace('T', ' ');
	console.log(time);
		//insert into abcxyz(time, content) values(?, ?) ON DUPLICATE KEY update keywordv=keywordv+1
	db.query("insert into article(title, type, time, author, summary, content) values (?, ?, ?, ?, ?, ?)", 
		[title, selector, time, author, summary, content], function(err, data){
		if (err) console.log(err);
		callback(null);
		//console.log(data);
	});
}

exports.updateArticle = function(id, title, author, content, selector, summary, callback){
	var time = new Date(+new Date()+8*3600*1000).toISOString().slice(0, 19).replace('T', ' ');
	console.log(time);
		//insert into abcxyz(time, content) values(?, ?) ON DUPLICATE KEY update keywordv=keywordv+1
	db.query("update article set title=?, type=?, time=?, author=?, summary=?, content=? where id=?", 
		[title, selector, time, author, summary, content, id], function(err, data){
		if (err) console.log(err);
		callback(null);
		//console.log(data);
	});
}

exports.saveAbcxyz = function(content, callback){
	var time = new Date(+new Date()+8*3600*1000).toISOString().slice(0, 19).replace('T', ' ');
	console.log(time);

	db.query("insert into abcxyz(time, content) values ", 
		[time, content], function(err, data){
		if (err) console.log(err);
		callback(null);
		//console.log(data);
	});
}
/*
*保存评论
* name: 用户昵称， con：评论内容
*/
exports.saveComment = function(name, con, id, email, callback){
	console.log(email);
	// var email_md5 = md5.update(email.toLowerCase()).digest('hex');
	var email_md5 = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
	var header = "http://gravatar.duoshuo.com/avatar/" + email_md5 + "?s=50&d=monsterid&r=G";
	console.log(header);
	var time = new Date(+new Date()+8*3600*1000).toISOString().slice(0, 19).replace('T', ' ');
	var sql = 'insert into comment(name, content, parentid, create_time, email, header) values ("' + name + '","' + con + '","' + id + '","' + time + '","' + email + '","' + header + '")';
	console.log(sql);
	db.query(sql, function(err, result, fileds){
		console.log('insert'+result);
		callback(null, result);
	})
	// db.query("insert into comment(name, content, parentid, create_time, email, header) values (?, ?, ?, ?, ?, ?)", [name, con, id, time, email, header], function(err, result, fileds){
	// 	console.log('insert'+result);
	// 	callback(null, result);
	// })
}

exports.updateCount = function(id, callback){
	
	db.query("update article set rcount=rcount+1 where id = ?", [id], function(err, result, fileds){
		
		callback(null);
	})
}