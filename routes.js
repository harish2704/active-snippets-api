
var controllers = {
  auth: require( 'controllers/auth'),
  users: require( 'controllers/users'),
};


function genHandler( fn, dataKey ){
  return function( req, res, next ){
    return fn( req[dataKey], req )
      .then(function( data ){
        res.sendSuccess(data);
      })
      .catch(next);
  }
}

function mountAction( app, controllerName, actionName, controller ){
  var fn = controller[actionName];
  var method, urlPath;

  actionName = actionName.match( /(get|post|put|delete|patch)(.*)/ );
  method = actionName[1];
  urlPath = '/' + controllerName +'/'+ actionName[2].toLowerCase();

  switch( method ){
    case 'get':
      app.get( urlPath, genHandler(fn, 'query' ) );
      break;
    case 'post':
      app.post( urlPath, genHandler(fn, 'body' ) );
      break;
    case 'put':
      app.put( urlPath, genHandler(fn, 'body' ) );
      break;
    case 'delete':
      app.delete( urlPath, genHandler(fn, 'query' ) );
      break;
    case 'patch':
      app.patch( urlPath, genHandler(fn, 'body' ) );
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
