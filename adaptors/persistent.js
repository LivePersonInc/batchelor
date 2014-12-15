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


function isResponseChanged(_previous, _current) {
    return JSON.stringify(_previous) !== JSON.stringify(_current)
}

function _persist (_persistentJob, callback) {
    batchelor.execute(_persistentJob.requests.persistent, function (err, result) {
        _batchelorCallback(err, result, _persistentJob);
        callback(null);
    });
}

function _runCallback(callback, err, result) {
    if (typeof callback === "function") {
        log.info("[Persistent Adaptor] calling given callback")
        callback(err, result);
    }
    else {
        log.info("[Persistent Adaptor] not an allow callback")
    }

}

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

function _process(_persistentJob) {
    log.info("[Persistent Adaptor] _process calling batchelor.execute ...");
    batchelor.execute(_persistentJob.requests.persistent, function (err, result) {
        _batchelorCallback(err, result, _persistentJob);
    });
}

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

function _buildObjectQueue() {
    return {
        queue: async.queue(_persist, 5),
        stopped: false
    };
}

exports.configure = function (cfg) {
    config = commons.helper.configure(cfg);
    log = config.logger || console;
    return batchelor.configure(cfg);
};

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

exports.stop = function (jobId) {
    log.info("[Persistent Adaptor] stopping job: " + jobId);
    persistentManager[jobId].stopped = true;
    persistentManager[jobId].queue.kill();
};