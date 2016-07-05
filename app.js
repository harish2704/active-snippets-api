
require('./env-setup');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ApiError = require('libs/ApiError');
var session = require('express-session');
var passport = require('passport');
var SessionStore = require('connect-session-sequelize')(session.Store);
var routes = require('routes');
var logger = require('morgan');
var apiUtils = require('libs/api-utils');
var apiSession = require('libs/api-session');
var models = require('models');
var config = require( 'config' );

var sessionStore = new SessionStore({db: models.sequelize, table: 'Session' });
var app = express();
require('libs/passport');

apiUtils.monkeyPatch( app );
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-sessionid, Authorization, Content-Type');
  if( req.method === 'OPTIONS' ){ return res.sendStatus(200); }
  next();
})
app.use(logger('dev'));
app.use(bodyParser.json({limit: '1mb'} ));
app.use( apiSession.handleSessionId );
app.use(cookieParser());
app.use(session({
	key: config.cookieName,
	secret: config.cookieSecret,
	store: sessionStore,
	resave: true,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

routes( app );

app.use(function(req, res, next) {
  next( ApiError.create('Not found', 404 ));
});


app.use(function(err, req, res, next) {
  console.log( err );
  res.sendError( err );
});


module.exports = app;
