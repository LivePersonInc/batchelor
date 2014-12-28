/*jslint node: true */
'use strict';
var commons = require("./../commons")
    , url   = require("url")
    , config
    , log;


function _getHost (url) {
    var arr = url.split(".")
        , host;

    if (arr.length >= 2) {
        host = arr[arr.length - 2] + "." + arr[arr.length - 1];
    }

    return host;
}
exports.configure = function (cfg) {
    config = commons.helper.configure(cfg);
    log = config.logger || console;
    // if there is no "whiteList" in the config, we don't
    config.whiteList = config.whiteList || "*";
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
    log.info("[validator] isValidReq: " + validReq);
    return validReq;
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
    config.logger.info("[validator] isPersistentReq: " + persistentReq);
    return persistentReq;
};

exports.isValidURL = function (_url) {
    var valid
        , urlObj
        , host;

    // if in the whiteList exist "*" all domains allow
    if (config.whiteList.indexOf("*") > -1) {
        log.debug("[validator] Allow all URLS");
        valid = true;
    }
    else {
        try {
            urlObj = url.parse(_url, true);
            host = _getHost(urlObj.host);
            if (config.whiteList.indexOf(host) > -1) {
                valid = true;
                log.info('[validator] URL: ' + host + ' URL is valid -  !!!');
            }
            else {
                valid = false;
                log.info("[validator] URL is not valid, host: " + host);
            }
        }
        catch (e) {
            valid = false;
            log.error("[validator] validateURL, exception e: " + e);
        }
    }

    return valid;
};