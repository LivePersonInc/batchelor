if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['adaptors/persistent.js'] === 'undefined'){_$jscoverage['adaptors/persistent.js']=[];
_$jscoverage['adaptors/persistent.js'].source=['/*jslint node: true */',
'"use strict";',
'',
'var async           = require("async")',
'    , _             = require("lodash")',
'    , commons       = require("./../commons")',
'    , utils         = require("./../utils")',
'    , batchelor     = require("./../batchelor")',
'    , Runner        = require("./../commons/runner")',
'    , separator     = "_"',
'    , runner',
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
'        log.info("[Persistent Adaptor] calling given callback");',
'',
'        try {',
'            callback(err, result);',
'        }',
'        catch (e) {',
'            log.error("[Persistent Adaptor], exception when calling given method e: " + e);',
'        }',
'    }',
'    else {',
'        log.info("[Persistent Adaptor] not a valid callback");',
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
'        , name = item.name',
'        , callCallback = false;',
'',
'    if (delta >= item.persistentDelay) {',
'        item.firedTime = currTime;',
'        item.bodyTemp = item.bodyTemp || {};',
'        batchelor.execute(item, function (err, result) {',
'',
'            // TODO[omher]: HOW TO REAL CHECK IF THERE IS CHANGED, WITH BODY ?????',
'            if (item.ignoreResponse || (!commons.helper.isEmptyObject(result) && result[name] && result[name].body && _isResponseChanged(result[name].body, item.bodyTemp))) {',
'                item.bodyTemp = result[name].body;',
'                _runCallback(item.callback, err, result);',
'            }',
'',
'        });',
'    }',
'}',
'',
'function _startPersist () {',
'    setImmediate(runner.start(0, false,',
'        function (err, item) {',
'            _processSingleItem(item);',
'        },',
'        function () {',
'            setTimeout(function () {',
'                _startPersist();',
'            }, 0);',
'        }));',
'',
'}',
'',
'function _persist () {',
'    _startPersist();',
'}',
'',
'/**',
' * callback to be called once the batchelor finish processing the job',
' * @param err - error passed from batchelor',
' * @param result - result passed from batchelor',
' * @param persistentJob - job to process again and again until its stopped',
' * @private',
' */',
'function _batchelorCallbackFirstRun(err, result, reqs) {',
'    var delays = [], minTime;',
'',
'    log.error("[Persistent Adaptor] _batchelorCallbackFirstRun called with  err: " + err);',
'',
'    _.forEach(reqs, function (cReq) {',
'        var name = cReq.name;',
'',
'        if (utils.validator.isPersistentRequest(cReq)) {',
'            delays.push(cReq.persistentDelay || 2000);',
'        }',
'',
'        _runCallback(cReq.callback, err, result[name]);',
'    });',
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
' * @param _persistentJob',
' * @private',
' */',
'function _process(allowReqs) {',
'    log.info("[Persistent Adaptor] _process calling batchelor.execute ...");',
'',
'    batchelor.execute(allowReqs, function(err, result) {',
'        _batchelorCallbackFirstRun(err, result, allowReqs);',
'',
'    });',
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
'/**',
' * entry point of the persistent object',
' * @param job - object containing one or more requests',
' * @param callback - method to call once the batchelor finish processing job',
' * @returns {*} - job id - string',
' */',
'exports.execute = function (job, callback) {',
'    log.info("[Persistent Adaptor] execute for job: " + JSON.stringify(job));',
'    var allowReqs = [];',
'    var reqs = commons.helper.convert2Array(job);',
'    var jobId = commons.helper.getUniqueId("jobName" + separator);',
'',
'    _.forEach(reqs, function (cReq) {',
'',
'        cReq.callback = cReq.callback || callback;',
'',
'        if (utils.validator.isPersistentRequest(cReq) && utils.validator.isValidRequest(cReq)) {',
'            cReq.jobId = jobId;',
'            cReq.firedTime = Date.now();',
'            cReq.ignoreResponse = cReq.ignoreResponse || false;',
'            allowReqs.push(cReq);',
'        }',
'        else {',
'            log.error("[Persistent Adaptor] not a persistent request: " + JSON.stringify(cReq));',
'        }',
'    });',
'    runner = new Runner(allowReqs);',
'    _process(reqs);',
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
'exports.stop = function (jobId, reqId) {',
'    log.info("[Persistent Adaptor] stopping jobId : " + jobId + " request Id: " + reqId);',
'    var runnerProp = runner.getProperties();',
'    runnerProp.array = runnerProp.array || [];',
'    var indexOf = _.findIndex(runnerProp.array, { \'name\': reqId });',
'',
'    if (indexOf >= 0) {',
'        runner.stop();',
'        runner.removeItem(indexOf);',
'        runner.resume();',
'    }',
'    else {',
'        log.warn("[Persistent Adaptor] couldn\'t stop jobId : " + jobId + " request Id: " + reqId + " given values doesn\'t exist!");',
'    }',
'};'];
_$jscoverage['adaptors/persistent.js'][121]=0;
_$jscoverage['adaptors/persistent.js'][2]=0;
_$jscoverage['adaptors/persistent.js'][103]=0;
_$jscoverage['adaptors/persistent.js'][23]=0;
_$jscoverage['adaptors/persistent.js'][22]=0;
_$jscoverage['adaptors/persistent.js'][4]=0;
_$jscoverage['adaptors/persistent.js'][136]=0;
_$jscoverage['adaptors/persistent.js'][41]=0;
_$jscoverage['adaptors/persistent.js'][37]=0;
_$jscoverage['adaptors/persistent.js'][34]=0;
_$jscoverage['adaptors/persistent.js'][33]=0;
_$jscoverage['adaptors/persistent.js'][35]=0;
_$jscoverage['adaptors/persistent.js'][38]=0;
_$jscoverage['adaptors/persistent.js'][148]=0;
_$jscoverage['adaptors/persistent.js'][66]=0;
_$jscoverage['adaptors/persistent.js'][45]=0;
_$jscoverage['adaptors/persistent.js'][59]=0;
_$jscoverage['adaptors/persistent.js'][65]=0;
_$jscoverage['adaptors/persistent.js'][64]=0;
_$jscoverage['adaptors/persistent.js'][58]=0;
_$jscoverage['adaptors/persistent.js'][160]=0;
_$jscoverage['adaptors/persistent.js'][82]=0;
_$jscoverage['adaptors/persistent.js'][71]=0;
_$jscoverage['adaptors/persistent.js'][80]=0;
_$jscoverage['adaptors/persistent.js'][79]=0;
_$jscoverage['adaptors/persistent.js'][72]=0;
_$jscoverage['adaptors/persistent.js'][70]=0;
_$jscoverage['adaptors/persistent.js'][67]=0;
_$jscoverage['adaptors/persistent.js'][167]=0;
_$jscoverage['adaptors/persistent.js'][106]=0;
_$jscoverage['adaptors/persistent.js'][86]=0;
_$jscoverage['adaptors/persistent.js'][85]=0;
_$jscoverage['adaptors/persistent.js'][93]=0;
_$jscoverage['adaptors/persistent.js'][92]=0;
_$jscoverage['adaptors/persistent.js'][104]=0;
_$jscoverage['adaptors/persistent.js'][172]=0;
_$jscoverage['adaptors/persistent.js'][122]=0;
_$jscoverage['adaptors/persistent.js'][108]=0;
_$jscoverage['adaptors/persistent.js'][119]=0;
_$jscoverage['adaptors/persistent.js'][115]=0;
_$jscoverage['adaptors/persistent.js'][109]=0;
_$jscoverage['adaptors/persistent.js'][112]=0;
_$jscoverage['adaptors/persistent.js'][111]=0;
_$jscoverage['adaptors/persistent.js'][165]=0;
_$jscoverage['adaptors/persistent.js'][149]=0;
_$jscoverage['adaptors/persistent.js'][147]=0;
_$jscoverage['adaptors/persistent.js'][132]=0;
_$jscoverage['adaptors/persistent.js'][133]=0;
_$jscoverage['adaptors/persistent.js'][135]=0;
_$jscoverage['adaptors/persistent.js'][182]=0;
_$jscoverage['adaptors/persistent.js'][163]=0;
_$jscoverage['adaptors/persistent.js'][159]=0;
_$jscoverage['adaptors/persistent.js'][162]=0;
_$jscoverage['adaptors/persistent.js'][161]=0;
_$jscoverage['adaptors/persistent.js'][150]=0;
_$jscoverage['adaptors/persistent.js'][193]=0;
_$jscoverage['adaptors/persistent.js'][176]=0;
_$jscoverage['adaptors/persistent.js'][173]=0;
_$jscoverage['adaptors/persistent.js'][169]=0;
_$jscoverage['adaptors/persistent.js'][170]=0;
_$jscoverage['adaptors/persistent.js'][171]=0;
_$jscoverage['adaptors/persistent.js'][198]=0;
_$jscoverage['adaptors/persistent.js'][180]=0;
_$jscoverage['adaptors/persistent.js'][179]=0;
_$jscoverage['adaptors/persistent.js'][191]=0;
_$jscoverage['adaptors/persistent.js'][192]=0;
_$jscoverage['adaptors/persistent.js'][194]=0;
_$jscoverage['adaptors/persistent.js'][195]=0;
_$jscoverage['adaptors/persistent.js'][197]=0;
_$jscoverage['adaptors/persistent.js'][199]=0;
_$jscoverage['adaptors/persistent.js'][200]=0;
_$jscoverage['adaptors/persistent.js'][203]=0;
}/*jslint node: true */
_$jscoverage['adaptors/persistent.js'][2]++;
"use strict";

