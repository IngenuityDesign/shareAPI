'use strict';

var share = require('./share'),
    errors = require('./errors');


module.exports = function(req,res) {
    
    //we have the request object and all of that good stuff 
    
    return {
        processFilepath: share.processFilePath,
        errors: errors
    }
    
};