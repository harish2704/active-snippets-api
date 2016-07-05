
var controllers = {
  auth: require( 'controllers/auth'),
  users: require( 'controllers/users'),
  snippets: require( 'controllers/snippets'),
};


var methodAliases = {
  list: 'get',
  create: 'post',
  update: 'put',
};
[ 'get', 'post', 'put', 'delete', 'patch'].forEach(function(v){ methodAliases[v] = v; });

/* /(list|create|update|get|post|put|delete|patch)(.*)/ */
var actionNameRegex =  new RegExp('(' + Object.keys( methodAliases ).join('|') + ')(.*)' );

function genHandler( fn, dataKey ){
  return function( req, res, next ){
    return fn( req[dataKey], req, res )
      .then(function( data ){
        res.sendSuccess(data);
      })
      .catch(next);
  }
}
function parseFnName( actionName, controllerName ){
  var action = actionName.match( actionNameRegex );
  var method = action[1];
  var urlPath = '/' + controllerName +'/'+ action[2].toLowerCase();
  return {
    method: methodAliases[method],
    url: urlPath,
    name: actionName,
  }
}

function mountAction( app, controllerName, actionName, controller ){
  var fn = controller[actionName];
  var action = parseFnName( actionName, controllerName );

  switch( action.method ){
    case 'get':
      app.get( action.url, genHandler(fn, 'query' ) );
      break;
    case 'post':
      app.post( action.url, genHandler(fn, 'body' ) );
      break;
    case 'put':
      app.put( action.url, genHandler(fn, 'body' ) );
      break;
    case 'delete':
      app.delete( action.url, genHandler(fn, 'query' ) );
      break;
    case 'patch':
      app.patch( action.url, genHandler(fn, 'body' ) );
      break;
  }
}


function mountController( controllers, controllerName, app ){
  var controller = controllers[controllerName];
  Object.keys( controller ).forEach( function( actionName ){
    mountAction( app, controllerName, actionName, controller );
  });
}

module.exports = function( app ){
  Object.keys( controllers ).forEach( function( controllerName ){
    mountController( controllers, controllerName, app );
  });
};
