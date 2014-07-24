'use strict';

var Server = require('./Server');

var ShareServer = Server();

ShareServer.on('request', function(data) {
   console.log(data); 
});