var express = require('express');//加载express模块
var path = require('path');//路径模块
var favicon = require('serve-favicon');//请求网页的logo
var logger = require('morgan');//控制台中，显示req请求的信息
var cookieParser = require('cookie-parser');//这就是一个解析cookie的工具，通过req.cookies可以取到传过来的cookie，并把它们转成对象
var bodyParser = require('body-parser');//node.js中间件 用于处理json、Raw、Text、Url编码数据

// 路由信息（接口地址），存放在routes的根目录
var index = require('./routes/index');
var  persons= require('./routes/person');
var app = express();

// view engine setup模板开始
// app.set('views', path.join(__dirname, 'views'));//设置视图根目录
// app.set('view engine', 'html');//设置视图格式
//注释掉默认的，自己手动修改默认引擎
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//载入中间件
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//载入静态文件

//配置路由，（'自定义路径'，上面设置的接口地址）
app.use('/', index);
app.use('/persons',persons );

// catch 404 and forward to error handler404错误处理
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler错误处理
app.use(function(err, req, res, next) {
  // set locals, only providing error in development只提供开发中出现的错误
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page页面渲染错误
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
