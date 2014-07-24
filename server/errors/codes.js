'use strict';

var Error = require('./error.js');

var errors = {
    404: new Error( "File or folder not found", "", 404 )
};

module.exports = {
    
    
    
    
    createError: function( ErrorCode ) {
        //basically this function takes the code, gets a description and all of that from built in arrays
        var error = errors[ErrorCode] || false;
        if (!error) error = error[0];
        console.log(error);
        return error;
    }
};