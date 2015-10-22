/*jslint node: true */
'use strict';
var _           = require("lodash")
    , config    = require("./../config/config.json")
    , processor = require("./../lib/processor")
    , commons   = require("./../commons")
    , utils     = require("./../utils")
    , Media     = require("./../media")
    , log;

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
    log.debug("[batchelor] _prepareRequests");
    var _requests = {
        supported: [],
        unsupported: {}
    };
    _.forEach(job, function (cReq) {
        cReq = commons.helper.setDefaultValues(config.request_default_values, cReq);
        if (utils.validator.isValidRequest(cReq) && utils.validator.isValidURL(cReq.url)) {
            cReq = utils.validator.cleanRequest(cReq);
            _requests.supported.push(cReq);
        }
        else {
            _requests.unsupported[cReq.name || "missingName"] = utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.INVALID_TASK);
        }
    });

    return _requests;
}

/**
 * configure the batchelor object and utils library
 * @param cfg
 */
exports.configure = function (cfg) {
    config = commons.helper.configure(cfg);
    log = config.logger || console;
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
    var _reqs = _prepareRequests(job);
    var jobId = utils.jobHolder.addJob(_reqs.supported.slice(0));
    Media.emit("processing", utils.jobHolder.getActiveJobs());

    log.debug("[batchelor] Processing Job # " + jobId);

    processor.run(_reqs.supported, function (err, result) {
        utils.jobHolder.clean(jobId);
        Media.emit("complete", utils.jobHolder.getActiveJobs());

        if (err) {
            _reqs.supported.length =0;
            _reqs.unsupported.length = 0;
            callback(err);
            return;
        }
        else {
            result = commons.helper.merge(_reqs.unsupported, result);
            _reqs.supported.length = 0;
            _reqs.unsupported.length = 0;
            callback(null, result);
            return;
        }
    });

    return jobId;
};
