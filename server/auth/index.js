'use strict';

var access = require('./access.js'),
    when    = require('when'),
    pathUtil    = require('path');


function checkit(url) {
    console.log(url);
    return access.getDirectoryConfig(url);
}

module.exports = {
    dirIsAccessibleByUser: function(url) {
        return checkit(url);
    },
    fileIsAccessibleByUser: function(url) {
        url = pathUtil.dirname(url);
        return checkit(url);
    }
}