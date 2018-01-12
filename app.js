var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var asset = require('./routes/asset');
var api = require('./routes/api');

var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', express.static(path.resolve(__dirname, 'views')));
app.use('/resource', express.static(path.resolve(__dirname, 'public')));

// my custom router
app.use('/asset', asset);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    message : err.message,
    status : err.status || 500
  });
});

/*
schedule.scheduleJob('* * * * * *', function(){
  https.get('https://api.coinnest.co.kr/api/pub/ticker?coin=ink', (res) => {
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });
});
*/

module.exports = app;