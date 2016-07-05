var _ = require('lodash');
var models = require('models');
var Snippet = models.Snippet;
var paginator = require('libs/paginator');
var isLoggedIn = require('libs/auth').isLoggedIn;
var _t = require( 'libs/api-utils').transormMiddlewares;
var assert = require('assert');

exports.list = function( data ){

  var page = parseInt( data.page ) || 1;
  var limit = 20;
  var offset = (page - 1) * limit;
  var conditions = _.pick( data, 'syntax', 'UserId' );

  return Snippet.scope('index').findAndCountAll({
    where: conditions,
    offset: offset,
    limit: limit,
  })
  .then(function( result ){
    return {
      items: result.rows,
      pagination: paginator( result.count, page, limit ),
    };
  });
};


exports.create = _t( [
  isLoggedIn,
  function( data ){
    return Snippet.create( data );
  }
] );

exports.update = _t( [
  isLoggedIn,
  function( data, req ){
    assert( data.id, 'invalid id' );
    data = _.pick( data, 'template', 'scheme' );
    return Snippet.findById( data.id )
      .then(function(snippet){
        assert( snippet.UserId === req.user.id, 'Access denied' );
        _.extend( snippet, data );
        return snippet.save();
      })
  }
] );
