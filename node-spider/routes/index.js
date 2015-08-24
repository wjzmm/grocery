var express = require('express');
var router = express.Router();
var async = require('async');
var read = require('../web/read');
var config = require('../config');
var count = {};
router.get('/', function(req, res) {
	var page = 1;
	var job_info = [];
	read.readCount(function(result){
		count = result;
		console.log(count);
		read.readJobFairList(page, function(err, list){
			if (err) return next(err);
			//console.log(list);
			job_info = list;
			res.render('index', {
				page: page,
				job_info: job_info,
				tab: 'jobfair',
				count: Math.ceil(count.jobfairc/config.pageSize)
			})
			//process.exit(0);
		});
	});
	//console.log(count);
		
});
router.get('/jobfair', function(req, res) {

	var page = 1;
	read.readCount(function(result){
		count = result;
		read.readJobFairList(page, function(err, list){
			if (err) return next(err);
			res.locals.jobfairlist = list;
			res.render('index', {
				page: page,
				job_info: list,
				tab: 'jobfair',
				count: Math.ceil(count.jobfairc/config.pageSize)
			})
			//process.exit(0);
		});
	});
	//console.log(count);
});
router.get('/jobfair/:p', function(req, res) {
	var page = parseInt(req.params.p);
	read.readCount(function(result){
		count = result;
		read.readJobFairList(page, function(err, list){
			if (err) return next(err);
			//res.locals.jobfairlist = list;
			res.render('index', {
				page: page,
				job_info: list,
				tab: 'jobfair',
				count: Math.ceil(count.jobfairc/config.pageSize)
			})
			//process.exit(0);
		});
	});
});

router.get('/internfair', function(req, res) {
	var page = 1;
	read.readCount(function(result){
		count = result;
		read.readInternFairList(page, function(err, list){
			if (err) return next(err);
			//res.locals.jobfairlist = list;
			res.render('index', {
				page: page,
				job_info: list,
				tab: 'internfair',
				count: Math.ceil(count.internfairc/config.pageSize)
			})
		});
	});
		//process.exit(0);
});
router.get('/internfair/:p', function(req, res) {
	var page = parseInt(req.params.p);
	read.readCount(function(result){
		count = result;
		read.readInternFairList(page, function(err, list){
			if (err) return next(err);
			//res.locals.jobfairlist = list;
			res.render('index', {
				page: page,
				job_info: list,
				tab: 'internfair',
				count: Math.ceil(count.internfairc/config.pageSize)
			})
		});
	});
		//process.exit(0);
});

router.get('/job', function(req, res) {
	var page = 1;
	read.readCount(function(result){
		count = result;
		read.readJobList(page, function(err, list){
			if (err) return next(err);
			//res.locals.jobfairlist = list;
			res.render('index', {
				page: page,
				job_info: list,
				tab: 'job',
				count: Math.ceil(count.jobc/config.pageSize)
			})
		});
	});
		//process.exit(0);
});
router.get('/job/:p', function(req, res) {
	var page = parseInt(req.params.p);
	read.readCount(function(result){
		count = result;
		read.readJobList(page, function(err, list){
			if (err) return next(err);
			//res.locals.jobfairlist = list;
			res.render('index', {
				page: page,
				job_info: list,
				tab: 'job',
				count: Math.ceil(count.jobc/config.pageSize)
			})
		});
	});
		//process.exit(0);
});

router.get('/search', function(req, res) {
	//console.log(req.query.keyword);
	//var re= /select|update|delete|exec|count|’|"|=|;|>|<|%/i;
	// var re= /’|"|=|;|>|<|%/i;
	// if(re.test(req.query.keyword)){
	// 	console.log('含有转义字符');
	// }else{
	// 	console.log('success');
	// }
		//process.exit(0);
	read.searchDb(req.query.tbname, req.query.keyword, function(result){
		console.log(result.length);
		//var tab = req.query.tbname + '/' + search;
		res.render('index', {
			page: -1,
			job_info: result,
			tab: req.query.tbname,
			count: 0
		})
	});
});
module.exports = router;