'use strict';

var express = require('express'),
    fileServer  = require('./util.js');

var Server = function() {

    var app = express();
    var Responder = function(res) {

        this.JSend = function( data, header ) {

            if (!header) header = 200;
            var dataBody = JSON.stringify(data);

            res.set({
                'Content-Type': 'application/json',
                'Content-Length': dataBody.length
            });

            res.status( header );

            res.end( dataBody );
        }

        return this;

    }

    var Base = function( path ) {
        return '/api/v1/files' + path;
    }

    app.get(Base('/*'), function(req,res) {
        var path = req.params[0] || false;
        var server = fileServer(req,res);

        var TheResponse = new Responder( res );

        if (path) {
            server.processFilepath( path ).then(function(data) {
                TheResponse.JSend(data);
            }).catch(function(err) {
                server.errors.processError(err, function(data) {
                    TheResponse.JSend(data.data, data.headers);
                });
            });
        } else {
            TheResponse.JSend(server.errors.malformedURL());
        }
    });

    app.post(Base('/*'), function(req,res) {

        var path = req.params[0] || false;
        var server = fileServer(req,res);

        /*
         * Should have been sent some info in the post body
         * 
         */


    });

    app.delete(Base('/*'), function(req,res) {

        var path = req.params[0] || false;
        var server = fileServer(req,res);

        var TheResponse = new Responder( res );

        /*
         * Path is all we need here. Not even sure if this will be implemented so let's just make it forbidden
         * 
         */

        server.errors.processError(403, function(data) {
            TheResponse.JSend(data.data, data.headers); 
        });

    });

    app.listen(8080, '192.168.50.142');

}

module.exports = Server;