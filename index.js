'use strict';

var Server = require('./Server');

require('./log.js');

var ShareServer = Server();
ShareServer.listen(8080, '192.168.50.142');

//this share server listens only locally, at least for now, until OAuth is implemented
//it is meant to be run on a local computer. If you want a web interface 

var oldlog = console.log;

ShareServer.on('request', function(data) {
    if (data.path) {
        console.logf("Path requested: %s", data.path );   
    }
});