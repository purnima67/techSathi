var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
const organizersRoutes = require('./routes/organizers');
const adminRouter = require('./routes/admin');
var eventsRouter = require('./routes/events'); 
const authRouter = require('./routes/auth');
const session = require('express-session');

var app = express();
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/auth', authRouter);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); 


app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});


app.use('/organizers', organizersRoutes);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/events', eventsRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
