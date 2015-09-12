var config = require('../config'),
	xjtu_job = require('./xjtu_job'),
	xdtu_job = require('./xdtu_job'),
	nwpu_job = require('./nwpu_job'),
	save = require('./save'),
	async = require('async');

var jobFairList = [],
	internFairList = [],
	jobList = [];

/*
*调用爬虫，存储数据
*async异步处理
*/
async.series([
	function(done){
		xjtu_job.jobFairList(config.xjtu_job_url.url, function(err, list){
			jobFairList = list;
			//console.log('jobFairList');
			done(err);
		});
	},
	function(done){
		save.saveJobFair(jobFairList, done);
	},
	function(done){
		xjtu_job.internFairList(config.xjtu_job_url.url, function(err, list){
			internFairList = list;
			//console.log('internFairList');
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
	},
	function(done){
		xdtu_job.jobList(config.xd_opt.url, function(err, list){
			jobList = list;
			//console.log(jobList);
			done(err);
		});
	},
	function(done){
		//console.log(jobList);
		save.saveJob(jobList, done);
	},function(done){
		nwpu_job.job(config.urls, function(err, job_list, job_intern){
			console.log('save nwpu_job');
			jobList = job_list;
			console.log(jobList);
			internFairList = job_intern;
			done(err);
		});
	},function(done){
		//console.log(jobList);
		
		save.saveJob(jobList, done);
		//save.saveInternFair(internFairList, done);
	},
	// function(done){
	// 	//console.log(jobList);
	// 	//save.saveJob(jobList, done);
	// 	//console.log(internFairList);
	// 	save.saveInternFair(internFairList, done);
	// },
	], function(err){
		if (err) console.log(err);
		console.log("all done");
		process.exit(0);
});

