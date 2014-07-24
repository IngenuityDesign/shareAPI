'use strict';

var util = require('util');

console.logf=function( args ) {
    var string = util.format.apply(null, arguments);
    console.log(string);
};