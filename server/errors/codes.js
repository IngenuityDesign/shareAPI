'use strict';

var Error = require('./error.js');

var errors = {
    0:      new Error( "An unknown error has occured", "", 401 ),
    403:    new Error( "Deleting is forbidden on this system", "", 403 ),
    404:    new Error( "File or folder not found", "", 404 )
};

module.exports = {
    
    createError: function( ErrorCode ) {
        //basically this function takes the code, gets a description and all of that from built in arrays
        var error = errors[ErrorCode] || false;
        if (!error) error = error[0];
        return error;
    }
};