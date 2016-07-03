
var User = require('models').User;
var _ = require('lodash');
var assert = require('assert');
var Promise = require('bluebird');
var getSessionId = require('libs/api-session').getSessionId;

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
  var token = data.token;

  return User.findOne({where:{ token: token}})
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
        sessionId: getSessionId( req.sessionId )
      };
    });
};


