
var fs = require('fs');
var models = require( './models' );
Object.keys( models ).forEach( function(v){
  global[v] = models[v];
});
var log = console.log.bind( console, 'Log: ' );
var Promise = require('bluebird');
var request = require('request');
var log = console.log.bind(console, 'Log: ' );
sequelize.options.logging = log;
function save( a, b, c ){ log('Got'); global.uu = arguments; global.aa = a; global.bb = b;  global.cc = c; }
save();

