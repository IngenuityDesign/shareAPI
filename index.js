'use strict';

var Server = require('./Server');

var ShareServer = Server();
ShareServer.listen(8080, '192.168.50.142');

ShareServer.on('request', function(data) {
    console.log(data); 
});