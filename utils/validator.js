'use strict';
var commons = require("./../commons/commons");
var config;

exports.configure = function (cfg) {
    config = commons.helper.configure(cfg);
    return config;
};

exports.isValidRequest = function (req) {
    req = req || {};
    var validReq = false;
    if ((req.name && typeof req.name === "string") &&
        (req.url && typeof req.url === "string") &&
        (req.method && typeof req.method === "string")) {
        validReq = true;
    }
    config.logger.info("isValidReq: " + validReq)
    return validReq
};
exports.cleanRequest = function (req) {
    req = req || {};
    /**
     * we are deleting the headers:
     * 1. content-length - don't limit the size of the content
     * 2. accept-encoding - currently we don't accept encoding gzip
     * 3. connection - deleted when requesting https
     * 4. host - deleted when requesting https
     */
    for (var header in commons.CONST.INVALID_HEADERS) {
        var currentHeader = commons.CONST.INVALID_HEADERS[header];
        // try to delete it only if were passed
        if (req.headers && req.headers[currentHeader]) {
            delete req.headers[currentHeader];
        }
    }
    return req;
};


exports.isPersistentRequest = function (req) {
    var persistentReq = req && req.persistent && req.persistent === true || false;
    config.logger.info("isPersistentReq: " + persistentReq);
    return persistentReq;
};