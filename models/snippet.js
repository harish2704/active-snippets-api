var baseModelDef = require( './base-model' );
var mailUtils = require('libs/mail-utils');
var modelUtils = require( './utils' );
var ModelDef = modelUtils.ModelDef;
var Sequelize = require( 'sequelize' );
var crypto = require('crypto');
var supportedLangs = [
  'apache_conf',
  'assembly_x86',
  'batchfile',
  'c_cpp',
  'css',
  'diff',
  'gitignore',
  'golang',
  'html',
  'ini',
  'java',
  'javascript',
  'json',
  'jsx',
  'less',
  'markdown',
  'mysql',
  'objectivec',
  'perl',
  'php',
  'plain_text',
  'python',
  'ruby',
  'sass',
  'scss',
  'sh',
  'sql',
  'xml',
  'yaml'
];

var Model = new ModelDef(
  'Snippet',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    template: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    schema: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    syntax:{
      type: Sequelize.ENUM( supportedLangs ),
      defaultValue:'plain_text',
    }
  },
  {
    getterMethods:{ },
    setterMethods:{ },
    hooks:{ },
    classMethods:{
      associate: function( models ) {
        this.belongsTo( models.User );
      },
    },
    instanceMethods:{ }
  }
);


module.exports = modelUtils.extend( baseModelDef, Model );