_$jscoverage['adaptors/persistent.js'][4]++;
var async           = require("async")
    , _             = require("lodash")
    , commons       = require("./../commons")
    , utils         = require("./../utils")
    , batchelor     = require("./../batchelor")
    , Runner        = require("./../commons/runner")
    , separator     = "_"
    , runner
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
log.info("[Persistent Adaptor] calling given callback");

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
log.info("[Persistent Adaptor] not a valid callback");
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
        , name = item.name
        , callCallback = false;

    _$jscoverage['adaptors/persistent.js'][64]++;
if (delta >= item.persistentDelay) {
        _$jscoverage['adaptors/persistent.js'][65]++;
item.firedTime = currTime;
        _$jscoverage['adaptors/persistent.js'][66]++;
item.bodyTemp = item.bodyTemp || {};
        _$jscoverage['adaptors/persistent.js'][67]++;
batchelor.execute(item, function (err, result) {

            // TODO[omher]: HOW TO REAL CHECK IF THERE IS CHANGED, WITH BODY ?????
            _$jscoverage['adaptors/persistent.js'][70]++;
if (item.ignoreResponse || (!commons.helper.isEmptyObject(result) && result[name] && result[name].body && _isResponseChanged(result[name].body, item.bodyTemp))) {
                _$jscoverage['adaptors/persistent.js'][71]++;
item.bodyTemp = result[name].body;
                _$jscoverage['adaptors/persistent.js'][72]++;
_runCallback(item.callback, err, result);
            }

        });
    }
}

