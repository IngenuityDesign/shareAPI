'use strict';

var access = require('./access.js'),
    when    = require('when'),
    pathUtil    = require('path');


function checkit(url) {
    return when.promise(function(resolve,reject) {
        access.getDirectoryConfig(url).then(function(config) {
            //this is file data so we need to parse it
            try {
                config = JSON.parse(config);
            } catch (err) {
                reject(err);   
            }
            
            var accessConfig = config.access,
                defaultAccess = 'deny', //should be set to only deny or allow
                userAccess = false; 

            for (var x in accessConfig) {
                if (x == "*") defaultAccess = accessConfig[x];
                else {
                    //this is the user
                    if (x == "webmakersteve") {
                        userAccess = accessConfig[x];   //deny, allow, admin are the options here
                    }
                }
            }

            //now we check the variables
            var currentUserAccess = 'deny';

            if (userAccess) currentUserAccess = userAccess;
            else currentUserAccess = defaultAccess;

            switch (currentUserAccess) {
                case 'deny':
                    return reject(currentUserAccess);
                case 'allow':
                case 'admin':
                    return resolve(currentUserAccess);
            } 
        });
    });
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