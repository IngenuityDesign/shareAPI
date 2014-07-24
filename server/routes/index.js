'use strict';

var fileServer  = require('../util.js'),
    Responder   = require('../util/response.js');

var Router = function(ctx) {
    
    return {
        getFile: function(req,res) {

            var path = req.params[0] || false;
            ctx.emit('request', {path: path});
            
            /*
             * Boot up the file server!
             * 
             */

            var TheResponse = new Responder( res );

            if (path) {
                fileServer.processFilepath( path ).then(function(data) {
                    TheResponse.JSend(data); //send a JSON response
                }).catch(function(err) {
                    fileServer.errors.processError(err, function(data) {
                        TheResponse.JSend(data.data, data.headers);
                    });
                });
            } else {
                TheResponse.JSend(fileServer.errors.malformedURL());
            }
        },
        postFile: function(req,res) {

            var path = req.params[0] || false;

            /*
             * Should have been sent some info in the post body
             * 
             */


        },
        deleteFile: function(req,res) {

            var path = req.params[0] || false;

            var TheResponse = new Responder( res );

            /*
             * Path is all we need here. Not even sure if this will be implemented so let's just make it forbidden
             * 
             */

            fileServer.errors.processError(403, function(data) {
                TheResponse.JSend(data.data, data.headers); 
            });

        },
        
    }
};

module.exports = Router;