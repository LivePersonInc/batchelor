/*jslint node: true */
'use strict';
var util        = require("util")
    , events    = require("events");

(function () {
    function Media () {
        this.util   = util;
        this.events = events;
        events.EventEmitter.call(this);
    }

    var proto = Media.prototype;

    proto.emit = function (event, data) {
        this.emit(event, data);
    };

    util.inherits(Media, events.EventEmitter);
    module.exports = new Media();
})();


//var stream = new MyStream();
//
//console.log(stream instanceof events.EventEmitter); // true
//console.log(MyStream.super_ === events.EventEmitter); // true
//
//stream.on("data", function(data) {
//    console.log('Received data: "' + data + '"');
//})
//stream.write("It works!"); // Received data: "It works!"