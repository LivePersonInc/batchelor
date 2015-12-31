"use strict";
var URL = require("url");
var CONST = require("./Const");
var config = require("./Config");
var log = require("./Logger");

/**
 * validate the given request
 * request to be valid must have: name, url, method
 * @param req
 * @returns {boolean}
 */
function isValidRequest(req) {
    req = req || {};
    var valid = false;
    if ((req.name && typeof req.name === "string") &&
        (req.url && typeof req.url === "string") &&
        (req.method && typeof req.method === "string") && _isValidURL(req.url)) {
        valid = true;
    }
    log.debug("[validator] isValidRequest: " + valid);
    return valid;
}

/**
 * clean the given
 * @param req
 * @returns {*}
 */
function cleanRequest(req) {
    req = req || {};
    /**
     * we are deleting the headers:
     * 1. content-length - don"t limit the size of the content
     * 2. accept-encoding - currently we don"t accept encoding gzip
     * 3. connection - deleted when requesting https
     * 4. host - deleted when requesting https
     */
    for (var header in CONST.INVALID_HEADERS) {
        var currentHeader = CONST.INVALID_HEADERS[header];
        // try to delete it only if were passed
        if (req.headers && req.headers[currentHeader]) {
            delete req.headers[currentHeader];
        }
    }
    return req;
}

/**
 * validate URL against the configuration
 * @param url
 * @returns {*}
 */
function _isValidURL(url) {
    var valid = false,
        urlObj,
        host;
    var conf = config.getConf();

    log.debug("[validator] URL to validate: " + url);

    // if in the whiteList exist "*" all domains allow
    if (conf.whiteList.indexOf("*") > -1) {
        log.debug("[validator] Allow all URLS");
        valid = true;
    }
    else {
        try {
            urlObj = URL.parse(url, true);
            host = _getHost(urlObj.host);
            if (conf.whiteList.indexOf(host) > -1) {
                valid = true;
            }
        }
        catch (e) {
            log.error("[validator] isValidURL, exception e: " + e + " url: " + url);
        }
    }

    log.debug("[validator] URL: " + url + " is " + (valid ? "valid" : "invalid"));
    return valid;
}

function _getHost(url) {
    log.debug("[validator] _getHost URL: " + url);
    var host;
    var arr = url.split(".");

    if (arr.length >= 2) {
        host = arr[arr.length - 2] + "." + arr[arr.length - 1];
    }

    return host;
}

module.exports = {
    cleanRequest: cleanRequest,
    isValidRequest: isValidRequest
};
