var express = require('express'),
    app     = express(),
    fileServer  = require('./server');

var APIPath = function( path ) {
    return '/api/v1/files' + path;
}

app.get(APIPath('/*'), function(req,res) {
    var path = req.params[0] || false;
    
    var server = fileServer(req,res);
    
    var send = function( data, header ) {
        if (!header) header = 200;
        var dataBody = JSON.stringify(data);
        
        res.set({
            'Content-Type': 'application/json',
            'Content-Length': dataBody.length
        });
        
        res.status( header );
        
        res.end( dataBody );
    }
    
    if (path) {
        server.processFilepath( path ).then(function(data) {
            send(data);
        }).catch(function(err) {
            server.errors.processError(err, function(data) {
                send(data.data, data.headers);
            });
        });
    } else server.errors.malformedURL();
});

app.listen(8080, '192.168.50.142');