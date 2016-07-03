
var controllers = {
  auth: require( 'controllers/auth'),
};

function mountAction( app, controllerName, actionName, controller ){
  var fn = controller[actionName];
  var method, urlPath;

  actionName = actionName.match( /(get|post|put|delete|patch)(.*)/ );
  method = actionName[1];
  urlPath = actionName[2];
  app[method]( urlPath, fn );
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
