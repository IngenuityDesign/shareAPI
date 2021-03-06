'use strict';

'use strict';

var fs          = require('fs'),
    when        = require('when'),
    pathUtil    = require('path'),
    access      = require('../auth');

var createFileReturn = function( curFile, path, url, callback ) {
    fs.stat( url + "\\" + curFile, function(err, stats) {
        if (!err)
            callback( false, {
                path: path + "/" + curFile,
                file: curFile,
                parent: path,
                isDirectory: stats.isDirectory(),
                size: stats.size,
                created: stats.ctime,
                modified: stats.mtime
            } );
        else callback(err, false);
    });
};

var statDirectory = function( filesFound, path, url ) {
    return when.promise( function(resolve, reject, notify ) {
        var foundFiles = filesFound.length,
            current = 0,
            files = [];
        for (var x in filesFound) {
            if (filesFound[x] == ".priv") {
                priv.parse( path + filesFound[x] );
            };
            createFileReturn(filesFound[x], path, url,  function(err,data) {
                current++;
                if (!err) files.push(data);
                if (current == foundFiles) resolve( files )
            });
        }

    });
}

var readFile = function( path ) {
    return when.promise( function(resolve, reject ) {
        fs.readFile( path, function(err, data ) {
            if (err) reject(err);
            resolve(data);
        });
    });
}

module.exports = {

    fetchDirectory: function ( path ) {
        var url = "\\\\192.168.50.50\\files\\" + path;
        
        return when.promise( function(resolve, reject, notify ) {
            fs.exists(url, function(exists) {
                if (exists) {
                    fs.stat( url, function( err, stats ) {
                        if (err) reject( 404 );
                        if (stats.isDirectory()) {
                            //we're in a directory so we need to try to look for an access file.
                            
                            access.dirIsAccessibleByUser(url).then(function() {
                                //it is accessible
                                fs.readdir( url, function(err, filesFound) {
                                    if (err) return false;
                                    statDirectory( filesFound, path, url)
                                    .then(function(data) {
                                        resolve(data);
                                    })
                                });
                            }).catch(function() {
                                //it is not accessible
                                reject( 404 );
                            });
                            
                            
                        } else if (stats.isFile()) {
                            //we need to check parent
                            
                            access.fileIsAccessibleByUser(url).then(function() {
                                resolve({
                                    template: 'file',
                                    path: path,
                                    file: pathUtil.basename(path),
                                    parent: pathUtil.dirname(path),
                                    isDirectory: false,
                                    size: stats.size,
                                    created: stats.ctime,
                                    modified: stats.mtime
                                });    
                            }).otherwise(function() {
                                reject(440);
                            });
                            
                        } else {
                            //404
                            reject(404);
                        }
                    });
                } else {
                    //404
                    reject(404);
                }

            });

        });


    }
    
};