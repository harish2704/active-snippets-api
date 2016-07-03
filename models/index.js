var EventEmitter = require("events").EventEmitter;
var Sequelize    = require("sequelize");
var fs = require( 'fs' );
var path = require('path');
var config       = require( "../config" );
var dbConfig = config.db;



var db = {};
var sequelize = new Sequelize( dbConfig.database, dbConfig.username, dbConfig.password, dbConfig );


var excludeFileList = [
  'index.js',
  'base-model.js',
  'utils.js'
];

var modelFiles = fs.readdirSync( __dirname ).filter( function( v ){
  return excludeFileList.indexOf( v ) === -1;
})
.map( function(v){ return path.join( __dirname, v); })

/* For nice representation of Sequelize models during console.log messages */
Sequelize.Instance.prototype.inspect = Sequelize.Instance.prototype.toJSON;

modelFiles.forEach(function( file ) {
  var modelDef = require( file );
  var model = sequelize.define( modelDef.name, modelDef.props, modelDef.opts );
  db[ model.name ] = model;
});

Object.keys( db ).forEach(function( modelName ) {
  if ("associate" in db[ modelName ] ) {
    db[ modelName ].associate( db );
  }
  db[ modelName ].emitter = new EventEmitter();
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
