'use strict';

var Error = function( description, help, headers ) {

    var data = {
        description:    description || null,
        help:           help || null,
        headers:        headers || null
    }

    this.getHelpLink = function() {
        return data.help;   
    }

    this.getDescription = function() {
        return data.description;   
    }

    this.getHeaders = function() {
        return data.headers;   
    }

    return this;

}

module.exports = Error;