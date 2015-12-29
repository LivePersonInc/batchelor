'use strict';
var util = require("util");
var EventEmitter = require("events").EventEmitter;

function Media() {
    EventEmitter.call(this);
}

util.inherits(Media, EventEmitter);
module.exports = new Media();
