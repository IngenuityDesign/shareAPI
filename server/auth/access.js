'use strict';

var when = require('when'),
    fs   = require('fs'),
    path = require('path');

function parse( jsonContent ) {
    try {
        var config = JSON.parse(jsonContent);
        return config;
    } catch (err) {
        console.logf('improper config');
        return defaultConfig();
    }
}

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
                fs.readFile( urlWithShare, {encoding:'utf8'}, function(err,data) {
                    resolve(parse(data));
                });
                break;
            } else {
                oldpath = url;
                url = path.dirname(url)
                console.log(url);
            }
        }
        resolve(defaultConfig());
  
    });
    
}

module.exports.getDirectoryConfig = getDirectoryConfig;