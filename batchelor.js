var config    = require('./config/config.json');
var helper    = require('./lib/helper');
var CONST     = require('./lib/const');
var UTILS     = require('./utils/utils');
var processor = require('./lib/processor');

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
        cReq = helper.setAdditionalProps(config.request, cReq);
        if (UTILS.validator.isValidRequest(cReq)) {
            cReq = UTILS.validator.cleanRequest(cReq);
            requests.supported.push(cReq);
        }
        else {
            requests.unsupported[cReq.name || "missingName"] = UTILS.builder.buildResponse(CONST.RESPONSE_TYPE.INVALID_TASK);
        }
    }

    return requests;
}

/**
 * configure the batchelor object and utils library
 * @param cfg
 */
exports.configure = function (cfg) {
    config = helper.configure(cfg);
    _configure(UTILS.processor, config);
    _configure(UTILS.jobHolder, config);
    _configure(UTILS.validator, config);
};

/**
 * this is the entry point for the batchelor utility
 * @param job - a object containing a single requests or multiple request to be fetch
 * @param callback - callback  method to be called once the request are performed
 * @returns {jobId}
 */
exports.execute = function (job, callback) {
    job = helper.convert2Array(job);
    var reqs = _prepareRequests(job);
    var jobId = UTILS.jobHolder.addJob(reqs.supported);

    config["logger"].info("Processing Job # " + jobId);

    processor.run(reqs.supported, function (err, result) {
        if (err) {
            callback(err);
        }
        else {
            result = helper.merge(reqs.unsupported, result);
            callback(null, result);
        }
    });

    return jobId;
};


exports.stopJob = function (jobId) {
};