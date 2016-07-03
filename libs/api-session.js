
var signature = require('cookie-signature');
var config = require( '../config' );

function ApiSession( cookieName, secret ){
  this.cookieName = cookieName;
  this.secret = secret;
  this.handleSessionId = this.handleSessionId.bind( this );
  this.getSessionId = this.getSessionId.bind( this );
}



ApiSession.prototype.handleSessionId = function( req, res, next ){

  var sessionId = req.headers['x-sessionid'] || req.query.sessionid,
    cookieName = this.cookieName,
    parts,
    sessionIdPart;
  var cookieStr = req.headers.cookie;
  if( !sessionId ){
    /* This Api server is not going to consider any 'cookie' header sent by the client */
    delete req.headers.cookie;
    return next();
  }

  sessionId = new Buffer( sessionId, 'base64').toString();
  sessionIdPart  =  cookieName + '=' + encodeURIComponent( 's:' + sessionId );

  sessionId = new Buffer( sessionId, 'base64').toString();

  if( cookieStr ){
    // Overwrite session id
    parts = cookieStr.split('; ');
    var keys = parts.map( function(v){ return v.slice(0, cookieName.length + 2 ); });
    var pos = keys.indexOf( cookieName + '=s' );
    if( pos == -1 ){
      parts.push( sessionIdPart );
    } else {
      parts[pos] = sessionIdPart;
    }
  } else {
    parts = [ sessionIdPart ];
  }
  req.headers.cookie = parts.join('; ');
  next();
};


ApiSession.prototype.getSessionId = function( sessionId ){
  var signedCookie = signature.sign( sessionId, this.secret );
  return new Buffer(signedCookie).toString('base64');
}


module.exports = new ApiSession( config.cookieName, config.cookieSecret );
