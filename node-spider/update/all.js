var config = require('../config'),
	xjtu_job = require('./xjtu_job'),
	save = require('./save'),
	async = require('async');

var jobFairList = [],
	internFairList = [],
	jobList = [];

async.series([
	function(done){
		xjtu_job.jobFairList(config.xjtu_job_url.url, function(err, list){
			jobFairList = list;
			console.log('jobFairList');
			done(err);
		});
	},
	function(done){
		save.saveJobFair(jobFairList, done);
	},
	function(done){
		xjtu_job.internFairList(config.xjtu_job_url.url, function(err, list){
			internFairList = list;
			console.log('internFairList');
			done(err);
		});
	},
	function(done){
		save.saveInternFair(internFairList, done);
	},
	function(done){
		xjtu_job.jobList(config.xjtu_job_url.url, function(err, list){
			jobList = list;
			//console.log(jobList);
			done(err);
		});
	},
	function(done){
		//console.log(jobList);
		save.saveJob(jobList, done);
	}
	], function(err){
		if (err) console.log(err);
		console.log("all done");
		process.exit(0);
});

