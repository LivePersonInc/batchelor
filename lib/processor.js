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
var config;

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
            cb(error, body);
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
        cb(null, results);
    });

};