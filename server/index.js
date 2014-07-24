'use strict';

var express = require('express'),
    session = require('cookie-session'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    EventEmitter = require('events').EventEmitter;;

var Server = function() {

    var app         = express(),
        routes      = require('./routes')(this);
    
    
    this.emitter = new EventEmitter();
    
    app.use(session({
        keys: ['key1', 'key2'],
        secureProxy: false // if you do SSL outside of node
    }));
    app.use(compression());
    
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    app.use(bodyParser.json())
    
                         
    var Base = function( path ) {
        return '/api/v1/files' + path;
    }
        
    app.get(Base('/*'), routes.getFile);
    app.post(Base('/*'), routes.postFile);
    app.delete(Base('/*'), routes.deleteFile);
    
    this.listen = function(port,ip) {
        if (ip)
            app.listen(port,ip);
        else app.listen(port);
    }
    
    this.on = this.emitter.addListener;
    this.emit = this.emitter.emit;
    
    //emitter.emit( 'event', args );
    
    return this;
    
}

module.exports = function() {
    return new Server();
};