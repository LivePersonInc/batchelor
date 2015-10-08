/*jslint node: true */
"use strict";

var _ = require("lodash");
var commons = require("./../commons");
var utils = require("./../utils");
var Eterator = require("./../commons/eterator");
var separator = "_";
var eterator = new Eterator();
var batchelor;
var log;
var config;


/**
 * check if the response was changed, currently using JSON.stringify
 * @param previous - object of previous request
 * @param current object of current request
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
 * @param item
 * @private
 */
function _processSingleItem(item) {
    var currTime = Date.now()
        , delta = currTime - item.firedTime
        , name = item.name;

    if (delta >= item.persistentDelay) {
        item.firedTime = currTime;
        item.bodyTemp = item.bodyTemp || {};
        batchelor.execute(item, function (err, result) {

            if (item.ignoreResponse || (!commons.helper.isEmptyObject(result) && result[name] && result[name].body && _isResponseChanged(result[name].body, item.bodyTemp))) {
                item.bodyTemp = result[name].body;
                // when processing single item, mark it - inin case some one wants to know
                result[name].singlePersistenResponse = true;
                result[name].persistent = true;
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
            },
            null,
            config.useImmediate
        );
    });
}

/**
 * start the persitent polling
 * @private
 */
function _persist() {
    _startPersist();
}

/**
 * get persistent item from the eterator array
 * @param name: string identifier
 * @returns {{item: *, index: *}}
 * @private
 */
function _getPersistentItem(name) {
    var eteratorProp = eterator.getProperties();
    eteratorProp.array = eteratorProp.array || [];
    var index = _.findIndex(eteratorProp.array, {'name': name});
    return (index >= 0) ? {item: eteratorProp.array[index], index: index} : null;
}

/**
 * set the persistent item with the first response we pass
 * @param name
 * @param result
 * @private
 */
function _setPersistentBody2Item(name, result) {
    var obj = _getPersistentItem(name);
    obj.item.bodyTemp = result.body;
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
            _setPersistentBody2Item(cReq.name, result[cReq.name]);
            result[cReq.name].persistent = true; // set the result with persistent type, in case the client want to do something with it
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

    batchelor.execute(allowReqs, function (err, result) {
        _batchelorCallbackFirstRun(err, result, allowReqs, callback);

    });
}

/**
 * method to stop running job, if exist
 * @param jobId - job to stop
 * @returns {boolean}
 */
function _stop(options) {
    options = options || {};
    log.debug("[Persistent Adaptor] stopping jobId : " + options.jobId + " request Id: " + options.reqName);
    var result = _getPersistentItem(options.reqName);
    if (result) {
        eterator.removeItem(result.item);
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
