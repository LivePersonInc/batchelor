if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['adaptors/persistent.js'] === 'undefined'){_$jscoverage['adaptors/persistent.js']=[];
_$jscoverage['adaptors/persistent.js'].source=['/*jslint node: true */',
'"use strict";',
'',
'var async           = require("async")',
'    , _             = require("lodash")',
'    , commons       = require("./../commons")',
'    , utils         = require("./../utils")',
'    , Eterator      = require("./../commons/eterator")',
'    , separator     = "_"',
'    , eterator      = new Eterator()',
'    , batchelor',
'    , log',
'    , config;',
'',
'',
'/**',
' * check if the response was changed, currently using JSON.stringify',
' * @param _previous - object of previous request',
' * @param _current object of current request',
' * @returns {boolean} - true is changed, false otherwise',
' */',
'function _isResponseChanged(previous, current) {',
'    return JSON.stringify(previous) !== JSON.stringify(current);',
'}',
'',
'/**',
' * run the given method, if its a function type',
' * @param callback - method to call',
' * @param err - error to pass in callback',
' * @param result - result to pass in callback',
' * @private',
' */',
'function _runCallback(callback, err, result) {',
'    if (typeof callback === "function") {',
'        log.debug("[Persistent Adaptor] calling given callback");',
'',
'        try {',
'            callback(err, result);',
'        }',
'        catch (e) {',
'            log.error("[Persistent Adaptor], exception when calling given method e: " + e);',
'        }',
'    }',
'    else {',
'        log.debug("[Persistent Adaptor] not a valid callback");',
'    }',
'',
'}',
'',
'/**',
' * method for taking care of a single persistent request',
' * it will run the callback for the given request only if the response from the current response and previous is different',
' * @param err',
' * @param result',
' * @param persistentReq',
' * @private',
' */',
'function _processSingleItem (item) {',
'    var currTime = Date.now()',
'        , delta = currTime - item.firedTime',
'        , name = item.name;',
'',
'    if (delta >= item.persistentDelay) {',
'        item.firedTime = currTime;',
'        item.bodyTemp = item.bodyTemp || {};',
'        batchelor.execute(item, function (err, result) {',
'',
'            // TODO[omher]: HOW TO REAL CHECK IF THERE IS CHANGED, WITH BODY ?????',
'            if (item.ignoreResponse || (!commons.helper.isEmptyObject(result) && result[name] && result[name].body && _isResponseChanged(result[name].body, item.bodyTemp))) {',
'                item.bodyTemp = result[name].body;',
'                // when processing single item, mark it - inin case some one wants to know',
'                result.singlePersistenResponse = true;',
'                _runCallback(item.callback, err, result);',
'',
'                // this flag will stop/remove this request from the running requests',
'                if (item.stop_persistent_once_change) {',
'                    _stop({reqId: item.name});',
'                }',
'            }',
'',
'        });',
'    }',
'}',
'',
'/**',
' * start the persistent polling using eterator object',
' * @private',
' */',
'function _startPersist() {',
'    setImmediate(function () {',
'        eterator.start(0, true,',
'            function (err, item) {',
'                _processSingleItem(item);',
'            });',
'    });',
'}',
'',
'/**',
' * start the persitent polling',
' * @private',
' */',
'function _persist () {',
'    _startPersist();',
'}',
'',
'/**',
' * callback to be called once the batchelor finish processing the job',
' * @param err - error passed from batchelor',
' * @param result - result passed from batchelor',
' * @param reqs - job to process again and again until its stopped',
' * @param callback - job to process again and again until its stopped*',
' * @private',
' */',
'function _batchelorCallbackFirstRun(err, result, reqs, callback) {',
'    var delays = [], minTime;',
'',
'    log.debug("[Persistent Adaptor] _batchelorCallbackFirstRun called with  err: " + err);',
'',
'    _.forEach(reqs, function (cReq) {',
'',
'        if (utils.validator.isPersistentRequest(cReq)) {',
'            delays.push(cReq.persistentDelay || 2000);',
'        }',
'    });',
'',
'    // for the first time, even only one or all the request are persistent, we call the first time to the general callback',
'    // after we start to persitent every request we will call to every callback from every request if exist',
'    _runCallback(callback, err, result);',
'',
'    // take the minimum timeout - the minimum is the one we will use in the timeout',
'    minTime = Math.min.apply(Math, delays);',
'',
'    setTimeout(function () {',
'        _persist();',
'    }, minTime);',
'',
'}',
'',
'/**',
' * process job calling to "batchelor.execute" and waiting for callback to be called from batchelor',
' * @param allowReqs - request to process',
' * @param callback - general callback',
' * @private',
' */',
'function _process(allowReqs, callback) {',
'    log.debug("[Persistent Adaptor] _process calling batchelor.execute ...");',
'',
'    batchelor.execute(allowReqs, function(err, result) {',
'        _batchelorCallbackFirstRun(err, result, allowReqs, callback);',
'',
'    });',
'}',
'',
'/**',
' * method to stop running job, if exist',
' * @param jobId - job to stop',
' * @returns {boolean}',
' */',
'function _stop (options) {',
'    options = options || {};',
'    log.debug("[Persistent Adaptor] stopping jobId : " + options.jobId + " request Id: " + options.reqName);',
'    var eteratorProp = eterator.getProperties();',
'    eteratorProp.array = eteratorProp.array || [];',
'    var index = _.findIndex(eteratorProp.array, { \'name\': options.reqName });',
'    if (index >= 0) {',
'        eterator.removeItem(eteratorProp.array[index]);',
'    }',
'    else {',
'        log.warn("[Persistent Adaptor] couldn\'t stop jobId : " + options.jobId + " request Id: " + options.reqId + " given values doesn\'t exist!");',
'    }',
'}',
'',
'',
'/**',
' * set the adaptor configuration + configure batchelor',
' * @param cfg - configuration object for the adaptor and batchelor',
' * @returns {*} - batchelor configuration',
' */',
'exports.configure = function (cfg) {',
'    config = commons.helper.configure(cfg);',
'    log = config.logger || console;',
'    return batchelor.configure(cfg);',
'};',
'',
'exports.setBatchelor = function (_batchelor) {',
'    batchelor = _batchelor || {};',
'};',
'',
'/**',
' * entry point of the persistent object',
' * @param job - object containing one or more requests',
' * @param callback - method to call once the batchelor finish processing job',
' * @returns {*} - job id - string',
' */',
'exports.execute = function (job, callback) {',
'    log.debug("[Persistent Adaptor] execute for job: " + JSON.stringify(job));',
'    var persistent_requests = []',
'        , all_requests = []',
'        , reqs = commons.helper.convert2Array(job)',
'        , jobId = commons.helper.getUniqueId("jobName" + separator);',
'',
'    _.forEach(reqs, function (cReq) {',
'',
'        cReq.callback = cReq.callback || callback;',
'',
'        if (utils.validator.isValidRequest(cReq)) {',
'',
'            all_requests.push(cReq);',
'',
'            if (utils.validator.isPersistentRequest(cReq)) {',
'                cReq.jobId = jobId;',
'                cReq.firedTime = Date.now();',
'                cReq.ignoreResponse = cReq.ignoreResponse || false;',
'                persistent_requests.push(cReq);',
'            }',
'            else {',
'                log.debug("[Persistent Adaptor] not a persistent request: " + JSON.stringify(cReq));',
'            }',
'        }',
'    });',
'',
'    eterator.addItems(persistent_requests);',
'',
'    // pass request to process and general callback to call once we finish',
'    _process(all_requests, callback);',
'',
'    return jobId;',
'',
'};',
'',
'/**',
' * method to stop running job, if exist',
' * @param jobId - job to stop',
' * @returns {boolean}',
' */',
'exports.stop = _stop;'];
_$jscoverage['adaptors/persistent.js'][133]=0;
_$jscoverage['adaptors/persistent.js'][2]=0;
_$jscoverage['adaptors/persistent.js'][114]=0;
_$jscoverage['adaptors/persistent.js'][23]=0;
_$jscoverage['adaptors/persistent.js'][22]=0;
_$jscoverage['adaptors/persistent.js'][4]=0;
_$jscoverage['adaptors/persistent.js'][149]=0;
_$jscoverage['adaptors/persistent.js'][41]=0;
_$jscoverage['adaptors/persistent.js'][37]=0;
_$jscoverage['adaptors/persistent.js'][34]=0;
_$jscoverage['adaptors/persistent.js'][33]=0;
_$jscoverage['adaptors/persistent.js'][35]=0;
_$jscoverage['adaptors/persistent.js'][38]=0;
_$jscoverage['adaptors/persistent.js'][161]=0;
_$jscoverage['adaptors/persistent.js'][65]=0;
_$jscoverage['adaptors/persistent.js'][45]=0;
_$jscoverage['adaptors/persistent.js'][59]=0;
_$jscoverage['adaptors/persistent.js'][64]=0;
_$jscoverage['adaptors/persistent.js'][58]=0;
_$jscoverage['adaptors/persistent.js'][63]=0;
_$jscoverage['adaptors/persistent.js'][164]=0;
_$jscoverage['adaptors/persistent.js'][66]=0;
_$jscoverage['adaptors/persistent.js'][166]=0;
_$jscoverage['adaptors/persistent.js'][76]=0;
_$jscoverage['adaptors/persistent.js'][69]=0;
_$jscoverage['adaptors/persistent.js'][70]=0;
_$jscoverage['adaptors/persistent.js'][72]=0;
_$jscoverage['adaptors/persistent.js'][73]=0;
_$jscoverage['adaptors/persistent.js'][159]=0;
_$jscoverage['adaptors/persistent.js'][102]=0;
_$jscoverage['adaptors/persistent.js'][93]=0;
_$jscoverage['adaptors/persistent.js'][91]=0;
_$jscoverage['adaptors/persistent.js'][90]=0;
_$jscoverage['adaptors/persistent.js'][89]=0;
_$jscoverage['adaptors/persistent.js'][77]=0;
_$jscoverage['adaptors/persistent.js'][179]=0;
_$jscoverage['adaptors/persistent.js'][131]=0;
_$jscoverage['adaptors/persistent.js'][128]=0;
_$jscoverage['adaptors/persistent.js'][103]=0;
_$jscoverage['adaptors/persistent.js'][115]=0;
_$jscoverage['adaptors/persistent.js'][119]=0;
_$jscoverage['adaptors/persistent.js'][117]=0;
_$jscoverage['adaptors/persistent.js'][122]=0;
_$jscoverage['adaptors/persistent.js'][121]=0;
_$jscoverage['adaptors/persistent.js'][197]=0;
_$jscoverage['adaptors/persistent.js'][160]=0;
_$jscoverage['adaptors/persistent.js'][134]=0;
_$jscoverage['adaptors/persistent.js'][145]=0;
_$jscoverage['adaptors/persistent.js'][148]=0;
_$jscoverage['adaptors/persistent.js'][146]=0;
_$jscoverage['adaptors/persistent.js'][211]=0;
_$jscoverage['adaptors/persistent.js'][165]=0;
_$jscoverage['adaptors/persistent.js'][162]=0;
_$jscoverage['adaptors/persistent.js'][163]=0;
_$jscoverage['adaptors/persistent.js'][213]=0;
_$jscoverage['adaptors/persistent.js'][182]=0;
_$jscoverage['adaptors/persistent.js'][181]=0;
_$jscoverage['adaptors/persistent.js'][169]=0;
_$jscoverage['adaptors/persistent.js'][180]=0;
_$jscoverage['adaptors/persistent.js'][210]=0;
_$jscoverage['adaptors/persistent.js'][196]=0;
_$jscoverage['adaptors/persistent.js'][195]=0;
_$jscoverage['adaptors/persistent.js'][185]=0;
_$jscoverage['adaptors/persistent.js'][186]=0;
_$jscoverage['adaptors/persistent.js'][202]=0;
_$jscoverage['adaptors/persistent.js'][212]=0;
_$jscoverage['adaptors/persistent.js'][208]=0;
_$jscoverage['adaptors/persistent.js'][204]=0;
_$jscoverage['adaptors/persistent.js'][206]=0;
_$jscoverage['adaptors/persistent.js'][214]=0;
_$jscoverage['adaptors/persistent.js'][217]=0;
_$jscoverage['adaptors/persistent.js'][222]=0;
_$jscoverage['adaptors/persistent.js'][225]=0;
_$jscoverage['adaptors/persistent.js'][227]=0;
_$jscoverage['adaptors/persistent.js'][236]=0;
}/*jslint node: true */
_$jscoverage['adaptors/persistent.js'][2]++;
"use strict";

