var express = require('express');
var router = express.Router();
var async = require('async');
var read = require('../web/read');
var save = require('../web/save');
var config = require('../config');
var user = require('../config').user;
var func = require('../web/func');

var visit_count = 0;
router.get('/', function(req, res) {
	var ip = func.getClientIp(req);
	var page = 1;
	//config.visited ++;
	read.readCount(function(count){
		read.readArticleList(page, function(artlist){
			console.log(artlist[0].time);
			read.readArticleRight(function(artinfo){
				read.updateVisited(ip, function(visited){
					req.session.visited = visited;
					res.render('articles', {
						page: page,
						count: count == 0 ? 1 : Math.ceil(count/config.pageSize),
						articleList: artlist,
						hot: artinfo,
						tab: "article",
						visited: req.session.visited
					})
				})
			})
		})
	})	
});
router.get('/deliver', function(req, res){
	read.readVisited(function(visited){
		req.session.visited = visited;
		res.render('deliver',{
			visited: req.session.visited
		})
	})
})
router.get('/details/:id', function(req, res){
	var id = parseInt(req.params.id);
	var page = 1;
	save.updateCount(id, function(err){
		read.readArticle(id, function(result){
			read.readComments(page, id, function(comments){
				console.log(comments.length);
				res.render('details',{
					article: result[0],
					comment: comments,
					first: first,
					last: last,
					page: page,
					visited: req.session.visited
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
	console.log(req.session.visited);
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
				res.render('details',{
					article: result[0],
					comments: comments,
					first: first,
					last: last,
					page: page,
					tab: '/details/' + id +'/',
					total: comments.length,
					count: Math.ceil(comments.length/config.commentSize),
					visited: req.session.visited
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
				res.render('articles', {
					page: page,
					count: count == 0 ? 1 : Math.ceil(count/config.pageSize),
					articleList: artlist,
					hot: artinfo,
					tab: "article",
					visited: req.session.visited
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
				res.render('articles', {
					page: page,
					count: count == 0 ? 1 : Math.ceil(count/config.pageSize),
					articleList: result,
					hot: artinfo,
					tab: "classify/" + type,
					visited: req.session.visited
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
				res.render('articles', {
					page: page,
					count: count == 0 ? 1 : Math.ceil(count/config.pageSize),
					articleList: result,
					hot: artinfo,
					tab: "classify/" + type,
					visited: req.session.visited
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
	var artid = parseInt(req.body.artid);
	console.log(artid);
	
	if(selector == '心情广播'){
		console.log(selector);
		save.saveAbcxyz(content, function(err){
			read.readAbcxyz(function(result){
				read.readVisited(function(visited){
					req.session.visited = visited;
					res.render('abcxyz',{
						abcxyz: result,
						visited: req.session.visited
					})
				})
		})
		})
	}else{
		//console.log(title, author, content, selector, summary);
		if(artid == 0){
			save.saveArticle(title, author, content, selector, summary, function(err){
				res.render('route', {

				})
			})
		}else{
			save.updateArticle(artid, title, author, content, selector, summary, function(err){
				res.render('route', {

				})
			})
		}
		
	}
	
		
});

router.get('/comment', function(req, res){
	var page = 1;
	var id = 0;
	read.readCommentCount(id, function(result){
		count = result;
		console.log(count);
		read.readComments(page, id, function(comments){
			console.log(comments[0].email);
			res.render('comment', {
				page: page,
				comments: comments,
				tab: 'comment',
				count: count == 0 ? 1 : Math.ceil(count/config.commentSize),
				total: count,
				visited: req.session.visited
			})
		})
	})
})

router.get('/aboutme', function(req, res){
	res.render('aboutme',{
		visited: req.session.visited
	})
})
router.get('/abcxyz', function(req, res){
	read.readAbcxyz(function(result){
		res.render('abcxyz',{
			abcxyz: result,
			visited: req.session.visited
		})
	})
	
})

router.get('/comment/:p', function(req, res){
	var page = parseInt(req.params.p);
	var id = 0;
	read.readCommentCount(id, function(result){
		count = result;
		read.readComments(page, id, function(comments){

			console.log(comments[0].email);
			res.render('comment', {
				page: page,
				comments: comments,
				tab: 'comment',
				count: count == 0 ? 1 : Math.ceil(count/config.commentSize),
				total: count,
				visited: req.session.visited
			})
		})
	})
})

router.post('/comment', function(req, res) {
	var page = 1;
	var name = req.body.nickname;
	var con = req.body.con;
	var email = req.body.email;
	var id = parseInt(req.body.id);
	//console.log(id);
	//console.log(name, con);
	var count = 0;
	save.saveComment(name, con, id, email, function(result){
		//console.log(result);
		read.readComments(page, id, function(comments){
			//console.log(comments);
			if(id == 0){
				read.readCommentCount(id, function(result){
					read.readVisited(function(visited){
						req.session.visited = visited;
						count = result;
						console.log(count);
						res.render('comment', {
							page: page,
							comments: comments,
							tab: 'comment',
							count: count == 0 ? 1 : Math.ceil(count/config.pageSize),
							total: count,
							visited: req.session.visited
						});
					});
				});
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
					read.readVisited(function(visited){
						req.session.visited = visited;
						res.render('details',{
							article: result[0],
							comments: comments,
							first: first,
							last: last,
							page: page,
							tab: '/details/' + id +'/',
							total: comments.length,
							count: Math.ceil(comments.length/config.commentSize),
							visited: req.session.visited
						})
					});
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
				res.render('articles', {
					page: page,
					count: count == 0 ? 1 : Math.ceil(count/config.pageSize),
					articleList: result,
					hot: artinfo,
					tab: "search/" +  req.query.keyword,
					visited: req.session.visited
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
				res.render('articles', {
					page: page,
					count: count == 0 ? 1 : Math.ceil(count/config.pageSize),
					articleList: result,
					hot: artinfo,
					tab: "search/" + keyword,
					visited: req.session.visited
				})
			})
		});
	})
	
});

router.get('/file', function(req, res) {
	read.readAllArticle(function(result){
		res.render('file',{
			articles: result,
			total: result.length,
			visited: req.session.visited
		})
	})
});

router.get('/delete', function(req, res) {
	read.readAllArticle(function(result){
		res.render('manafer',{
			articles: result,
			total: result.length,
			visited: req.session.visited
		})
	})
});

router.get('/delete/:id', function(req, res) {
	var id = parseInt(req.params.id);
	read.deleteArticle(id, function(result){
		read.readAllArticle(function(result){
			res.render('manager',{
				articles: result,
				total: result.length,
				visited: req.session.visited
			})
		})
	})
	
});
router.get('/manager', function(req, res) {
	read.readAllArticle(function(result){
		res.render('manager',{
			articles: result,
			total: result.length,
			visited: req.session.visited
		})
	})
});

router.get('/edit/:id', function(req, res) {
	var id = parseInt(req.params.id);

	read.readArticle(id, function(result){
		console.log(result);
		res.render('edit',{
			article: result[0],
			visited: req.session.visited
		})
	})
});

router.get('/login', function(req, res) {
	res.render('login',{
		info: ""
	})
});

router.post('/login', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	console.log(username, password);
	if((username == user.username) && (password == user.password)){
		read.readAllArticle(function(result){
			read.readVisited(function(visited){
				req.session.visited = visited;
				res.render('manager',{
					articles: result,
					total: result.length,
					visited: req.session.visited
				})
			});
		})
	}else{
		res.render('login',{
			info: "用户名或者密码错误，请重新输入"
		});
	}

	
});
router.get('/test', function(req, res) {
	res.render('index',{
		info: req
	})
});

module.exports = router;


