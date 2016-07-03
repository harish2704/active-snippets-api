/* global describe, it */

require('simple-mocha');
var models = require('models');
var User = models.User;
var authCtrl = require('controllers/auth');
var _ = require('lodash');
var assert = require('assert');


describe( 'Auth controller', function(){

  describe('should register a new user', function(  ){

    var testData = {
      email: 'testuser@test.com',
      password: 'secret',
      name: 'Test User'
    };

    it( 'should save new user', function( done ){

      return authCtrl.postRegister( testData )
      .then(function( result ){
        assert( result );
        var testData = _.pick( result, 'name', 'email', 'username' );
        var expectedData = _.omit( testData, 'password' );
        expectedData.username = testData.email;

        assert.deepEqual( testData, expectedData );

        return User.findById( result.id );
      })
      .then(function( user ){
        assert( user );
      })
      .asCallback(done);
    });

    it('should send verification Email', function(){
      var globalMailBox = global._mailBox;
      assert( globalMailBox );
      var userMailBox = globalMailBox[testData.email];
      assert( userMailBox && userMailBox.length );
      var mail = userMailBox[0];
      assert( mail.html );

      var emailToken = mail.html.match(/href=\".*emailToken=(.*)\">Verification Link<\/a>/);
      assert( emailToken && emailToken[1] )

    })

  })
})
