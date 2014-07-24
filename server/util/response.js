'use strict';

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

module.exports = Responder;