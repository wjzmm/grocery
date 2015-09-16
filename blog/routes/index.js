var express = require('express');
var router = express.Router();
var async = require('async');
var read = require('../web/read');
var save = require('../web/save');
var config = require('../config');

router.get('/', function(req, res) {
	var page = 1;
	read.readCount(function(count){
		read.readArticleList(page, function(artlist){
			console.log(artlist[0].time);
			read.readArticleRight(function(artinfo){
				res.render('index', {
					page: page,
					count: count == 0 ? 1 : Math.ceil(count/config.pageSize),
					articleList: artlist,
					hot: artinfo,
					tab: "article"
				})
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
	var page = 1;
	save.updateCount(id, function(err){
		read.readArticle(id, function(result){
			read.readComments(page, id, function(comments){
				console.log(comments.length);
				res.render('article',{
					article: result[0],
					comment: comments,
					first: first,
					last: last,
					page: page
				})
			})
		})
	})
	
})

router.get('/details/:id/:p', function(req, res){
	var id = parseInt(req.params.id);
	var page = parseInt(req.params.p);
	var first = false;
	var last = false;
	//console.log('details');
	save.updateCount(id, function(err){
		read.readArticle(id, function(result){
			console.log(result[0].time);
			read.readComments(page, id, function(comments){
				if (comments.length < config.commentSize) {
					last = true;
				}
				if(page == 1){
					first = true;
				}
				res.render('article',{
					article: result[0],
					comment: comments,
					first: first,
					last: last,
					page: page,
					tab: '/details/' + id +'/'
				})
			})
		})
	})
	
})

router.get('/article/:p', function(req, res){
	var page = parseInt(req.params.p);
	read.readCount(function(count){
		read.readArticleList(page, function(artlist){
			read.readArticleRight(function(artinfo){
				res.render('index', {
					page: page,
					count: count == 0 ? 1 : Math.ceil(count/config.pageSize),
					articleList: artlist,
					hot: artinfo,
					tab: "article"
				})
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
			read.readArticleRight(function(artinfo){
				res.render('index', {
					page: page,
					count: count == 0 ? 1 : Math.ceil(count/config.pageSize),
					articleList: result,
					hot: artinfo,
					tab: "classify/" + type
				})
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
			read.readArticleRight(function(artinfo){
				res.render('index', {
					page: page,
					count: count == 0 ? 1 : Math.ceil(count/config.pageSize),
					articleList: result,
					hot: artinfo,
					tab: "classify/" + type
				})
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
	var id = 0;
	read.readCommentCount(function(result){
		count = result;
		read.readComments(page, id, function(comments){
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
	var id = parseInt(req.body.id);
	//console.log(id);
	//console.log(name, con);
	var count = 0;
	save.saveComment(name, con, id, function(result){
		//console.log(result);
		read.readComments(page, id, function(comments){
			//console.log(comments);
			if(id == 0){
				res.render('comment', {
					page: page,
					comments: comments,
					tab: 'comment',
					count: count == 0 ? 1 : Math.ceil(count/config.pageSize),
				})
			}else{
				read.readArticle(id, function(result){
					var first = false;
					var last = false;
					if (comments.length < config.commentSize) {
						last = true;
					}
					if(page == 1){
						first = true;
					}
					res.render('article',{
						article: result[0],
						comment: comments,
						first: first,
						last: last,
						page: page,
						tab: '/details/' + id +'/'
					})
				})
				
			}
			
		})
	})
		//process.exit(0);
});


router.get('/search', function(req, res) {
	var page = 1;
	read.searchDbCount(req.query.keyword, function(count){
		read.searchDb(page, req.query.keyword, function(result){
			read.readArticleRight(function(artinfo){
				res.render('index', {
					page: page,
					count: count == 0 ? 1 : Math.ceil(count/config.pageSize),
					articleList: result,
					hot: artinfo,
					tab: "search/" +  req.query.keyword
				})
			})
		});
	})
	
});

router.get('/search/:keyword/:p', function(req, res) {
	var page = parseInt(req.params.p);
	var keyword = req.params.keyword;
	console.log(page, keyword);
	read.searchDbCount(keyword, function(count){
		read.searchDb(page, keyword, function(result){
			read.readArticleRight(function(artinfo){
				res.render('index', {
					page: page,
					count: count == 0 ? 1 : Math.ceil(count/config.pageSize),
					articleList: result,
					hot: artinfo,
					tab: "search/" + keyword
				})
			})
		});
	})
	
});
module.exports = router;