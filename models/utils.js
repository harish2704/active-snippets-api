
"use strict";

var _ = require( "lodash" );

function ModelDef ( name, props, opts ) {
  this.name = name;
  this.props = props;
  this.classMethods = opts.classMethods;
  this.instanceMethods = opts.instanceMethods;
  this.opts = opts;
}
exports.ModelDef = ModelDef;

ModelDef.prototype.defineModel = function( sequelize ) {
  return sequelize.define( this.name, this.props, this.opts );
};


function extend( baseModelDef, modelDef ) {

  var props = _.defaults( modelDef.props, baseModelDef.props );
  var instanceMethods = _.defaults( modelDef.instanceMethods, baseModelDef.instanceMethods );
  var classMethods = _.defaults( modelDef.classMethods, baseModelDef.classMethods );
  var opts = _.defaults( modelDef.opts, baseModelDef.opts );

  opts.classMethods = classMethods;
  opts.instanceMethods = instanceMethods;

  return new ModelDef( modelDef.name, props, opts );

}

exports.extend = extend;

