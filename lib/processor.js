/*jslint node: true */
'use strict';
var async     = require("async")
    , _       = require("lodash")
    , request = require("request")
    , utils   = require("./../utils")
    , commons = require("./../commons")
    , config
    , log;


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
    log.info("[processor] _process called");
    var _result = {};

    if (!response) {
        log.error("[processor] _process no response: " + response);
        _result = utils.builder.buildResponse(error.code || commons.CONST.RESPONSE_TYPE.ERROR_API_URL);
    }
    else {
        if (error) {
            log.error(commons.CONST.BODY_RESPONSE.ERROR_API_URL + " " + req.url +  " Error Code: " + error.code + ", IP: " + req.ip);
            _result = utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.ERROR_API_URL);
        } else {
            try {
                log.info("[processor] _process body: " + body);
                _result.body = JSON.parse(body);
            } catch (err) {
                log.error(commons.CONST.BODY_RESPONSE.NO_JSON_OBJECT + ", IP: " + req.ip);
                _result = utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.NO_JSON_OBJECT);
            }
        }

        // set the headers/status in the _result object
        _result.headers = response.headers;
        _result.statusCode = response.statusCode;

    }

    // callback of the async.parallel method (async.parallel(reqs, function (err, _results) {...))
    // in the callback expects two parameters - error and _results
    return callback(null, _result);
}

/**
 * method to be called in parallel from async.parallelLimit
 * @param req - request to threat
 * @returns {Function}
 * @private
 */
function _getReq(req) {
    return function (cb) {
        req = req || {};
        var options = {
            url: req.url,
            headers: req.headers || {},
            method: req.method,
            body: req.body,
            timeout: (req.timeout <= config.request.timeout) ? req.timeout : config.request.timeout,
            pool : {
                maxSockets : 200
            }
        };

        options.headers.HTTP_X_FORWARDED_FOR = req.ip;

        log.info("[processor] Requesting URL: " + options.url + ", headers: " + options.headers + ", method: " + options.method + ", body(when POST method): " + options.body + ", timeout: "  + options.timeout);

        // request to the API host for every job
        request(options, function(error, response, body) {
              _process(req, error, response, body, cb);
        });
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

    log.info("[processor] running processor ...");
    var _reqs = {};

    // creates the collection of 'requests' (holds a collection of getReq methods)
    _.forEach(job, function (cReq) {
        _reqs[cReq.name] =_getReq(cReq);
    });

    async.parallelLimit(_reqs, config.maxConcurrentJobs, function (err, results) {
        if (err) {
            log.error("[processor] Error in running the job, err: " + err);
            return cb(err);
        }
        else {
            return cb(null, results);
        }
    });

};