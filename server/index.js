'use strict';

var express = require('express'),
    fileServer  = require('./util.js'),
    routes      = require('./routes'),
    events      = require('./events'),
    session = require('cookie-session'),
    compression = require('compression'),
    bodyParser = require('body-parser');

var Server = function() {

    app = express();
    app.use(session({
        keys: ['key1', 'key2'],
        secureProxy: false // if you do SSL outside of node
    }));
    app.use(compression());
    
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    app.use(bodyParser.json())
    
    
    var Hooks = events.classy; //this creates an events hooker for classes
    this.on = Hooks.on; //this passes the on so it can be accessed through the class
                         
    var Base = function( path ) {
        return '/api/v1/files' + path;
    }
    
    app.get(Base('/*'), routes.getFile);
    app.post(Base('/*'), routes.postFile);
    app.delete(Base('/*'), routes.deleteFile);

    this.listen = app.listen;
    
    return this;
    
}

module.exports = function() {
    return new Server();
};