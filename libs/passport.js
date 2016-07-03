var models = require( 'models' );
var User = models.User;
var passport = require('passport');
var LocalStrategy = require('passport-local');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('config');
var Promise = require('bluebird');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser( function(id, done){
  User.findById(id).asCallback( done );
});

passport.use('local', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password,done ) {
    models.User.findOne({where:{email:email , password:password}}).
    then(function(user){
      if(!user)
        return done(null, false);
      return done(null, user);
    })
  }));



passport.use(new FacebookStrategy({
  clientID: config.fbLogin.appId,
  clientSecret: config.fbLogin.appSecret,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  return User.findOne({where: { facebook: profile.id } } )
    .then( function( existingUser ){
      if (existingUser) {
        return existingUser;
      }

      var user = User.build({
        name: profile.displayName || ( profile.name.givenName + ' ' + profile.name.familyName ),
        facebook: profile.id,
        facebookToken: accessToken,
        password: Math.random(10),
        email: profile.emails[0].value,
        username: profile.emails[0].value,
        profilePic: profile.picture || 'https://graph.facebook.com/'+profile.id+'/picture?type=large'
      });

      return user.save();
    })
    .asCallback( done );
  }
));
