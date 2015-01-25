/*jslint node: true */
"use strict";

var async           = require("async")
    , _             = require("lodash")
    , commons       = require("./../commons")
    , utils         = require("./../utils")
    , Eterator      = require("./../commons/eterator")
    , separator     = "_"
    , eterator      = new Eterator()
    , batchelor
    , log
    , config;


/**
 * check if the response was changed, currently using JSON.stringify
 * @param _previous - object of previous request
 * @param _current object of current request
 * @returns {boolean} - true is changed, false otherwise
 */
function _isResponseChanged(previous, current) {
    return JSON.stringify(previous) !== JSON.stringify(current);
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
        log.debug("[Persistent Adaptor] calling given callback");

        try {
            callback(err, result);
        }
        catch (e) {
            log.error("[Persistent Adaptor], exception when calling given method e: " + e);
        }
    }
    else {
        log.debug("[Persistent Adaptor] not a valid callback");
    }

}

/**
 * method for taking care of a single persistent request
 * it will run the callback for the given request only if the response from the current response and previous is different
 * @param err
 * @param result
 * @param persistentReq
 * @private
 */
function _processSingleItem (item) {
    var currTime = Date.now()
        , delta = currTime - item.firedTime
        , name = item.name;

    if (delta >= item.persistentDelay) {
        item.firedTime = currTime;
        item.bodyTemp = item.bodyTemp || {};
        batchelor.execute(item, function (err, result) {

            // TODO[omher]: HOW TO REAL CHECK IF THERE IS CHANGED, WITH BODY ?????
            if (item.ignoreResponse || (!commons.helper.isEmptyObject(result) && result[name] && result[name].body && _isResponseChanged(result[name].body, item.bodyTemp))) {
                item.bodyTemp = result[name].body;
                // when processing single item, mark it - inin case some one wants to know
                result.singlePersistenResponse = true;
                _runCallback(item.callback, err, result);

                // this flag will stop/remove this request from the running requests
                if (item.stop_persistent_once_change) {
                    _stop({reqId: item.name});
                }
            }

        });
    }
}

/**
 * start the persistent polling using eterator object
 * @private
 */
function _startPersist() {
    setImmediate(function () {
        eterator.start(0, true,
            function (err, item) {
                _processSingleItem(item);
            });
    });
}

/**
 * start the persitent polling
 * @private
 */
function _persist () {
    _startPersist();
}

/**
 * callback to be called once the batchelor finish processing the job
 * @param err - error passed from batchelor
 * @param result - result passed from batchelor
 * @param reqs - job to process again and again until its stopped
 * @param callback - job to process again and again until its stopped*
 * @private
 */
function _batchelorCallbackFirstRun(err, result, reqs, callback) {
    var delays = [], minTime;

    log.debug("[Persistent Adaptor] _batchelorCallbackFirstRun called with  err: " + err);

    _.forEach(reqs, function (cReq) {

        if (utils.validator.isPersistentRequest(cReq)) {
            delays.push(cReq.persistentDelay || 2000);
        }
    });

    // for the first time, even only one or all the request are persistent, we call the first time to the general callback
    // after we start to persitent every request we will call to every callback from every request if exist
    _runCallback(callback, err, result);

    // take the minimum timeout - the minimum is the one we will use in the timeout
    minTime = Math.min.apply(Math, delays);

    setTimeout(function () {
        _persist();
    }, minTime);

}

/**
 * process job calling to "batchelor.execute" and waiting for callback to be called from batchelor
 * @param allowReqs - request to process
 * @param callback - general callback
 * @private
 */
function _process(allowReqs, callback) {
    log.debug("[Persistent Adaptor] _process calling batchelor.execute ...");

    batchelor.execute(allowReqs, function(err, result) {
        _batchelorCallbackFirstRun(err, result, allowReqs, callback);

    });
}

/**
 * method to stop running job, if exist
 * @param jobId - job to stop
 * @returns {boolean}
 */
function _stop (options) {
    options = options || {};
    log.debug("[Persistent Adaptor] stopping jobId : " + options.jobId + " request Id: " + options.reqName);
    var eteratorProp = eterator.getProperties();
    eteratorProp.array = eteratorProp.array || [];
    var index = _.findIndex(eteratorProp.array, { 'name': options.reqName });
    if (index >= 0) {
        eterator.removeItem(eteratorProp.array[index]);
    }
    else {
        log.warn("[Persistent Adaptor] couldn't stop jobId : " + options.jobId + " request Id: " + options.reqId + " given values doesn't exist!");
    }
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

exports.setBatchelor = function (_batchelor) {
    batchelor = _batchelor || {};
};

/**
 * entry point of the persistent object
 * @param job - object containing one or more requests
 * @param callback - method to call once the batchelor finish processing job
 * @returns {*} - job id - string
 */
exports.execute = function (job, callback) {
    log.debug("[Persistent Adaptor] execute for job: " + JSON.stringify(job));
    var persistent_requests = []
        , all_requests = []
        , reqs = commons.helper.convert2Array(job)
        , jobId = commons.helper.getUniqueId("jobName" + separator);

    _.forEach(reqs, function (cReq) {

        cReq.callback = cReq.callback || callback;

        if (utils.validator.isValidRequest(cReq)) {

            all_requests.push(cReq);

            if (utils.validator.isPersistentRequest(cReq)) {
                cReq.jobId = jobId;
                cReq.firedTime = Date.now();
                cReq.ignoreResponse = cReq.ignoreResponse || false;
                persistent_requests.push(cReq);
            }
            else {
                log.debug("[Persistent Adaptor] not a persistent request: " + JSON.stringify(cReq));
            }
        }
    });

    eterator.addItems(persistent_requests);

    // pass request to process and general callback to call once we finish
    _process(all_requests, callback);

    return jobId;

};

/**
 * method to stop running job, if exist
 * @param jobId - job to stop
 * @returns {boolean}
 */
exports.stop = _stop;