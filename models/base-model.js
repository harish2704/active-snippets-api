var Sequelize = require( "sequelize" );
var modelUtils = require( "./utils" );
var ModelDef = modelUtils.ModelDef;


var BaseModel = new ModelDef(
  "BaseModel",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      unique: true,
      allowNull: false,
      primaryKey: true
    }
  },
  {
    /* Base Class methods for all data models */
    classMethods: {

    },

    /* Base instanceMethods for Facebook Item */
    instanceMethods: {
    }
  }
);

module.exports = BaseModel;


