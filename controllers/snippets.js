var _ = require('lodash');
var models = require('models');
var Snippet = models.Snippet;
var paginator = require('libs/paginator');

exports.get = function( data ){

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



