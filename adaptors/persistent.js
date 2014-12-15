/*jslint node: true */
'use strict';

var async               = require('async');
var _                   = require("lodash");
var commons             = require('./../commons');
var utils               = require('./../utils');
var batchelor           = require("./../batchelor");
var persistentJobs      = {};
var persistentManager   = {}
var log;
var config;


/**
 * An asynchronous function for processing a queued task
 * @param _persistentJob - task to work in queue
 * @param callback - must method to call when finished, this way we notify to the queue that this function finished
 * @private
 */
function _persist (_persistentJob, callback) {
    batchelor.execute(_persistentJob.requests.persistent, function (err, result) {
        _batchelorCallback(err, result, _persistentJob);
        callback(null);
    });
}

/**
 * check if the response was changed, currently using JSON.stringify
 * @param _previous - object of previous request
 * @param _current object of current request
 * @returns {boolean} - true is changed, false otherwise
 */
function isResponseChanged(_previous, _current) {
    return JSON.stringify(_previous) !== JSON.stringify(_current)
}

/**
 * run the given method, if its a function type
 * @param callback - method to call
 * @param err - error to pass in callback
 * @param result - result to pass in callback
 * @private
 */
function _runCallback(callback, err, result) {
    if (typeof callback === "function") {
        log.info("[Persistent Adaptor] calling given callback")
        callback(err, result);
    }
    else {
        log.info("[Persistent Adaptor] not an allow callback")
    }

}

/**
 * callback to be called once the batchelor finish processing the job
 * @param err - error passed from batchelor
 * @param result - result passed from batchelor
 * @param persistentJob - job to process again and again until its stopped
 * @private
 */
function _batchelorCallback(err, result, persistentJob) {
    log.info("[Persistent Adaptor] _batchelorCallback called with err: " + err + " and result: " + JSON.stringify(result));
    var _jobId = persistentJob.jobId;
    var _persistentRequests = _buildJobObj(persistentJob.callback, _jobId);
    var _responseChanged = false;

    _.forEach(persistentJob.requests.persistent, function (cPersistent) {
        var name = cPersistent.name;
        cPersistent.bodyTemp = cPersistent.bodyTemp || {};
        if (isResponseChanged(result[name].body, cPersistent.bodyTemp)) {
            _responseChanged = true;
            cPersistent.bodyTemp = result[name].body;
        }
        _persistentRequests.requests.persistent.push(cPersistent);
    });

    if (!commons.helper.isObjectEmpty(result) && _responseChanged) {
        log.info("[Persistent Adaptor] result from batchelor is not empty and _responseChanged: " + _responseChanged);
        _runCallback(persistentJob.callback, err, result)
    }
    else {
        log.info("[Persistent Adaptor] result from batchelor is empty or _responseChanged: " + _responseChanged);
    }

    persistentManager[_jobId] = persistentManager[_jobId] || {};
    if (persistentManager[_jobId] && !persistentManager[_jobId].stopped) {
        setTimeout(function () {
            persistentJob.jobId = _jobId;

            persistentManager[_jobId].queue.push(_persistentRequests, function (err) {
            });
        }, 3000);
    }
}

/**
 * process job calling to "batchelor.execute" and waiting for callback to be called from batchelor
 * @param _persistentJob
 * @private
 */
function _process(_persistentJob) {
    log.info("[Persistent Adaptor] _process calling batchelor.execute ...");
    batchelor.execute(_persistentJob.requests.persistent, function (err, result) {
        _batchelorCallback(err, result, _persistentJob);
    });
}

/**
 * build job object with the given calllback and job id
 * @param callback - function
 * @param jobId - string
 * @returns {{jobId: *, callback: (*|null), requests: {persistent: Array, non_persistent: {}}}}
 * @private
 */
function _buildJobObj(callback, jobId) {
    return {
        jobId: jobId,
        callback: callback || null,
        requests: {
            persistent: [],
            non_persistent: {}
        }
    } ;
}

/**
 * build object queue with stopped status tru
 * @returns {{queue: Array, stopped: boolean}}
 * @private
 */
function _buildObjectQueue() {
    return {
        queue: async.queue(_persist, 5),
        stopped: false
    };
}

/**
 * set the adaptor configuration + configure batchelor
 * @param cfg - configuration object for the adaptor and batchelor
 * @returns {*} - batchelor configuration
 */
exports.configure = function (cfg) {
    config = commons.helper.configure(cfg);
    log = config.logger || console;
    return batchelor.configure(cfg);
};

/**
 * entry point of the persistent object
 * @param job - object containing one or more requests
 * @param callback - method to call once the batchelor finish processing job
 * @returns {*} - job id - string
 */
exports.execute = function (job, callback) {
    log.info("[Persistent Adaptor] execute for job: " + JSON.stringify(job));
    var reqs = commons.helper.convert2Array(job);
    var jobId = commons.helper.getUniqueId("jobName");
    persistentJobs[jobId] = _buildJobObj(callback, jobId);

    _.forEach(reqs, function (cReq) {
        var reqName = cReq.name || "missingName";

        if (utils.validator.isPersistentRequest(cReq)) {
            persistentJobs[jobId].requests.persistent.push(cReq);
        }
        else {
            persistentJobs[jobId].requests.non_persistent[reqName] = utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.NON_PERSISTENT_REQUEST);
        }
    });

    persistentManager[jobId] = _buildObjectQueue();
    _process(persistentJobs[jobId]);

    return jobId;

};

/**
 * method to stop running job, if exist
 * @param jobId - job to stop
 * @returns {boolean}
 */
exports.stop = function (jobId) {
    var stopped = false;
    log.info("[Persistent Adaptor] stopping job: " + jobId);

    if (jobId && persistentManager[jobId]) {
        stopped = persistentManager[jobId].stopped = stopped;
        persistentManager[jobId].queue.kill();
    }

    return stopped;
};