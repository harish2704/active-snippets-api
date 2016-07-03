
exports.isLoggedIn = function( req, res, next ){
  if( req.user ){ return next() }
  return res.sendError( 'Not logged in', 401 );
}


exports.isAdmin = function( req, res, next ){
  if( req.session.admin ){ return next(); }
  return res.sendError( 'Access Denied', 403 );
}

