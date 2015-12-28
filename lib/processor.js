'use strict';
var async     = require("async")
    , _       = require("lodash")
    , request = require("request")
    , utils   = require("./utils")
    , commons = require("./commons")
    , config
    , log;

/**
 * The raw headers as they were received are pass in the headers parameter, which is an array of [key, value, key2, value2, ...]
 * @param headers: array
 * @private
 */
function _getRawOriginalHeaders (rawHeaders) {
    rawHeaders = rawHeaders || [];
    var rawHeadersStr = "";
    var rawHeadersObj = {};
    for (var i=0, j=1; i< rawHeaders.length; i+=2, j+=2) {
        rawHeadersStr += rawHeaders[i] + ": " + rawHeaders[j];
        rawHeadersObj[rawHeaders[i]] = rawHeaders[j];
        // for the last headers don't add '\n'
        rawHeadersStr += (i < rawHeaders.length-2) ? "\n" : "";
    }
    return {
        originalHeadersStr: rawHeadersStr,
        originalHeadersObj: rawHeadersObj
    };
}

/**
 * callback method to be called once request return from call
 * @param req
 * @param error
 * @param response
 * @param body
 * @param callback
 * @private
 */
function _process(req, error, response, body, callback) {
    log.debug("[processor] _process called, config: " + JSON.stringify(config));
    var _result = {};
    var rawHeaders;

    if (!response) {
        log.error("[processor] _process no response: " + response + " req.url: " + req.url);
        _result = utils.builder.buildResponse(error.code || commons.CONST.RESPONSE_TYPE.ERROR_API_URL);
    }
    else {
        if (error) {
            log.error(commons.CONST.BODY_RESPONSE.ERROR_API_URL + " req.url: " + req.url +  " Error Code: " + error.code + ", IP: " + req.ip);
            _result = utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.ERROR_API_URL);
        } else {
            try {
                log.debug("[processor] _process body: " + body + " req.url: " + req.url);
                _result.body = JSON.parse(body);
                log.debug("[processor] _process body is JSON, body stringify: " + JSON.stringify(body) + " req.url:" + req.url);
            } catch (err) {
                _result.body = body;
                log.debug(commons.CONST.BODY_RESPONSE.NO_JSON_OBJECT + ", IP: " + req.ip + " body: " + body + "req.url: " + req.url);
            }
        }

        // set the headers/status in the _result object
        _result.headers = _result.headers || response.headers;
        _result.statusCode = _result.statusCode || response.statusCode;
        _result.HTTPStatus = _result.HTTPStatus || response.statusCode;

        // if the flag originalHeader is true, add originalHeader to the response
        if (config.originalHeader || req.caseSensitiveHeaders) {

            // call to the method in case one of the options is true
            rawHeaders = _getRawOriginalHeaders(response.rawHeaders);

            if (config.originalHeader) {
                _result.originalHeader = rawHeaders.originalHeadersStr;
            }

            _result.headers = (req.caseSensitiveHeaders) ? rawHeaders.originalHeadersObj : _result.headers;

        }

    }

    // callback of the async.parallel method (async.parallel(reqs, function (err, _results) {...))
    // in the callback expects two parameters - error and _results
    callback(null, _result);
}

/**
 * get timeout per request, we ensure we have a real number before sending to request module
 * @param timeout
 * @returns {Number|*}
 * @private
 */
function _getTimeout(timeout) {
    timeout = parseInt(timeout, 10);

    if (isNaN(timeout) || timeout < config.request_default_values.timeout) {
        timeout = config.request_default_values.timeout;
    }

    return timeout;

}

/**
 * method to be called in parallel from async.parallelLimit
 * @param req - request to threat
 * @returns {Function}
 * @private
 */
function _getReq(req) {
    return function (cb) {
        var body = req.body || req.data;

        try {
            // body - entity body for PATCH, POST and PUT requests. Must be a Buffer or String, unless json is true. If json is true, then body must be a JSON-serializable object.
            body = (body && typeof body !== "string") ? JSON.stringify(body) : body;
            req = req || {};
            var options = {
                strictSSL: (typeof config.strictSSL !== "undefined") ? config.strictSSL : true,
                url: req.url,
                headers: req.headers || {},
                method: req.method,
                body: body,
                timeout: _getTimeout(req.timeout),
                pool : {
                    maxSockets : 200
                }
            };

            // if the body is not and empty string, we pass it to the request
            if (body !== null) {
                options.body = body;
            }
            options.headers.HTTP_X_FORWARDED_FOR = req.ip;

            log.debug("[processor] Requesting URL: " + options.url + ", headers: " + options.headers + ", method: " + options.method + ", body(when POST method): " + options.body + ", timeout: "  + options.timeout);

            // request to the API host for every job
            request(options, function(error, response, body) {
                _process(req, error, response, body, cb);
            });
        }
        catch (ex) {
            log.error("[processor] exception parsing the body or in request, ex: " + ex);
            cb(ex);
        }

    };
}

/**
 * configure object
 * @param cfg
 * @returns {*}
 */
exports.configure = function (cfg) {
    config = commons.helper.configure(cfg);
    utils.configure(cfg);
    log = config.logger || console;
    return config;
};

/**
 * entry point to start running jobs
 * @param job - job containing one or more requests
 * @param cb - callback method to call once finish processing job
 */
exports.run = function (job, cb) {

    log.debug("[processor] running processor ...");
    var _reqs = {};

    // creates the collection of 'requests' (holds a collection of getReq methods)
    _.forEach(job, function (cReq) {
        _reqs[cReq.name] =_getReq(cReq);
    });

    async.parallelLimit(_reqs, config.maxConcurrentJobs, function (err, results) {
        if (err) {
            log.error("[processor] Error in running the job, err: " + err);
            cb(err);
            return;
        }
        else {
            log.debug("[processor] All good running the job, results:"  + JSON.stringify(results));
            cb(null, results);
            return;
        }
    });

};
