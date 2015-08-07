var async = require('async'),
	db = require('../config').db;

exports.readJobFairList = function(callback){

	db.query('select * from jobfair order by id desc', callback);

}

exports.readInternFairList = function(callback){

	db.query('select * from internfair order by id desc', callback);

}

exports.readJobList = function(callback){

	db.query('select * from job order by id desc', callback);

}