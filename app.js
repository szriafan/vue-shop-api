// Imports
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan')
var bodyParser = require('body-parser');

// Database connection
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_BASE + '/tutorial').then(
  () => { console.log('mongodb connect successfully') },
  err => { console.log(err)}
);

// Setup an express app
var app = express();

// router
var index = require('./routes/index');
const api = require('./routes/api/index');

// CORS config
app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configure middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/v1', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
