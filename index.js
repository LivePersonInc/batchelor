"use strict";
var batchelor = require("./lib/Batchelor");
var Events = require("./lib/Events");

module.exports = {
    configure: batchelor.configure,
    execute: batchelor.execute,
    close: batchelor.stop,
    Events: Events
};
