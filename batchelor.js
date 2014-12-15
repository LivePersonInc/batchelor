'use strict';
var config     = require('./config/config.json');
var processor  = require('./lib/processor');
var commons    = require('./commons');
var utils      = require('./utils');

/**
 * helper method that configure the given object
 * @param obj - target object
 * @param cfg - source object
 * @private
 */
function _configure(obj, cfg) {
    obj.configure(cfg);
}

/**
 * method building the request for the running process
 * @param job - single request or multiple request
 * @returns {{supported: Array, unsupported: {}}}
 * @private
 */
function _prepareRequests(job) {
    var requests = {
        supported: [],
        unsupported: {}
    };
    var cReq;
    var len = job.length;
    for (var i=0; i<len; i++) {
        cReq = job[i];
        cReq = commons.helper.setAdditionalProps(config.request, cReq);
        if (utils.validator.isValidRequest(cReq)) {
            cReq = utils.validator.cleanRequest(cReq);
            requests.supported.push(cReq);
        }
        else {
            requests.unsupported[cReq.name || "missingName"] = utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.INVALID_TASK);
        }
    }

    return requests;
}

/**
 * configure the batchelor object and utils library
 * @param cfg
 */
exports.configure = function (cfg) {
    config = commons.helper.configure(cfg);
    _configure(utils, config);
    _configure(processor, config);
    return config;
};

/**
 * this is the entry point for the batchelor utility
 * @param job - a object containing a single requests or multiple request to be fetch
 * @param callback - callback  method to be called once the request are performed
 * @returns {jobId}
 */
exports.execute = function (job, callback) {
    job = commons.helper.convert2Array(job);
    var reqs = _prepareRequests(job);
    var jobId = utils.jobHolder.addJob(reqs.supported);

    config.logger.info("[batchelor] Processing Job # " + jobId);

    processor.run(reqs.supported, function (err, result) {
        if (err) {
            callback(err);
        }
        else {
            result = commons.helper.merge(reqs.unsupported, result);
            callback(null, result);
        }
    });

    return jobId;
};


exports.stopJob = function (jobId) {
};