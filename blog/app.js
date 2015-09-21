var path = require('path'),
	async = require('async'),
	express = require('express'),
	routes = require('./routes/index.js'),
  bodyParser = require('body-parser'),
  http = require('http'),
  logger = require('morgan'),
	config = require('./config');

var app = express();
var ueditor = require("ueditor");

app.set('port', process.env.PORT || config.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function(req, res, next) {
    // ueditor 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;
        
        var imgname = req.ueditor.filename;

        var img_url = '/images/ueditor/' ;
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/images/ueditor/';
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        // console.log('config.json')
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));


app.use('/', routes);
app.use('/deliver', routes);
app.use('/article', routes);
app.use('/classify', routes);
app.use('/comment', routes);
app.use('/aboutme', routes);
app.use('/abcxyz', routes);
app.use('/file', routes);
app.use('/edit', routes);
app.use('/delete', routes);
app.use('/manager', routes);
app.use('/login', routes);
app.use('/test', routes);


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
