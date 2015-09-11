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
				count: Math.ceil(count/config.pageSize),
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
router.get('/article/:id', function(req, res){
	var id = req.params.id
	read.readArticle(id, function(result){
		console.log(result);
		res.render('article',{
			article: result[0]
		})
	})
})

router.get('/classify', function(req, res){
	var page = 1;
	var type = req.params.type;
	read.readClassify(type, function(result){
		res.render('index', {
			page: page,
			count: Math.ceil(count/config.pageSize),
			articleList: result,
			tab: "article"
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

module.exports = router;