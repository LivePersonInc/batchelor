/**
 * Created with IntelliJ IDEA.
 * User: omerh
 * Date: 11/18/14
 * Time: 9:49
 * To change this template use File | Settings | File Templates.
 */
var config = require('./config/config.json');
var util = require('./lib/util');
var processor = require('./lib/processor');
var jobHolder = require('./lib/jobHolder');
var validator = require('./lib/validator');
var builder = require('./lib/builder');
var CONST = require('./lib/const');



function _configure(obj, cfg) {
    obj.configure(cfg);
}

function _prepareTasks(job, invalidTasks) {
    var validTasks = [];
    var cTask;
    var len = job.length;
    for (var i=0; i<len; i++) {
        cTask = job[i];
        if (validator.isValidTask(cTask)) {
            validTasks.push(cTask);
        }
        else {
            invalidTasks[cTask.name || "missingName"] = builder.buildResponse(CONST.RESPONSE_TYPE.INVALID_TASK);
        }
    }

    return validTasks;
}

function merge(source, target) {
    for (var cur in source) {
        target[cur] = source[cur];
    }

    return target;
}

exports.configure = function (cfg) {
    config = util.configure(cfg);
    _configure(processor, cfg);
    _configure(jobHolder, cfg);
    _configure(validator, cfg);
};

exports.process = function (job, callback) {
    var invalidTasks = {};
    var jobId = jobHolder.addJob(job);
    config["logger"].info("Processing Job # " + jobId)
    var validTasks = _prepareTasks(job, invalidTasks);

    processor.run(validTasks, function (err, result) {
        result = merge(invalidTasks, result);
        callback(null, result);
    });
    return jobId;
};


exports.stopJob = function (jobId) {
};