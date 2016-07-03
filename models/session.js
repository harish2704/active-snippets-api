var baseModelDef = require( './base-model' );
var modelUtils = require( './utils' );
var ModelDef = modelUtils.ModelDef;
var Sequelize = require( 'sequelize' );

var Model = new ModelDef(
  'Session',
  {
    sid: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    data: {
      type: Sequelize.TEXT,
    },
  },
  {
    getterMethods:{

    },
    setterMethods:{
    },
    hooks:{

    },
    classMethods:{
      associate: function( models ) {
        this.belongsTo( models.User )
      },
    },
    instanceMethods:{
    }
  }
);


module.exports = modelUtils.extend( baseModelDef, Model );


