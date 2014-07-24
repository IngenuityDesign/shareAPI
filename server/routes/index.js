'use strict';

module.exports = {
    getFile: function(req,res) {
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
    },
    postFile: function(req,res) {

        var path = req.params[0] || false;
        var server = fileServer(req,res);

        /*
         * Should have been sent some info in the post body
         * 
         */


    },
    deleteFile: function(req,res) {

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

    }
}