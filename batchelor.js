'use strict';
var _          = require("lodash");
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
    var _requests = {
        supported: [],
        unsupported: {}
    };
    _.forEach(job, function (cReq) {
        cReq = commons.helper.setAdditionalProps(config.request, cReq);
        if (utils.validator.isValidRequest(cReq)) {
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
    var jobId = utils.jobHolder.addJob(_reqs.supported);

    config.logger.info("[batchelor] Processing Job # " + jobId);

    processor.run(_reqs.supported, function (err, result) {
        if (err) {
            callback(err);
        }
        else {
            result = commons.helper.merge(_reqs.unsupported, result);
            callback(null, result);
        }
    });

    return jobId;
};


exports.stopJob = function (jobId) {
};