_$jscoverage['adaptors/persistent.js'][79]++;
function _startPersist () {
    _$jscoverage['adaptors/persistent.js'][80]++;
setImmediate(runner.start(0, false,
        function (err, item) {
            _$jscoverage['adaptors/persistent.js'][82]++;
_processSingleItem(item);
        },
        function () {
            _$jscoverage['adaptors/persistent.js'][85]++;
setTimeout(function () {
                _$jscoverage['adaptors/persistent.js'][86]++;
_startPersist();
            }, 0);
        }));

}

_$jscoverage['adaptors/persistent.js'][92]++;
function _persist () {
    _$jscoverage['adaptors/persistent.js'][93]++;
_startPersist();
}

/**
 * callback to be called once the batchelor finish processing the job
 * @param err - error passed from batchelor
 * @param result - result passed from batchelor
 * @param persistentJob - job to process again and again until its stopped
 * @private
 */
_$jscoverage['adaptors/persistent.js'][103]++;
function _batchelorCallbackFirstRun(err, result, reqs) {
    _$jscoverage['adaptors/persistent.js'][104]++;
var delays = [], minTime;

    _$jscoverage['adaptors/persistent.js'][106]++;
log.error("[Persistent Adaptor] _batchelorCallbackFirstRun called with  err: " + err);

    _$jscoverage['adaptors/persistent.js'][108]++;
_.forEach(reqs, function (cReq) {
        _$jscoverage['adaptors/persistent.js'][109]++;
var name = cReq.name;

        _$jscoverage['adaptors/persistent.js'][111]++;
if (utils.validator.isPersistentRequest(cReq)) {
            _$jscoverage['adaptors/persistent.js'][112]++;
delays.push(cReq.persistentDelay || 2000);
        }

        _$jscoverage['adaptors/persistent.js'][115]++;
_runCallback(cReq.callback, err, result[name]);
    });

    // take the minimum timeout - the minimum is the one we will use in the timeout
    _$jscoverage['adaptors/persistent.js'][119]++;
minTime = Math.min.apply(Math, delays);

    _$jscoverage['adaptors/persistent.js'][121]++;
setTimeout(function () {
        _$jscoverage['adaptors/persistent.js'][122]++;
_persist();
    }, minTime);

}

