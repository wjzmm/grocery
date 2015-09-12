var async = require('async'),
	db = require('../config').db,
	pageSize = require('../config').pageSize,
	moment = require('moment');

/*
*搜索
* tbname: 表名， keywords：搜索关键字， stype：搜索类型
*/
exports.searchDb = function(tbname, keywords, stype, callback){
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
			var searchSql = "select * from " + tbname + " where " + stype + " like '%" + keywords + "%'";
			console.log(searchSql);
			db.query(searchSql, function(err, result, fields){
				console.log('serach');
				done(result);
			});
		},
	], function(result){
		result.forEach(function(item){
			item.time = moment(item.time).format('YYYY-MM-DD');
			//console.log(item.time);
		});
		callback(result);
	});
	// var searchSql = "select * from " + tbname + " where title like '%" + keywords + "%'";
	// console.log(searchSql);
	// db.query(searchSql, function(err, result, fields){
	// 	//console.log('serach');
	// 	callback(result);
	// });
}

/*
*读取招聘会信息
* page: 当前页面
*/
exports.readJobFairList = function(page, callback){

	var start = (page - 1) * pageSize;
	//var sql = 'select * from jobfair where time >= DATE_SUB(NOW(), INTERVAL 3 MONTH) order by time desc';
	var sql = 'select * from jobfair where time >= DATE_SUB(NOW(), INTERVAL 3 MONTH) order by time desc limit ' + start + ',' + pageSize;
	//console.log(sql);
	db.query(sql, function(err, result, fields){
		//取三个月之内的数据
		result.forEach(function(item){
			item.time = moment(item.time).format('YYYY-MM-DD h:mm:ss');
			//console.log(item.time);
		});
		callback(null, result);
	});

}

/*
*读取详细内容
* id: 招聘信息id，tb：表名
*/
exports.readDetails = function(id, tb, callback){


	var sql = 'select * from ' + tb +' where id=' + id;
	console.log(sql);
	db.query(sql, function(err, result, fields){
		//取三个月之内的数据
		// result.forEach(function(item){
		// 	item.time = moment(item.time).format('YYYY-MM-DD h:mm:ss');
		// 	//console.log(item.time);
		// });
		callback(null, result);
	});

}

/*
*读取记录数
*/
exports.readCount = function(callback){
	async.series({
	jobfairc:function(done){

		var sql_jf = 'select count(*) from jobfair';
		db.query(sql_jf, function(err, result, fields){
			//count.jobfairCount = result[0]['count(*)'];
			done(err, result[0]['count(*)']);
		});
		
	},
	internfairc:function(done){
		var sql_if = 'select count(*) from internfair';
		db.query(sql_if, function(err, result, fields){
			done(err, result[0]['count(*)']);
		});
	},
	jobc:function(done){
		var sql_job = 'select count(*) from job';
		db.query(sql_job, function(err, result, fields){
			done(err, result[0]['count(*)']);
		});
	},
	comment:function(done){
		var sql_job = 'select count(*) from comment';
		db.query(sql_job, function(err, result, fields){
			done(err, result[0]['count(*)']);
		});
	},
	searchwords:function(done){
		var sear_sql = "select * from search_info order by keywordv desc limit 0,10";
		db.query(sear_sql, function(err, result, fields){
			done(err, result);
		});
	}
	}, function(err, result){
		//console.log("message");
		//console.log(result);
		callback(result);
		//process.exit(0);
	});
}

/*
*读取实习招聘信息
* page: 当前页数
*/
exports.readInternFairList = function(page, callback){
	var start = (page - 1) * pageSize;
	var sql = 'select * from internfair where time >= DATE_SUB(NOW(), INTERVAL 3 MONTH) order by time desc limit ' + start + ',' + pageSize;
	db.query(sql, function(err, result, fields){

		result.forEach(function(item){
			item.time = moment(item.time).format('YYYY-MM-DD h:mm:ss');
			//console.log(item.time);
		});
		callback(null, result);
	});

}

/*
*读取招聘信息
* page:当前页数
*/
exports.readJobList = function(page, callback){
	var start = (page - 1) * pageSize;
	var sql = 'select * from job where time >= DATE_SUB(NOW(), INTERVAL 3 MONTH) order by time desc limit ' + start + ',' + pageSize;
	//db.query('select * from job order by time desc', function(err, result, fields){
	db.query(sql, function(err, result, fields){
	result.forEach(function(item){
		item.time = moment(item.time).format('YYYY-MM-DD');
		//console.log(item.time);
		});
	callback(null, result);
	});
}

/**
test

*/
exports.test = function(callback){

	db.query('select * from job order by id desc', function(err, result, fields){

		result.forEach(function(re){
			re.time = moment(re.time).format('YYYY-MM-DD');
			//console.log(re.time);
		});
		callback(null, result);
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