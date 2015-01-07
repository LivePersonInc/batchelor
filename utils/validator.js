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

/**
 * configure the object
 * @param cfg
 * @returns {{}}
 */
exports.configure = function (cfg) {
    config = commons.helper.configure(cfg);
    log = config.logger || console;
    // if there is no "whiteList" in the config, we don't
    config.whiteList = config.whiteList || "*";
    return config;
};

/**
 * validate the given request
 * request to be valid must have: name, url, method
 * @param req
 * @returns {boolean}
 */
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

/**
 * clean the given
 * @param req
 * @returns {*}
 */
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


/**
 * check if the request if persistent
 * @param req
 * @returns {*|Function|Function|boolean|boolean}
 */
exports.isPersistentRequest = function (req) {
    var persistentReq = (req && ((req.isPersistentRequest && req.isPersistentRequest === true) || (req.persistent && req.persistent === true))) || false;
    config.logger.info("[validator] isPersistentRequest: " + persistentReq);
    return persistentReq;
};

/**
 * validate URL against the configuration
 * @param _url
 * @returns {*}
 */
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