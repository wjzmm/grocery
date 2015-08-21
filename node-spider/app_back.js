var path = require('path'),
	async = require('async'),
	express = require('express'),
	read = require('./web/read'),
	config = require('./config');

var app = express();

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(app.router);
	app.use('/public', express.static(path.join(__dirname, 'public')));
});

module.exports = app;
app.get('/', function(req, res, next){
	async.series([
		function(done){
			read.readJobFairList(function(err, list){
				if (err) return next(err);
				res.locals.jobfairlist = list;
				done();
			});
		},
		function(done){
			read.readInternFairList(function(err, list){
				if (err) return next(err);
				res.locals.readInternFairList = list;
				done();
			});
		},
		function(done){
			read.readJobList(function(err, list){
				if (err) return next(err);
				//console.log(list);
				res.locals.JobList = list;
				done();
			});
		},
		function(done){
			res.render('index')
			done();
		}			
	], function(err){
		if (err) console.log(err);

		console.log('finish');
		//process.exit(0);
	});
	
});

app.listen(config.port);

var spawn = require('child_process').spawn;
var cronJob = require('cron').CronJob;

var job = new cronJob(config.autoUpdate, function(){
	console.log("定时任务开始执行");
	var update = spawn(process.execPath, [path.resolve(__dirname, 'update/all.js')]);
	update.stdout.pipe(process.stdout);
	update.stderr.pipe(process.stderr);
	update.on('close', function(code){
		console.log("更新任务结束，代码 = %d", code);
	});
});
job.start();

process.on('uncaughtException', function(err){
	console.error('uncaughtException: s%', err.stack);
});

