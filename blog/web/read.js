var async = require('async'),
	db = require('../config').db,
	pageSize = require('../config').pageSize,
	commentSize = require('../config').commentSize,
	moment = require('moment');
var crypto = require('crypto');
var md5 = crypto.createHash('md5');


exports.searchDb = function(page, keywords, callback){
	var start = (page -1) * pageSize;
	//console.log(keywords);
	var searchSql = "select * from article where title like '%" + keywords + "%' or content like '%" + keywords + "%' or type like '%" + keywords + "%' limit " + start + "," + pageSize + ";";
	//console.log(searchSql);
	db.query(searchSql, function(err, result, fields){
		callback(result);
	});
}

exports.searchDbCount = function(keywords, callback){
	var searchSql = "select * from article where title like '%" + keywords + "%' or content like '%" + keywords + "%'";
	//console.log(searchSql);
	db.query(searchSql, function(err, result, fields){
		callback(result.length);
	});
}

exports.readArticleRight = function(callback){
	db.query("select * from article order by rcount desc limit 0, 15", function(err, result){
		if (err) console.log(err);
		result.forEach(function(item){
			item.time = moment(item.time).format('YYYY-MM-DD h:mm:ss');
			//console.log(item.time);
		});
		callback(result);
	})
}

exports.readArticleComments = function(id, callback){
	db.query("select * from comment where parentid = '"+ id + "'order by create_time desc limit 0, 10", function(err, result){
		if (err) console.log(err);
		result.forEach(function(item){
			item.create_time = moment(item.create_time).format('YYYY-MM-DD h:mm:ss');
			//console.log(item.time);
		});
		callback(result);
	})
}

exports.readArticleList = function(page, callback){
	var start = (page -1) * pageSize;
	db.query("select * from article limit ?, ?", [start, pageSize], function(err, result){
		if (err) console.log(err);
		result.forEach(function(item){
			item.time = moment(item.time).format('YYYY-MM-DD h:mm:ss');
			console.log(item.time);
		});
		callback(result);
	})
	
}

exports.readClassifyCount = function(type, callback){
	var sql = "select count(*) from article where type = '" + type +"';";
	db.query(sql, function(err, result){
		if (err) console.log(err);
		callback(result[0]['count(*)']);
	})
}
exports.readClassify = function(page, type, callback){
	var start = (page-1) * pageSize;
	var sql = "select * from article where type = '" + type +"' limit " + start + "," + pageSize + ";";
	//console.log(sql);
	db.query(sql, function(err, result){
		if (err) console.log(err);
		result.forEach(function(item){
			item.time = moment(item.time).format('YYYY-MM-DD h:mm:ss');
			
		});
		callback(result);
	})
}
exports.readArticle = function(id, callback){
	db.query("select * from article where id = ?", [id], function(err, result){
		if (err) console.log(err);
		// console.log(result);
		result.forEach(function(item){
			item.time = moment(item.time).format('YYYY-MM-DD h:mm:ss');
			
		});
		callback(result);
	})
}

exports.readCount = function(callback){
	db.query("select count(*) from article", function(err, result){
		callback(result[0]['count(*)']);
	})
}



/*
*读取所有评论
* page：当前页数
*/
// exports.readAllComments = function(page, callback){
// 	var start = (page - 1) * pageSize;
// 	var sql = 'select * from comment order by create_time desc limit ' + start + ',' + pageSize;
// 	db.query(sql, function(err, result, fields){
// 		result.forEach(function(re){
// 			re.create_time = moment(re.create_time).format('YYYY-MM-DD h:mm:ss a');
// 			//console.log(re.time);
// 		});
// 		callback(result);
// 	})
// }

exports.readComments = function(page, id, callback){
	var start = (page - 1) * commentSize;
	var sql = 'select * from comment where parentid = ' + id + ' order by create_time desc limit ' + start + ',' + commentSize;
	//console.log(sql);
	db.query(sql, function(err, result, fields){
		//console.log(result);
		result.forEach(function(re){
			re.create_time = moment(re.create_time).format('YYYY-MM-DD h:mm:ss a');
			//console.log(re.time);
		});
		callback(result);
	})
}
exports.readCommentCount = function(id, callback){
	var sql = 'select count(*) from comment where parentid = "' + id +'"';
	db.query(sql, function(err, result, fields){
		callback(result[0]['count(*)']);
	})
}

exports.readUnpagedComments = function(page, id, callback){
	var start = (page - 1) * commentSize;
	var sql = 'select * from comment where parentid = ' + id + ' order by create_time desc limit ' + start + ',' + commentSize;
	//console.log(sql);
	db.query(sql, function(err, result, fields){
		//console.log(result);
		result.forEach(function(re){
			re.create_time = moment(re.create_time).format('YYYY-MM-DD h:mm:ss a');
			//console.log(re.time);
		});
		callback(result);
	})
}

exports.readAbcxyz = function(callback){
	//console.log(sql);
	db.query('select * from abcxyz order by time desc', function(err, result, fields){
		//console.log(result);
		result.forEach(function(re){
			re.time = moment(re.time).format('YYYY-MM-DD h:mm:ss a');
			//console.log(re.time);
		});
		callback(result);
	})
}

exports.readAllArticle = function(callback){
	//console.log(sql);
	db.query('select * from article order by time desc', function(err, result, fields){
		//console.log(result);
		result.forEach(function(re){
			re.time = moment(re.time).format('YYYY-MM-DD h:mm:ss a');
			//console.log(re.time);
		});
		callback(result);
	})
}

exports.deleteArticle = function(id, callback){
	db.query('delete article.*, comment.* from article,comment where article.id=comment.parentid and article.id=?',[id], function(err, result){
		console.log(result);
		callback(result);
	})
}

exports.updateVisited = function(ip, callback){
	//"insert into web(ip) values(?) ON DUPLICATE KEY update visited=visited+1"
	db.query("insert into web(ip) values(?) ON DUPLICATE KEY update visited=visited+1",[ip], function(err, result){
		db.query("select sum(visited) from web", function(err, count){
			callback(count[0]['sum(visited)']);
		})
	})
}

exports.readVisited = function(callback){
	//"insert into web(ip) values(?) ON DUPLICATE KEY update visited=visited+1"
	db.query("select sum(visited) from web", function(err, count){
		callback(count[0]['sum(visited)']);
	})
}

exports.readAllComments = function(callback){
	//"insert into web(ip) values(?) ON DUPLICATE KEY update visited=visited+1"
	db.query("select * from comment order by create_time desc", function(err, result){
		//console.log(result);
		result.forEach(function(re){
			re.time = moment(re.time).format('YYYY-MM-DD h:mm:ss a');
			//console.log(re.time);
		});
		callback(result);
	})
}

exports.deleteComment = function(id, callback){
	//console.log('12312312');
	db.query('delete from comment where id=?',[id], function(err, result){
		//console.log(result);
		callback(result);
	})
}