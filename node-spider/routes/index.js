var express = require('express');
var router = express.Router();
var async = require('async');
var read = require('../web/read');
var config = require('../config');
router.get('/', function(req, res) {
	var page = req.query.p ? parseInt(req.query.p) : 1;
	async.series([
		function(done){
			read.readJobFairList(page, function(err, list){
				if (err) return next(err);
				res.locals.jobfairlist = list;
				done();
			});
		},
		function(done){
			read.readInternFairList(page, function(err, list){
				if (err) return next(err);
				res.locals.readInternFairList = list;
				done();
			});
		},
		function(done){
			read.readJobList(page, function(err, list){
				if (err) return next(err);
				//console.log(list);
				res.locals.JobList = list;
				done();
			});
		},
		function(done){
			res.render('index',{
				page: page,
			})
			done();
		}			
	], function(err){
		if (err) console.log(err);

		console.log('finish');
		//process.exit(0);
	});
});


module.exports = router;