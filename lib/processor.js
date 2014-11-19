var async = require('async');
var request = require('request');
var UTILS = require('./../utils/utils');
var helper = require('./helper');
var CONST = require('./const');
var config;

function _process(task, error, response, body, callback) {

    var result = {};

    if (!response) {
        result = UTILS.builder.buildResponse(error.code);
    }
    else {
        if (error) {
            config["logger"].error(CONST.BODY_RESPONSE.ERROR_API_URL + " " + task.url +  " Error Code: " + error.code + ", IP: " + task.ip);
            result = UTILS.builder.buildResponse(CONST.RESPONSE_TYPE.ERROR_API_URL);
        } else {
            try {
                result.body = JSON.parse(body);
            } catch (err) {
                config["logger"].error(CONST.BODY_RESPONSE.NO_JSON_OBJECT + ", IP: " + task.ip);
                result = UTILS.builder.buildResponse(CONST.RESPONSE_TYPE.NO_JSON_OBJECT);
            }
        }

        // set the headers/status in the result object
        result.headers = response.headers;
        result.statusCode = response.statusCode;

    }

    // callback of the async.parallel method (async.parallel(tasks, function (err, results) {...))
    // in the callback expects two parameters - error and results
    callback(null, result);
}

function _getReq(req) {
    return function (cb) {
        var options = {
            url: req.url,
            headers: req.headers,
            method: req.method,
            body: req.body,
            timeout: (req.timeout <= config.timeout) ? req.timeout : config.timeout,
            pool : {
                maxSockets : 200
            }
        };

        options.headers.HTTP_X_FORWARDED_FOR = req.ip;

        config["logger"].info("Requesting URL: " + options.url + ", headers: " + options.headers + ", method: " + options.method + ", body(when POST method): " + options.body + ", timeout: "  + options.timeout);

        // request to the API host for every job
        request(options, function(error, response, body) {
              _process(req, error, response, body, cb)
        });
    };
}

exports.configure = function (cfg) {
    config = helper.configure(cfg);
};

exports.run = function (job, cb) {
    config["logger"].info("running processor ...");
    var reqs = {};

    // creates the collection of 'requests' (holds a collection of getReq methods)
    for (var i=0; i< job.length; i++) {
        var cReq = job[i];
        reqs[cReq.name] =_getReq(cReq);
    }

    async.parallelLimit(reqs, config.maxConcurrentJobs, function (err, results) {

        if (err) {
            config["logger"].error("Error in running the job, err: " + err);
            cb(err);
        }
        else {
            cb(null, results);
        }
    });

};