"use strict";

var logger;

function debug() {
    if (logger) {
        _callLog(logger.debug, arguments);
    }
}

function info() {
    if (logger) {
        _callLog(logger.info, arguments);
    }
}

function error() {
    if (logger) {
        _callLog(logger.error, arguments);
    }
}

function overrideLogger(log) {
    if (log && typeof log.debug === "function" && typeof log.info === "function" && typeof log.error === "function") {
        logger = log;
    }
}

function _callLog(func, funcArguments) {
    var args = Array.prototype.slice.call(funcArguments);
    func.apply(this, args);
}

module.exports = {
    overrideLogger: overrideLogger,
    debug: debug,
    info: info,
    error: error
};
