'use strict';

var codes = require('./codes.js');

module.exports = {
    
   processError: function(err, callback) {
       
       var currentCode = codes.createError(err);
       
       if (callback) callback({
           data: {
               code:                err,
               help:                currentCode.getHelpLink(),
               description:         currentCode.getDescription()
           },
           headers: currentCode.getHeaders() //rest api so it has specific headers
       });
       
   }
    
}