var ApiError = require('libs/ApiError');
var Promise = require('bluebird');



exports.monkeyPatch = function( app ){

  app.response.sendSuccess = function( data, message ){
    var out = {
      success: true,
    },
    res = this;

    if( data.constructor.name == 'String' ){
      out.message = data;
      out.data = {};
    } else {
      out.message = message || 'Success';
      out.data = data;
    }

    if( data.$redirect ){
      return this.format({
        html: function(){
          return res.redirect( data.$redirect );
        },

        json: function(){
          return res.json( out );
        }
      });
    }
    return this.json( out );

  };



  app.response.sendError = function( err ){
    err = ApiError.create( err )
    this.status( err.status || 400 );
    this.json({
      success: false,
      message: err.message,
      data:{},
      errors: err.errors,
    });
  };

}

exports.reject = function( message, status ){
  return Promise.reject( new ApiError( message, status ));
}
