var Paginator = require('generic-paginate');

var options = {
    activeClass: 'active',
    inactiveClass: '',
    defaults: {
        size: 20,        // Result per page
        listLength: 3,   // Length pagination Result.
    }
};

 var paginator = Paginator( options );

 module.exports = function( count, page, limit ){
   return paginator.paginate({
     count: count,
     page: page,
     size: limit
   });
 }
