'use strict';

var when = require('when'),
    fs   = require('fs'),
    path = require('path');

function defaultConfig() {
    return {
           
    };
}

function getDirectoryConfig(url) {
    return when.promise(function(resolve,reject,notify) {
        //we need to take this URL and iterate through it to find the latest share config. Otherwise, we use the default
        var urlWithShare = url + path.sep + "share.json",
            oldpath = "";
        while (url.length > 1 && oldpath != url) {
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
                url = path.dirname(url)
            }
        }
        resolve(defaultConfig());
  
    });
    
}

module.exports.getDirectoryConfig = getDirectoryConfig;