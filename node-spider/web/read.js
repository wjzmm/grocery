var async = require('async'),
	db = require('../config').db,
	moment = require('moment');

exports.readJobFairList = function(callback){

	db.query('select * from jobfair order by time desc', function(err, result, fields){

		result.forEach(function(item){
			item.time = moment(item.time).format('YYYY-MM-DD h:mm:ss');
			//console.log(item.time);
		});
		callback(null, result);
	});

}

exports.readInternFairList = function(callback){

	db.query('select * from internfair order by time desc', function(err, result, fields){

		result.forEach(function(item){
			item.time = moment(item.time).format('YYYY-MM-DD h:mm:ss');
			//console.log(item.time);
		});
		callback(null, result);
	});

}

exports.readJobList = function(callback){

	db.query('select * from job order by time desc', function(err, result, fields){
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