var async = require('async'),
	db = require('../config').db,
	pageSize = require('../config').pageSize,
	moment = require('moment');


exports.searchDb = function(keywords, callback){
	var searchSql = "select * from article where title like '%" + keywords + "%' or content like '%" + keywords + "%'";
	db.query(searchSql, function(err, result, fields){
		callback(result);
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


exports.readArticleList = function(page, callback){
	var start = (page -1) * pageSize;
	db.query("select * from article limit ?, ?", [start, pageSize], function(err, result){
		if (err) console.log(err);
		result.forEach(function(item){
			item.time = moment(item.time).format('YYYY-MM-DD h:mm:ss');
			//console.log(item.time);
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
	console.log(sql);
	db.query(sql, function(err, result){
		if (err) console.log(err);
		result.forEach(function(item){
			item.time = moment(item.time).format('YYYY-MM-DD h:mm:ss');
			//console.log(item.time);
		});
		callback(result);
	})
}
exports.readArticle = function(id, callback){
	db.query("select * from article where id = ?", [id], function(err, result){
		if (err) console.log(err);
		// console.log(result);
		result.time = moment(result.time).format('YYYY-MM-DD h:mm:ss');	
		callback(result);
	})
}

exports.readCount = function(callback){
	db.query("select count(*) from article", function(err, result){
		callback(result[0]['count(*)']);
	})
	// async.series({
	// article:function(done){

	// 	var sql= 'select count(*) from article';
	// 	db.query(sql, function(err, result, fields){
	// 		//count.jobfairCount = result[0]['count(*)'];
	// 		done(err, result[0]['count(*)']);
	// 	});
		
	// },
	// internfairc:function(done){
	// 	var sql_if = 'select count(*) from internfair';
	// 	db.query(sql_if, function(err, result, fields){
	// 		done(err, result[0]['count(*)']);
	// 	});
	// },
	// jobc:function(done){
	// 	var sql_job = 'select count(*) from job';
	// 	db.query(sql_job, function(err, result, fields){
	// 		done(err, result[0]['count(*)']);
	// 	});
	// },
	// searchwords:function(done){
	// 	var sear_sql = "select * from search_info order by keywordv desc limit 0,10";
	// 	db.query(sear_sql, function(err, result, fields){
	// 		done(err, result);
	// 	});
	// }
	// }, function(err, result){
	// 	//console.log("message");
	// 	//console.log(result);
	// 	callback(result);
	// 	//process.exit(0);
	// });
}



/*
*读取所有评论
* page：当前页数
*/
exports.readAllComments = function(page, callback){
	var start = (page - 1) * pageSize;
	var sql = 'select * from comment order by create_time desc limit ' + start + ',' + pageSize;
	db.query(sql, function(err, result, fields){
		result.forEach(function(re){
			re.create_time = moment(re.create_time).format('YYYY-MM-DD h:mm:ss a');
			//console.log(re.time);
		});
		callback(result);
	})
}
exports.readCommentCount = function(callback){
	var sql = 'select count(*) from comment';
	db.query(sql, function(err, result, fields){
		callback(result[0]['count(*)']);
	})
}