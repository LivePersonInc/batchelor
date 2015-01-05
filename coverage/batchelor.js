/*jslint node: true */
"use strict";
var negotiator      = require("./lib/negotiator")
    , persistent    = require("./adaptors/persistent");

persistent.setBatchelor(negotiator);
// Exports
exports.configure   = negotiator.configure;
exports.execute     = negotiator.execute;
exports.persistent  = persistent;