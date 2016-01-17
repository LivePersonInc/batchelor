"use strict";
var URL = require("url");
var domainUtils = require("./DomainUtils");
var CONST = require("./Const");
var config = require("./Config");
var log = require("./Logger");
var defWhiteList = ["*"];
var logEntity = "[batchelor] Validator";
/**
 * validate the given request
 * request to be valid must have: name, url, method
 * @param req
 * @returns {boolean}
 */
function isValidRequest(req) {
    log.debug(logEntity + " isValidRequest req=" + JSON.stringify(req));
    req = req || {};
    var valid = false;
    if ((req.name && typeof req.name === "string") &&
        _isValidURL(req.url)) {
        valid = true;
    }
    log.debug(logEntity + " isValidRequest: " + valid);
    return valid;
}

/**
 * clean the given
 * @param req
 * @returns {*}
 */
function cleanRequest(req) {
    var headers;

    req = req || {};

    headers = req.headers;

    /**
     * we are deleting the headers:
     * 1. content-length - don"t limit the size of the content
     * 2. accept-encoding - currently we don"t accept encoding gzip
     * 3. connection - deleted when requesting https
     * 4. host - deleted when requesting https
     */
    if (headers === Object(headers) && Object.keys(headers).length) {
        for (var header in headers) {
            if (headers.hasOwnProperty(header) &&
                headers[header] &&
                CONST.INVALID_HEADERS.indexOf(header.toLowerCase()) !== -1) {
                delete headers[header];
            }
        }
    }
    else {
        req.headers = {};
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
        urlObj;

    if (typeof url === "string") {
        log.debug(logEntity + " URL to validate: " + url);
        urlObj = URL.parse(url);
        if (urlObj.protocol && urlObj.hostname) {
            valid = _isInWhiteList(urlObj.hostname);
        }
    }
    log.debug(logEntity + " _isValidURL URL: " + url + " is " + (valid ? "valid" : "invalid"));
    return valid;
}

/**
 * Checks for the appearance of item in white-list
 * Supports full domains or last three entries of domain in case an * exists
 * @param host
 * @returns {boolean}
 * @private
 */
function _isInWhiteList(host) {
    var valid = false,
        wildCardDomain,
        hasWildCard;

    var whiteList = config.getConf().whiteList || defWhiteList;

    if(Array.isArray(whiteList)) {
        if (whiteList.indexOf("*") > -1) {//Supports all URLs
            log.debug(logEntity + " Allow all URLS");
            valid = true;
        }
        else {
            try {
                if (whiteList.join(" ").indexOf("*") > -1) {//One entry at least has a wild card
                    hasWildCard = true;
                    wildCardDomain = "*." + domainUtils.getParentDomain(host);//Set wildcard plus parent domain
                }

                if (whiteList.indexOf(host) > -1 ||
                    (hasWildCard && whiteList.indexOf(wildCardDomain) > -1)) {
                    valid = true;
                }
            }
            catch (e) {
                log.error(logEntity + " isInWhiteList, exception e: " + e + " host: " + host);
            }
        }
    }
    else {
        log.error(logEntity + " no white-list exists, or white-list is not of type Array");
    }
    return valid;
}

module.exports = {
    cleanRequest: cleanRequest,
    isValidRequest: isValidRequest
};
