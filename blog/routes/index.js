var express = require('express');
var router = express.Router();
var async = require('async');
var read = require('../web/read');
var save = require('../web/save');
var config = require('../config');

router.get('/', function(req, res) {
	var page = 1;
	read.readCount(function(count){
		read.readArticleList(page, function(result){
			console.log(count);
			res.render('index', {
				page: page,
				count: count == 0 ? 1 : Math.ceil(count/config.pageSize),
				articleList: result,
				tab: "article"
			})
		})
	})
		
});
router.get('/deliver', function(req, res){
	res.render('deliver',{

	})
})
router.get('/details/:id', function(req, res){
	var id = parseInt(req.params.id);
	read.readArticle(id, function(result){
		console.log(result);
		res.render('article',{
			article: result[0]
		})
	})
})

router.get('/article/:p', function(req, res){
	var page = parseInt(req.params.p);
	read.readCount(function(count){
		read.readArticleList(page, function(result){
			console.log(count);
			res.render('index', {
				page: page,
				count: count == 0 ? 1 : Math.ceil(count/config.pageSize),
				articleList: result,
				tab: "article"
			})
		})
	})
})


router.get('/classify/:type', function(req, res){
	var page = 1;
	var type = req.params.type;
	console.log(type);
	read.readClassifyCount(type, function(count){
		read.readClassify(page, type, function(result){
			res.render('index', {
				page: page,
				count: count == 0 ? 1 : Math.ceil(count/config.pageSize),
				articleList: result,
				tab: "classify/" + type
			})
		})
	})
})

router.get('/classify/:type/:p', function(req, res){
	var page = parseInt(req.params.p);
	var type = req.params.type;
	console.log(type);
	read.readClassifyCount(type, function(count){
		read.readClassify(page, type, function(result){
			res.render('index', {
				page: page,
				count: count == 0 ? 1 : Math.ceil(count/config.pageSize),
				articleList: result,
				tab: "classify/" + type
			})
		})
	})
})


router.post('/deliver', function(req, res) {
	var title = req.body.title;
	var author = req.body.author;
	var content = req.body.content;
	var selector = req.body.selectorh;
	var summary = req.body.summaryh;
	console.log(title, author, content, selector, summary);
	save.saveArticle(title, author, content, selector, summary, function(err){
		res.render('deliver', {

		})
	})
		
});

router.get('/comment', function(req, res){
	var page = 1;
	read.readCommentCount(function(result){
		count = result;
		read.readAllComments(page, function(comments){
			console.log(comments);
			res.render('comment', {
				page: page,
				comments: comments,
				tab: 'comment',
				count: count == 0 ? 1 : Math.ceil(count/config.pageSize),
			})
		})
	})
})

router.get('/aboutme', function(req, res){
	res.render('aboutme',{

	})
})
router.get('/abcxyz', function(req, res){
	res.render('abcxyz',{
		
	})
})

router.get('/comment/:p', function(req, res){
	var page = parseInt(req.params.p);
	read.readCount(function(result){
		count = result;
		read.readAllComments(page, function(comments){
			console.log(comments);
			res.render('comment', {
				page: page,
				comments: comments,
				tab: 'comment',
				count: count == 0 ? 1 : Math.ceil(count/config.pageSize),
			})
		})
	})
})
router.post('/comment', function(req, res) {
	var page = 1;
	var name = req.body.nickname;
	var con = req.body.con;
	//console.log(name, con);
	read.saveComment(name, con, function(result){
		//console.log(result);
		read.readAllComments(page, function(comments){
			console.log(comments);
			res.render('comment', {
				page: page,
				comments: comments,
				tab: 'comment',
				count: count == 0 ? 1 : Math.ceil(count/config.pageSize),
			})
		})
	})
		//process.exit(0);
});
module.exports = router;