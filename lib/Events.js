'use strict';
var util = require("util");
var EventEmitter = require("events").EventEmitter;

function Events() {
    EventEmitter.call(this);
}

util.inherits(Events, EventEmitter);
module.exports = new Events();
