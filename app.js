/*var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bookRouter = require('./routes/book');
const organizersRoutes = require('./routes/organizers');
var eventsRouter = require('./routes/events'); 
mongoose.connect('mongodb+srv://lamichhaneanuja24:hZ4Pj4wlSAZPXsJr@cluster0.s9hl4f0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('connected'))
.catch((err) => console.log('error connecting', err))
var app= express()


var app = express();
app.use(express.static(path.join(__dirname, 'public')));//new

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/organizers', organizersRoutes);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/book', bookRouter);
app.use('/events', eventsRouter);

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

module.exports = app;*/
// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// const mongoose = require('mongoose');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var bookRouter = require('./routes/book');
// const organizersRoutes = require('./routes/organizers');
// var eventsRouter = require('./routes/events'); 
// const authRouter = require('./routes/auth'); // Authentication routes

// var app = express();

// // Connect to MongoDB
// // mongoose.connect('mongodb://localhost:27017/techsathi', {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true
// // })
// mongoose.connect('mongodb+srv://lamichhaneanuja24:hZ4Pj4wlSAZPXsJr@cluster0.s9hl4f0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('MongoDB connected');
// }).catch(err => {
//   console.error('MongoDB connection error:', err);
// });

// app.use(express.static(path.join(__dirname, 'public')));

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// // Session middleware setup (important: before routers)
// app.use(session({
//   secret: 'hZ4Pj4wlSAZPXsJr', // Use a strong secret in production
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({ 
//     mongoUrl: 'mongodb+srv://lamichhaneanuja24:hZ4Pj4wlSAZPXsJr@cluster0.s9hl4f0.mongodb.net/techsathi?retryWrites=true&w=majority&appName=Cluster0' 
//   }),
//   cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
// }));

// // Use routers
// app.use('/', authRouter);          // Auth routes (login/signup/logout)
// app.use('/organizers', organizersRoutes);
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/book', bookRouter);
// app.use('/events', eventsRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bookRouter = require('./routes/book');
const organizersRoutes = require('./routes/organizers');
var eventsRouter = require('./routes/events'); 

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Session middleware setup (important: before routers)
app.use(session({
  secret: 'hZ4Pj4wlSAZPXsJr', // Use a strong secret in production
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// Use demo auth router instead of real auth
const demoAuthRouter = require('./routes/demoAuth');
app.use('/', demoAuthRouter);

app.use('/organizers', organizersRoutes);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/book', bookRouter);
app.use('/events', eventsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
