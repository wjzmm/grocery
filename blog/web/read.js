var async = require('async'),
	db = require('../config').db,
	pageSize = require('../config').pageSize,
	moment = require('moment');


exports.searchDb = function(tbname, keywords, callback){
	async.series([
		function(done){
			console.log('save');
			var querySql = "insert into search_info(keyword) values('" + keywords +"') ON DUPLICATE KEY update keywordv=keywordv+1"
			db.query(querySql, function(err, result, fields){
				console.log(querySql);
				done();
			});
		},
		function(done){
			var searchSql = "select * from " + tbname + " where title like '%" + keywords + "%'";
			console.log(searchSql);
			db.query(searchSql, function(err, result, fields){
				console.log('serach');
				done(result);
			});
		},
	], function(result){
		console.log('result');
		callback(result);
	});
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

exports.readClassify = function(type, callback){
	console.log(type);
	var sql = "select * from article where type = '" + type +"';"
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



