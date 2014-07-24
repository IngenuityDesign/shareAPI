'use strict';

var share = require('./share'),
    errors = require('./errors');


module.exports =  {
    processFilepath: share.processFilePath,
    errors: errors
};