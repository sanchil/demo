require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { Firestore } = require('@google-cloud/firestore');
const session = require('express-session');
const { FirestoreStore } = require('@google-cloud/connect-firestore');
const lib = require('./lib');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');




var app = express();

app.use(
  session({
    store: new FirestoreStore({
      dataset: new Firestore(),
      kind: 'express-sessions',
    }),
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true,
  })
);



var cachebool = (process.env.REDIS_HOST && process.env.REDIS_PORT && process.env.CACHEONOFF&& (process.env.CACHEONOFF==1));
console.log("Cache bool is: ",cachebool);

const cache_expire = process.env.NICEAPP_CACHE_MAX_AGE ? parseInt(Number(process.env.NICEAPP_CACHE_MAX_AGE)) : 3600;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (cachebool) {
  app.use('/', lib.readRedisCache(cache_expire), indexRouter);
 } else {
  app.use('/', indexRouter);
} 

//app.use('/', indexRouter);
app.use('/users', usersRouter);

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