_$jscoverage['adaptors/persistent.js'][4]++;
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
_$jscoverage['adaptors/persistent.js'][22]++;
function _isResponseChanged(previous, current) {
    _$jscoverage['adaptors/persistent.js'][23]++;
return JSON.stringify(previous) !== JSON.stringify(current);
}

/**
 * run the given method, if its a function type
 * @param callback - method to call
 * @param err - error to pass in callback
 * @param result - result to pass in callback
 * @private
 */
_$jscoverage['adaptors/persistent.js'][33]++;
function _runCallback(callback, err, result) {
    _$jscoverage['adaptors/persistent.js'][34]++;
if (typeof callback === "function") {
        _$jscoverage['adaptors/persistent.js'][35]++;
log.debug("[Persistent Adaptor] calling given callback");

        _$jscoverage['adaptors/persistent.js'][37]++;
try {
            _$jscoverage['adaptors/persistent.js'][38]++;
callback(err, result);
        }
        catch (e) {
            _$jscoverage['adaptors/persistent.js'][41]++;
log.error("[Persistent Adaptor], exception when calling given method e: " + e);
        }
    }
    else {
        _$jscoverage['adaptors/persistent.js'][45]++;
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
_$jscoverage['adaptors/persistent.js'][58]++;
function _processSingleItem (item) {
    _$jscoverage['adaptors/persistent.js'][59]++;
var currTime = Date.now()
        , delta = currTime - item.firedTime
        , name = item.name;

    _$jscoverage['adaptors/persistent.js'][63]++;
if (delta >= item.persistentDelay) {
        _$jscoverage['adaptors/persistent.js'][64]++;
item.firedTime = currTime;
        _$jscoverage['adaptors/persistent.js'][65]++;
item.bodyTemp = item.bodyTemp || {};
        _$jscoverage['adaptors/persistent.js'][66]++;
batchelor.execute(item, function (err, result) {

            // TODO[omher]: HOW TO REAL CHECK IF THERE IS CHANGED, WITH BODY ?????
            _$jscoverage['adaptors/persistent.js'][69]++;
if (item.ignoreResponse || (!commons.helper.isEmptyObject(result) && result[name] && result[name].body && _isResponseChanged(result[name].body, item.bodyTemp))) {
                _$jscoverage['adaptors/persistent.js'][70]++;
item.bodyTemp = result[name].body;
                // when processing single item, mark it - inin case some one wants to know
                _$jscoverage['adaptors/persistent.js'][72]++;
result.singlePersistenResponse = true;
                _$jscoverage['adaptors/persistent.js'][73]++;
_runCallback(item.callback, err, result);

                // this flag will stop/remove this request from the running requests
                _$jscoverage['adaptors/persistent.js'][76]++;
if (item.stop_persistent_once_change) {
                    _$jscoverage['adaptors/persistent.js'][77]++;
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
_$jscoverage['adaptors/persistent.js'][89]++;
function _startPersist() {
    _$jscoverage['adaptors/persistent.js'][90]++;
setImmediate(function () {
        _$jscoverage['adaptors/persistent.js'][91]++;
eterator.start(0, true,
            function (err, item) {
                _$jscoverage['adaptors/persistent.js'][93]++;
_processSingleItem(item);
            });
    });
}

/**
 * start the persitent polling
 * @private
 */
_$jscoverage['adaptors/persistent.js'][102]++;
function _persist () {
    _$jscoverage['adaptors/persistent.js'][103]++;
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
_$jscoverage['adaptors/persistent.js'][114]++;
function _batchelorCallbackFirstRun(err, result, reqs, callback) {
    _$jscoverage['adaptors/persistent.js'][115]++;
var delays = [], minTime;

    _$jscoverage['adaptors/persistent.js'][117]++;
log.debug("[Persistent Adaptor] _batchelorCallbackFirstRun called with  err: " + err);

    _$jscoverage['adaptors/persistent.js'][119]++;
_.forEach(reqs, function (cReq) {

        _$jscoverage['adaptors/persistent.js'][121]++;
if (utils.validator.isPersistentRequest(cReq)) {
            _$jscoverage['adaptors/persistent.js'][122]++;
delays.push(cReq.persistentDelay || 2000);
        }
    });

    // for the first time, even only one or all the request are persistent, we call the first time to the general callback
    // after we start to persitent every request we will call to every callback from every request if exist
    _$jscoverage['adaptors/persistent.js'][128]++;
_runCallback(callback, err, result);

    // take the minimum timeout - the minimum is the one we will use in the timeout
    _$jscoverage['adaptors/persistent.js'][131]++;
minTime = Math.min.apply(Math, delays);

    _$jscoverage['adaptors/persistent.js'][133]++;
setTimeout(function () {
        _$jscoverage['adaptors/persistent.js'][134]++;
_persist();
    }, minTime);

}

/**
 * process job calling to "batchelor.execute" and waiting for callback to be called from batchelor
 * @param allowReqs - request to process
 * @param callback - general callback
 * @private
 */
_$jscoverage['adaptors/persistent.js'][145]++;
function _process(allowReqs, callback) {
    _$jscoverage['adaptors/persistent.js'][146]++;
log.debug("[Persistent Adaptor] _process calling batchelor.execute ...");

    _$jscoverage['adaptors/persistent.js'][148]++;
batchelor.execute(allowReqs, function(err, result) {
        _$jscoverage['adaptors/persistent.js'][149]++;
_batchelorCallbackFirstRun(err, result, allowReqs, callback);

    });
}

/**
 * method to stop running job, if exist
 * @param jobId - job to stop
 * @returns {boolean}
 */
_$jscoverage['adaptors/persistent.js'][159]++;
function _stop (options) {
    _$jscoverage['adaptors/persistent.js'][160]++;
options = options || {};
    _$jscoverage['adaptors/persistent.js'][161]++;
log.debug("[Persistent Adaptor] stopping jobId : " + options.jobId + " request Id: " + options.reqName);
    _$jscoverage['adaptors/persistent.js'][162]++;
var eteratorProp = eterator.getProperties();
    _$jscoverage['adaptors/persistent.js'][163]++;
eteratorProp.array = eteratorProp.array || [];
    _$jscoverage['adaptors/persistent.js'][164]++;
var index = _.findIndex(eteratorProp.array, { 'name': options.reqName });
    _$jscoverage['adaptors/persistent.js'][165]++;
if (index >= 0) {
        _$jscoverage['adaptors/persistent.js'][166]++;
eterator.removeItem(eteratorProp.array[index]);
    }
    else {
        _$jscoverage['adaptors/persistent.js'][169]++;
log.warn("[Persistent Adaptor] couldn't stop jobId : " + options.jobId + " request Id: " + options.reqId + " given values doesn't exist!");
    }
}


/**
 * set the adaptor configuration + configure batchelor
 * @param cfg - configuration object for the adaptor and batchelor
 * @returns {*} - batchelor configuration
 */
_$jscoverage['adaptors/persistent.js'][179]++;
exports.configure = function (cfg) {
    _$jscoverage['adaptors/persistent.js'][180]++;
config = commons.helper.configure(cfg);
    _$jscoverage['adaptors/persistent.js'][181]++;
log = config.logger || console;
    _$jscoverage['adaptors/persistent.js'][182]++;
return batchelor.configure(cfg);
};

_$jscoverage['adaptors/persistent.js'][185]++;
exports.setBatchelor = function (_batchelor) {
    _$jscoverage['adaptors/persistent.js'][186]++;
batchelor = _batchelor || {};
};

/**
 * entry point of the persistent object
 * @param job - object containing one or more requests
 * @param callback - method to call once the batchelor finish processing job
 * @returns {*} - job id - string
 */
_$jscoverage['adaptors/persistent.js'][195]++;
exports.execute = function (job, callback) {
    _$jscoverage['adaptors/persistent.js'][196]++;
log.debug("[Persistent Adaptor] execute for job: " + JSON.stringify(job));
    _$jscoverage['adaptors/persistent.js'][197]++;
var persistent_requests = []
        , all_requests = []
        , reqs = commons.helper.convert2Array(job)
        , jobId = commons.helper.getUniqueId("jobName" + separator);

    _$jscoverage['adaptors/persistent.js'][202]++;
_.forEach(reqs, function (cReq) {

        _$jscoverage['adaptors/persistent.js'][204]++;
cReq.callback = cReq.callback || callback;

        _$jscoverage['adaptors/persistent.js'][206]++;
if (utils.validator.isValidRequest(cReq)) {

            _$jscoverage['adaptors/persistent.js'][208]++;
all_requests.push(cReq);

            _$jscoverage['adaptors/persistent.js'][210]++;
if (utils.validator.isPersistentRequest(cReq)) {
                _$jscoverage['adaptors/persistent.js'][211]++;
cReq.jobId = jobId;
                _$jscoverage['adaptors/persistent.js'][212]++;
cReq.firedTime = Date.now();
                _$jscoverage['adaptors/persistent.js'][213]++;
cReq.ignoreResponse = cReq.ignoreResponse || false;
                _$jscoverage['adaptors/persistent.js'][214]++;
persistent_requests.push(cReq);
            }
            else {
                _$jscoverage['adaptors/persistent.js'][217]++;
log.debug("[Persistent Adaptor] not a persistent request: " + JSON.stringify(cReq));
            }
        }
    });

    _$jscoverage['adaptors/persistent.js'][222]++;
eterator.addItems(persistent_requests);

    // pass request to process and general callback to call once we finish
    _$jscoverage['adaptors/persistent.js'][225]++;
_process(all_requests, callback);

    _$jscoverage['adaptors/persistent.js'][227]++;
return jobId;

};

/**
 * method to stop running job, if exist
 * @param jobId - job to stop
 * @returns {boolean}
 */
_$jscoverage['adaptors/persistent.js'][236]++;
exports.stop = _stop;