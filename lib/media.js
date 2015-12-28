'use strict';
var util = require("util")
    , events = require("events");

function Media() {
    this.util = util;
    this.events = events;
    events.EventEmitter.call(this);
}

var proto = Media.prototype;

proto.emit = function (event, data) {
    this.emit(event, data);
};

util.inherits(Media, events.EventEmitter);
module.exports = new Media();
