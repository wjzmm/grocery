var path = require('path'),
	async = require('async'),
	express = require('express'),
	routes = require('./routes/index.js'),
  bodyParser = require('body-parser'),
  http = require('http'),
  logger = require('morgan'),
  path = require('path'),
	config = require('./config');

var app = express();


app.set('port', process.env.PORT || config.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/*
*路由分发
*/

app.use('/', routes);
app.use('/jobfair', routes);
app.use('/internfair', routes);
app.use('/job', routes);
app.use('/details', routes);
app.use('/abcxyz', routes);
app.use('/comment', routes);
app.use('/aboutus', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

http.createServer(app).listen(app.get('port'),function(){
	console.log('express server listening on port: ' + app.get('port'));

})

module.exports = app;



/*
*定时任务，执行爬虫
*/
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

