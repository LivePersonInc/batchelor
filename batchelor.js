"use strict";
var negotiator      = require("./lib/negotiator");
var persistent    = require("./lib/adaptors/persistent");
var utils         = require("./lib/utils");
var Media         = require("./lib/media");

persistent.setBatchelor(negotiator);

module.exports = {
    configure: negotiator.configure,
    execute: negotiator.execute,
    persistent: persistent,
    Media: Media
};
