var modelUtils = require( './utils' );
var ModelDef = modelUtils.ModelDef;
var Sequelize = require( 'sequelize' );

var Model = new ModelDef(
  'Session',
  {
    sid: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    data: {
      type: Sequelize.TEXT,
    },
    expires: Sequelize.DATE
  },
  {
    getterMethods:{

    },
    setterMethods:{
    },
    hooks:{
      beforeCreate: function( user ){ user.updateUserId(); },
      beforeSave: function( user ){ user.updateUserId(); },
      beforeUpdate: function( user ){ user.updateUserId(); },
    },
    classMethods:{
      associate: function( models ) {
        this.belongsTo( models.User )
      },
    },
    instanceMethods:{
      updateUserId: function(){
        try{
          var data = JSON.parse( this.data );
          if( data && data.passport ){
            this.UserId = data.passport.user||null;
          }
        }catch( err ){

        }
      }
    }
  }
);


module.exports = Model;


