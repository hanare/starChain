var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mempool = require('./helper/mempool');
var Mempool = new mempool.Mempool();


var requestValidation = require('./routes/requestValidation');
var message_signature = require('./routes/message_signature');
var blockroute = require('./routes/block');
var stars = require('./routes/stars');

var BlockChain = require('./helper/BlockChain');


var app = express();
app.locals.mempool = Mempool;
app.locals.test = "testing local";
app.locals.bchain = new BlockChain.Blockchain();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));


app.use('/requestValidation', requestValidation);
app.use('/message-signature', message_signature);
app.use('/block', blockroute);
app.use('/stars', stars);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
