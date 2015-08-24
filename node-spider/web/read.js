var async = require('async'),
	db = require('../config').db,
	pageSize = require('../config').pageSize,
	moment = require('moment');


exports.searchDb = function(tbname, keywords, callback){
	var searchSql = "select * from " + tbname + " where title like '%" + keywords + "%'";
	console.log(searchSql);
	db.query(searchSql, function(err, result, fields){
		//console.log('serach');
		callback(result);
	});
}
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
	}}, function(err, result){
		//console.log("message");
		//console.log(result);
		callback(result);
		//process.exit(0);
	});
}


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