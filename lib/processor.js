/**
 * Created with IntelliJ IDEA.
 * User: omerh
 * Date: 11/18/14
 * Time: 9:38
 * To change this template use File | Settings | File Templates.
 */
var async = require('async');
var request = require('request');
var util = require('./util');
var CONST = require('./const');
var builder = require('./builder');
var config;

function _process(task, error, response, body, callback) {

    var result = {};

    if (!response) {
        result = builder.buildResponse(error.code);
    }
    else {
        if (error) {
            config["logger"].error(CONST.BODY_RESPONSE.ERROR_API_URL + " " + task.url +  " Error Code: " + error.code + ", IP: " + task.ip);
            result = builder.buildResponse(CONST.RESPONSE_TYPE.ERROR_API_URL);
        } else {
            try {
                result.body = JSON.parse(body);
            } catch (err) {
                config["logger"].error(CONST.BODY_RESPONSE.NO_JSON_OBJECT + ", IP: " + task.ip);
                result = builder.buildResponse(CONST.RESPONSE_TYPE.NO_JSON_OBJECT);
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

function _getTask(task) {
    return function (cb) {
        var options = {
            url: task.url,
            headers: task.headers || {},
            method: task.method,
            body: task.body || "",
            timeout: (task.timeout <= config.timeout) ? task.timeout : config.timeout,
            pool : {
                maxSockets : 200
            }
        };

        options.headers.HTTP_X_FORWARDED_FOR = task.ip;

        config["logger"].info("Requesting URL: " + options.url + ", headers: " + options.headers + ", method: " + options.method + ", body(when POST method): " + options.body + ", timeout: "  + options.timeout);

        // request to the API host for every job
        request(options, function(error, response, body) {
              _process(task, error, response, body, cb)
        });
    };
}

exports.configure = function (cfg) {
    config = util.configure(cfg);
};

exports.run = function (job, cb) {
    config["logger"].info("running processor ...");
    var tasks = {};
    // creates the collection of 'task' (holds a collection of getTask methods)
    for (var i=0; i< job.length; i++) {
        var cTask = job[i];
        tasks[cTask.name] =_getTask(cTask);
    }
    async.parallelLimit(tasks, config.maxConcurrentJobs, function (err, results) {

        if (err) {
            config["logger"].error("Error in running the job, err: " + err);
            cb(err);
        }
        else {
            cb(null, results);
        }
    });

};