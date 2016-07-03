
function ApiError( message, status, errors ){
    this.message = message;
    this.status = status;
    this.errors = errors || [];
}

ApiError.create = function( err, status ){
  if( err instanceof ApiError ){
    return err;
  } else if( Array.isArray( err ) ){
     return new ApiError( 'Multiple Errors', err.status || status, err );
  }
  return new ApiError( err.message || err, err.status || status );
}

module.exports = ApiError;