/**
 * process job calling to "batchelor.execute" and waiting for callback to be called from batchelor
 * @param _persistentJob
 * @private
 */
_$jscoverage['adaptors/persistent.js'][132]++;
function _process(allowReqs) {
    _$jscoverage['adaptors/persistent.js'][133]++;
log.info("[Persistent Adaptor] _process calling batchelor.execute ...");

    _$jscoverage['adaptors/persistent.js'][135]++;
batchelor.execute(allowReqs, function(err, result) {
        _$jscoverage['adaptors/persistent.js'][136]++;
_batchelorCallbackFirstRun(err, result, allowReqs);

    });
}


/**
 * set the adaptor configuration + configure batchelor
 * @param cfg - configuration object for the adaptor and batchelor
 * @returns {*} - batchelor configuration
 */
_$jscoverage['adaptors/persistent.js'][147]++;
exports.configure = function (cfg) {
    _$jscoverage['adaptors/persistent.js'][148]++;
config = commons.helper.configure(cfg);
    _$jscoverage['adaptors/persistent.js'][149]++;
log = config.logger || console;
    _$jscoverage['adaptors/persistent.js'][150]++;
return batchelor.configure(cfg);
};

/**
 * entry point of the persistent object
 * @param job - object containing one or more requests
 * @param callback - method to call once the batchelor finish processing job
 * @returns {*} - job id - string
 */
_$jscoverage['adaptors/persistent.js'][159]++;
exports.execute = function (job, callback) {
    _$jscoverage['adaptors/persistent.js'][160]++;
log.info("[Persistent Adaptor] execute for job: " + JSON.stringify(job));
    _$jscoverage['adaptors/persistent.js'][161]++;
var allowReqs = [];
    _$jscoverage['adaptors/persistent.js'][162]++;
var reqs = commons.helper.convert2Array(job);
    _$jscoverage['adaptors/persistent.js'][163]++;
var jobId = commons.helper.getUniqueId("jobName" + separator);

    _$jscoverage['adaptors/persistent.js'][165]++;
_.forEach(reqs, function (cReq) {

        _$jscoverage['adaptors/persistent.js'][167]++;
cReq.callback = cReq.callback || callback;

        _$jscoverage['adaptors/persistent.js'][169]++;
if (utils.validator.isPersistentRequest(cReq) && utils.validator.isValidRequest(cReq)) {
            _$jscoverage['adaptors/persistent.js'][170]++;
cReq.jobId = jobId;
            _$jscoverage['adaptors/persistent.js'][171]++;
cReq.firedTime = Date.now();
            _$jscoverage['adaptors/persistent.js'][172]++;
cReq.ignoreResponse = cReq.ignoreResponse || false;
            _$jscoverage['adaptors/persistent.js'][173]++;
allowReqs.push(cReq);
        }
        else {
            _$jscoverage['adaptors/persistent.js'][176]++;
log.error("[Persistent Adaptor] not a persistent request: " + JSON.stringify(cReq));
        }
    });
    _$jscoverage['adaptors/persistent.js'][179]++;
runner = new Runner(allowReqs);
    _$jscoverage['adaptors/persistent.js'][180]++;
_process(reqs);

    _$jscoverage['adaptors/persistent.js'][182]++;
return jobId;

};

/**
 * method to stop running job, if exist
 * @param jobId - job to stop
 * @returns {boolean}
 */
_$jscoverage['adaptors/persistent.js'][191]++;
exports.stop = function (jobId, reqId) {
    _$jscoverage['adaptors/persistent.js'][192]++;
log.info("[Persistent Adaptor] stopping jobId : " + jobId + " request Id: " + reqId);
    _$jscoverage['adaptors/persistent.js'][193]++;
var runnerProp = runner.getProperties();
    _$jscoverage['adaptors/persistent.js'][194]++;
runnerProp.array = runnerProp.array || [];
    _$jscoverage['adaptors/persistent.js'][195]++;
var indexOf = _.findIndex(runnerProp.array, { 'name': reqId });

    _$jscoverage['adaptors/persistent.js'][197]++;
if (indexOf >= 0) {
        _$jscoverage['adaptors/persistent.js'][198]++;
runner.stop();
        _$jscoverage['adaptors/persistent.js'][199]++;
runner.removeItem(indexOf);
        _$jscoverage['adaptors/persistent.js'][200]++;
runner.resume();
    }
    else {
        _$jscoverage['adaptors/persistent.js'][203]++;
log.warn("[Persistent Adaptor] couldn't stop jobId : " + jobId + " request Id: " + reqId + " given values doesn't exist!");
    }
};