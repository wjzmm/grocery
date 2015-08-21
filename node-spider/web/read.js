var async = require('async'),
	db = require('../config').db,
	pageSize = require('../config').pageSize,
	moment = require('moment');

exports.readJobFairList = function(page, callback){
	var start = (page - 1) * pageSize;
	var end = page * pageSize;
	//var sql = 'select * from jobfair where time >= DATE_SUB(NOW(), INTERVAL 3 MONTH) order by time desc';
	var sql = 'select * from jobfair where time >= DATE_SUB(NOW(), INTERVAL 3 MONTH) order by time desc limit ' + start + ',' + end;
	console.log(sql);
	db.query(sql, function(err, result, fields){
		//取三个月之内的数据
		result.forEach(function(item){
			item.time = moment(item.time).format('YYYY-MM-DD h:mm:ss');
			//console.log(item.time);
		});
		callback(null, result);
	});

}

exports.readInternFairList = function(page, callback){
	var start = (page - 1) * pageSize;
	var end = page * pageSize;
	var sql = 'select * from internfair where time >= DATE_SUB(NOW(), INTERVAL 3 MONTH) order by time desc limit ' + start + ',' + end;
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
	var end = page * pageSize;
	var sql = 'select * from job where time >= DATE_SUB(NOW(), INTERVAL 3 MONTH) order by time desc limit ' + start + ',' + end;
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