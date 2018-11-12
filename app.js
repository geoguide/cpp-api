var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser'); //For parsing json put requests https://github.com/expressjs/body-parser
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
try {
// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(cors());

// Add headers
app.use(function (req, res, next) {
	//TO DO: enable security functions, slim down access control

	// Website to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods to allow
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');

	// Request headers to allow
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, APIVersion,");

	// Set to true if need the website to include cookies in the requests sent to the API (for future IE 7 integration)
	res.setHeader('Access-Control-Allow-Credentials', false);

	res.setHeader('Cache-Control', 'no-store, no-cache');

  res.setHeader('Content-Type', 'application/json');

	// Pass it on
	next();
});

app.set('x-powered-by', false);
app.set('json spaces', 2);

/*******************
       Parsers
*******************/
app.use(function(req, res, next) {
  console.info('i received something... and...');
  next();
});
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('is 404');
  res.status(404).send('error');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.error(err);
  // render the error page
  res.status(err.status || 500);
  res.render({ error: err});
});
} catch(e) {
  console.error(e);
}
module.exports = app;
