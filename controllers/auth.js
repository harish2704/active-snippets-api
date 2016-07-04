
var User = require('models').User;
var _ = require('lodash');
var assert = require('assert');
var Promise = require('bluebird');
var getSessionId = require('libs/api-session').getSessionId;
var crypto = require('crypto');
var isLoggedIn = require('libs/auth').isLoggedIn;
var _t = require( 'libs/api-utils').transormMiddlewares;

exports.postRegister = function( data ){
  var userData = _.pick( data, 'name', 'email', 'password' );
  var callbackUrl = data.callbackUrl;

  userData.username = userData.email;
  userData.emailToken = crypto.randomBytes(32).toString('hex');
  return User.create( userData )
    .tap(function( user ){
      return User.sendRegistrationMail( user, callbackUrl );
    });
};


exports.getVerify = function( data, req ){
  var token = data.emailToken;

  return User.findOne({where:{ emailToken: token}})
    .then(function(user){
      assert( user, 'Invalid verification token' );
      user.emailToken = null;
      user.isSelfVerified = true;
      return user.save();
    })
    .tap(function( user ){
      return Promise.fromCallback(function(cb){ req.logIn( user, cb ); })
    })
    .then(function( user ){
      return{
        user: user,
        sessionId: getSessionId( req.sessionID )
      };
    });
};


exports.getProfile = _t([
  isLoggedIn,
  function( data, req ){
    return Promise.resolve( req.user );
  }
]);



exports.getLogout = function(data, req){
  req.logOut();
  return Promise.resolve({});
};


exports.postLogin = function(data, req ){
  return User.findOne({where:{ username: data.username}})
    .tap(function(user){
      assert( user, 'Invalid username' );
      assert( user.verifyPassword(data.password), 'Invalid password' );
      return Promise.fromCallback(function(cb){ req.logIn(user, cb) } );
    })
    .then(function( user ){
      return{
        user: user,
        sessionId: getSessionId( req.sessionID )
      };
    });
};



exports.patchProfile = function(data, req ){
  var data = _.pick( data, 'name' );
  var user = req.user;
  _.extend( user, data );
  return user.save();
};


