var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('express-async-errors');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/stylesheets",express.static(path.join(__dirname, 'stylesheets')));
app.use("/javascripts",express.static(path.join(__dirname, 'javascripts')));
app.use("/images",express.static(path.join(__dirname, 'images')));


app.use('/', indexRouter);
app.use('/admin/', require('./routes/admin/index'));
app.use('/admin/film', require('./routes/admin/film'));
app.use('/admin/account', require('./routes/admin/account'));
app.use('/admin/report', require('./routes/admin/report'));
app.use('/admin/showtime', require('./routes/admin/showtime'));
app.use('/admin/theater', require('./routes/admin/theater'));

// catch 404 and forward to error handler
app.use(function(req, res) {
  //next(createError(404));
  res.render('404');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
