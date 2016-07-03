var baseModelDef = require( './base-model' );
var mailUtils = require('libs/mail-utils');
var modelUtils = require( './utils' );
var ModelDef = modelUtils.ModelDef;
var Sequelize = require( 'sequelize' );
var crypto = require('crypto');

var Model = new ModelDef(
  'User',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    emailToken: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    isSelfVerified: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isAdminVerified: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    getterMethods:{

    },
    setterMethods:{
      password: function( password ){
        this.setDataValue( 'password', this.Model.hashPassword(password) );
      }
    },
    hooks:{

    },
    classMethods:{
      associate: function(  ) {
      },

      hashPassword: function( password ){
        var salt = crypto.randomBytes(8).toString('base64');
        var Hash = crypto.createHmac('sha512', salt );
        Hash.update( password );
        return salt + '$' + Hash.digest( 'base64' );
      },

      verifyPassword: function( hash, password ){
        hash = hash.split('$');
        var salt = hash[0];
        var digest = hash[1];
        var Hash = crypto.createHmac('sha512', salt );
        Hash.update( password );
        return Hash.digest('base64') === digest;
      },

      sendRegistrationMail: function( user ){
        mailUtils.sendRegistrationMail( user );
      },

    },
    instanceMethods:{
      verifyPassword: function( password ){
        return this.Model.verifyPassword( this.password, password );
      },

    }
  }
);


module.exports = modelUtils.extend( baseModelDef, Model );


