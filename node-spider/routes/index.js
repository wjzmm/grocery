var express = require('express');
var router = express.Router();
var async = require('async');
var read = require('../web/read');
var config = require('../config');
router.get('/', function(req, res) {
	// console.log('1');
	// console.log(req.params.p);
	var page = 1;
	var count = {};
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
				tab: 'jobfair'
			})
			//process.exit(0);
		});
	})
	
	

});
router.get('/jobfair', function(req, res) {

	var page = 1;
	read.readJobFairList(page, function(err, list){
		if (err) return next(err);
		res.locals.jobfairlist = list;
		res.render('index', {
			page: page,
			job_info: list,
			tab: 'jobfair'
		})
		//process.exit(0);
	});
});
router.get('/jobfair/:p', function(req, res) {
	var page = parseInt(req.params.p);
	read.readJobFairList(page, function(err, list){
		if (err) return next(err);
		res.locals.jobfairlist = list;
		res.render('index', {
			page: page,
			job_info: list,
			tab: 'jobfair'
		})
		//process.exit(0);
	});
});

router.get('/internfair', function(req, res) {
	var page = 1;
	read.readInternFairList(page, function(err, list){
		if (err) return next(err);
		res.locals.jobfairlist = list;
		res.render('index', {
			page: page,
			job_info: list,
			tab: 'internfair'
		})
	});
		//process.exit(0);
});
router.get('/internfair/:p', function(req, res) {
	var page = parseInt(req.params.p);
	read.readInternFairList(page, function(err, list){
		if (err) return next(err);
		res.locals.jobfairlist = list;
		res.render('index', {
			page: page,
			job_info: list,
			tab: 'internfair'
		})
	});
		//process.exit(0);
});

router.get('/job', function(req, res) {
	var page = 1;
	read.readJobList(page, function(err, list){
		if (err) return next(err);
		res.locals.jobfairlist = list;
		res.render('index', {
			page: page,
			job_info: list,
			tab: 'job'
		})
	});
		//process.exit(0);
});
router.get('/job/:p', function(req, res) {
	var page = parseInt(req.params.p);
	read.readJobList(page, function(err, list){
		if (err) return next(err);
		res.locals.jobfairlist = list;
		res.render('index', {
			page: page,
			job_info: list,
			tab: 'job'
		})
	});
		//process.exit(0);
});
module.exports = router;