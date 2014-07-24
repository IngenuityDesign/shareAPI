'use strict';

var when = require('when'),
    fs   = require('fs'),
    path = require('path');

function defaultConfig() {
    return {
           
    };
}

//this needs to get cached. It's a huge waste of time;

function getDirectoryConfig(url) {
    return when.promise(function(resolve,reject,notify) {
        //we need to take this URL and iterate through it to find the latest share config. Otherwise, we use the default
        var oldpath = "",
            urlWithShare = url + path.sep + "share.json";
        
        do {
            if (fs.existsSync(urlWithShare)) {
                //make sure it stops
                oldpath = url;
                fs.readFile( urlWithShare, {encoding:'utf8'}, function(err,data) {
                    if (!err)
                        resolve(data);
                    else reject(err);
                });
                return; //get out of here
            } else {
                oldpath = url;
                url = path.dirname(url);
                urlWithShare = url + path.sep + "share.json";
            }
        } while (url.length > 1 && oldpath != url);
        
        resolve(defaultConfig());
  
    });
    
}

module.exports.getDirectoryConfig = getDirectoryConfig;