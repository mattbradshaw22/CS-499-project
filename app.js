// Configures the Express application, middleware, view engine, static assets, and route mounting.
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var handlebars = require('hbs');

// define routers
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var rescueAnimalsRouter = require('./app_server/routes/rescue_animals');
var apiRouter = require('./app_api/routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));

// register handlebars partials
handlebars.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

app.set('view engine', 'hbs');
app.set('view options', { layout: 'layouts/layout' });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// serve built Angular files for the admin SPA
app.use(
  '/angular',
   express.static(
    path.join(
      __dirname,
      'app_admin',
      'dist',
      'AnimalRescue-admin',
    'browser'
    )
  )
);

// wire up routes to controllers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/rescue_animals', rescueAnimalsRouter);
app.use('/api', apiRouter);

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
