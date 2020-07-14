var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http');
const bodyParser = require('body-parser');
require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
let loginRouter = require('./routes/login');
let logoutRouter = require('./routes/logout')
let sandboxRouter = require('./routes/sandbox')
let mainMenuRouter = require('./routes/mainMenu')
let moduleRouter = require('./routes/module')
let exerciseRouter = require('./routes/exercises');
let theoryRouter = require('./routes/theory');
let profileRouter = require('./routes/profile');

var session = require('express-session');
var app = express();


app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  res.locals.exTest = req.session.exTest;
  res.locals.testOverall =req.session.testOverall;
  next();
});
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mainMenuRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/sandbox', sandboxRouter);
app.use('/module', moduleRouter);
app.use('/exercise', exerciseRouter);
app.use('/theory', theoryRouter);
app.use('/profile', profileRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
