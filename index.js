var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');

app.use(session({
  secret: 'zaver loves the environment',
  resave: true,
  saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: false }));

// connect mongoDB
mongoose.connect('mongodb://localhost:27017/zaver-webapp');
var db = mongoose.connection;

// mongodb Error
db.on('error', console.error.bind(console, 'connection error:'));

var routes = require('./routes/index');
app.use('/', routes);


app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    version: "1.0.0"

  });
});

// sets port 8080 to default or unless otherwise specified in the environment
app.set('port', process.env.PORT || 8080);


app.listen(app.get('port'));
