var async = require('async'),
	db = require('../config').db,
	debug = require('debug')('node-spider: update: save');

/**
*	保存招聘宣讲会信息
*/

exports.saveJobFair = function(list, callback) {
	debug('保存招聘宣讲会信息');
	//console.log('saveJobFair');
	async.eachSeries(list, function(item, next) {
		db.query("select * from jobfair where title=? ", [item.title], function(err, data){
			if (err) return next(err);
			
			if (Array.isArray(data) && data.length >=1 ) {
				db.query("update jobfair set scantime = ? where title = ?", [item.scantime, item.title] , next);
			} else {
				db.query("insert into jobfair(title, address, time, deadline, status, url, school, type, scantime) values (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
						[item.title, item.address, item.time, item.deadline, item.status, item.url,
						item.school, item.type, item.scantime], next);
				// db.query("insert into jobfair('title', 'address', 'time', 'deadline', 'status', 'url', 'school', 'type') values (?, ?, ?, ?, ?, ?, ?, ?)", 
				// 		[item.id, item.title, item.address, item.time, item.deadline, item.status, item.url,
				// 		item.school, item.type], next);
			}
		});
	}, callback);
};

/**
*	保存实习生宣讲会信息
*/

exports.saveInternFair = function(list, callback) {
	debug('保存实习生宣讲会信息');
	console.log('saveInternFair');
	//console.log(list);
	async.eachSeries(list, function(item, next) {
		db.query("select * from internfair where title = ?", [item.title], function(err, data){
			if (err) return next(err);
			//console.log(data);
			if (Array.isArray(data) && data.length >=1 ) {
				db.query("update internfair set scantime = ? where title = ?", [item.scantime, item.title] , next);
			} else {
				// db.query("insert into internfair('title', 'address', 'time', 'deadline', 'status', 'url', 'school', 'type') values (?, ?, ?, ?, ?, ?, ?, ?)", 
				// 		[item.id, item.title, item.address, item.time, item.deadline, item.status, item.url,
				// 		item.school, item.type], next);
				db.query("insert into internfair(title, address, time, deadline, status, url, school, type, scantime) values (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
						[item.title, item.address, item.time, item.deadline, item.status, item.url,
						item.school, item.type, item.scantime], next);
			}
		});
	}, callback);
};

/**
*	保存招聘信息
*/

exports.saveJob = function(list, callback) {
	debug('保存招聘信息');
	console.log('saveJob');
	//console.log('savejob------------>',list);
	async.eachSeries(list, function(item, next) {
		console.log('savejob------------>');
		//console.log('savejob------------------------------------------->',item);
		db.query("select * from job where title = ?", [item.title], function(err, data){
			if (err) return next(err);
			if (Array.isArray(data) && data.length >=1 ) {
				db.query("update job set scantime = ? where title = ?", [item.scantime, item.title] , next);	
			} else {
				console.log(item.title);
				db.query("insert into job(title, time, status, url, school, type, scantime, content) values (?, ?, ?, ?, ?, ?, ?, ?)", 
						[item.title, item.time, item.status, item.url, item.school, item.type, item.scantime, item.arcContent], next);
			}
		})
	}, callback);
};