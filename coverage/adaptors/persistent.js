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
'    , Eterator        = require("./../commons/eterator")',
'    , separator     = "_"',
'    , eterator      = new Eterator()',
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
'                _runCallback(item.callback, err, result);',
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
' * @param persistentJob - job to process again and again until its stopped',
' * @private',
' */',
'function _batchelorCallbackFirstRun(err, result, reqs) {',
'    var delays = [], minTime;',
'',
'    log.info("[Persistent Adaptor] _batchelorCallbackFirstRun called with  err: " + err);',
'',
'    _.forEach(reqs, function (cReq) {',
'        var name = cReq.name;',
'',
'        if (utils.validator.isPersistentRequest(cReq)) {',
'            delays.push(cReq.persistentDelay || 2000);',
'        }',
'',
'        _runCallback(cReq.callback, err, result);',
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
'                log.info("[Persistent Adaptor] not a persistent request: " + JSON.stringify(cReq));',
'            }',
'        }',
'    });',
'',
'    eterator.addItems(persistent_requests);',
'',
'    _process(all_requests);',
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
'    var eteratorProp = eterator.getProperties();',
'    eteratorProp.array = eteratorProp.array || [];',
'    var index = _.findIndex(eteratorProp.array, { \'name\': reqId });',
'    if (index >= 0) {',
'        eterator.removeItem(eteratorProp.array[index]);',
'    }',
'    else {',
'        log.warn("[Persistent Adaptor] couldn\'t stop jobId : " + jobId + " request Id: " + reqId + " given values doesn\'t exist!");',
'    }',
'};'];
_$jscoverage['adaptors/persistent.js'][125]=0;
_$jscoverage['adaptors/persistent.js'][2]=0;
_$jscoverage['adaptors/persistent.js'][124]=0;
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
_$jscoverage['adaptors/persistent.js'][151]=0;
_$jscoverage['adaptors/persistent.js'][65]=0;
_$jscoverage['adaptors/persistent.js'][45]=0;
_$jscoverage['adaptors/persistent.js'][59]=0;
_$jscoverage['adaptors/persistent.js'][64]=0;
_$jscoverage['adaptors/persistent.js'][63]=0;
_$jscoverage['adaptors/persistent.js'][58]=0;
_$jscoverage['adaptors/persistent.js'][150]=0;
_$jscoverage['adaptors/persistent.js'][86]=0;
_$jscoverage['adaptors/persistent.js'][83]=0;
_$jscoverage['adaptors/persistent.js'][82]=0;
_$jscoverage['adaptors/persistent.js'][84]=0;
_$jscoverage['adaptors/persistent.js'][70]=0;
_$jscoverage['adaptors/persistent.js'][71]=0;
_$jscoverage['adaptors/persistent.js'][69]=0;
_$jscoverage['adaptors/persistent.js'][66]=0;
_$jscoverage['adaptors/persistent.js'][178]=0;
_$jscoverage['adaptors/persistent.js'][115]=0;
_$jscoverage['adaptors/persistent.js'][114]=0;
_$jscoverage['adaptors/persistent.js'][111]=0;
_$jscoverage['adaptors/persistent.js'][96]=0;
_$jscoverage['adaptors/persistent.js'][112]=0;
_$jscoverage['adaptors/persistent.js'][109]=0;
_$jscoverage['adaptors/persistent.js'][106]=0;
_$jscoverage['adaptors/persistent.js'][107]=0;
_$jscoverage['adaptors/persistent.js'][95]=0;
_$jscoverage['adaptors/persistent.js'][177]=0;
_$jscoverage['adaptors/persistent.js'][138]=0;
_$jscoverage['adaptors/persistent.js'][135]=0;
_$jscoverage['adaptors/persistent.js'][118]=0;
_$jscoverage['adaptors/persistent.js'][122]=0;
_$jscoverage['adaptors/persistent.js'][169]=0;
_$jscoverage['adaptors/persistent.js'][153]=0;
_$jscoverage['adaptors/persistent.js'][139]=0;
_$jscoverage['adaptors/persistent.js'][152]=0;
_$jscoverage['adaptors/persistent.js'][191]=0;
_$jscoverage['adaptors/persistent.js'][175]=0;
_$jscoverage['adaptors/persistent.js'][162]=0;
_$jscoverage['adaptors/persistent.js'][171]=0;
_$jscoverage['adaptors/persistent.js'][163]=0;
_$jscoverage['adaptors/persistent.js'][173]=0;
_$jscoverage['adaptors/persistent.js'][164]=0;
_$jscoverage['adaptors/persistent.js'][204]=0;
_$jscoverage['adaptors/persistent.js'][184]=0;
_$jscoverage['adaptors/persistent.js'][181]=0;
_$jscoverage['adaptors/persistent.js'][180]=0;
_$jscoverage['adaptors/persistent.js'][179]=0;
_$jscoverage['adaptors/persistent.js'][189]=0;
_$jscoverage['adaptors/persistent.js'][193]=0;
_$jscoverage['adaptors/persistent.js'][202]=0;
_$jscoverage['adaptors/persistent.js'][203]=0;
_$jscoverage['adaptors/persistent.js'][205]=0;
_$jscoverage['adaptors/persistent.js'][206]=0;
_$jscoverage['adaptors/persistent.js'][207]=0;
_$jscoverage['adaptors/persistent.js'][208]=0;
_$jscoverage['adaptors/persistent.js'][211]=0;
}/*jslint node: true */
_$jscoverage['adaptors/persistent.js'][2]++;
"use strict";

_$jscoverage['adaptors/persistent.js'][4]++;
var async           = require("async")
    , _             = require("lodash")
    , commons       = require("./../commons")
    , utils         = require("./../utils")
    , batchelor     = require("./../batchelor")
    , Eterator        = require("./../commons/eterator")
    , separator     = "_"
    , eterator      = new Eterator()
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
                _$jscoverage['adaptors/persistent.js'][71]++;
_runCallback(item.callback, err, result);
            }

        });
    }
}

/**
 * start the persistent polling using eterator object
 * @private
 */
_$jscoverage['adaptors/persistent.js'][82]++;
function _startPersist() {
    _$jscoverage['adaptors/persistent.js'][83]++;
setImmediate(function () {
        _$jscoverage['adaptors/persistent.js'][84]++;
eterator.start(0, true,
            function (err, item) {
                _$jscoverage['adaptors/persistent.js'][86]++;
_processSingleItem(item);
            });
    });
}

/**
 * start the persitent polling
 * @private
 */
_$jscoverage['adaptors/persistent.js'][95]++;
function _persist () {
    _$jscoverage['adaptors/persistent.js'][96]++;
_startPersist();
}

/**
 * callback to be called once the batchelor finish processing the job
 * @param err - error passed from batchelor
 * @param result - result passed from batchelor
 * @param persistentJob - job to process again and again until its stopped
 * @private
 */
_$jscoverage['adaptors/persistent.js'][106]++;
function _batchelorCallbackFirstRun(err, result, reqs) {
    _$jscoverage['adaptors/persistent.js'][107]++;
var delays = [], minTime;

    _$jscoverage['adaptors/persistent.js'][109]++;
log.info("[Persistent Adaptor] _batchelorCallbackFirstRun called with  err: " + err);

    _$jscoverage['adaptors/persistent.js'][111]++;
_.forEach(reqs, function (cReq) {
        _$jscoverage['adaptors/persistent.js'][112]++;
var name = cReq.name;

        _$jscoverage['adaptors/persistent.js'][114]++;
if (utils.validator.isPersistentRequest(cReq)) {
            _$jscoverage['adaptors/persistent.js'][115]++;
delays.push(cReq.persistentDelay || 2000);
        }

        _$jscoverage['adaptors/persistent.js'][118]++;
_runCallback(cReq.callback, err, result);
    });

    // take the minimum timeout - the minimum is the one we will use in the timeout
    _$jscoverage['adaptors/persistent.js'][122]++;
minTime = Math.min.apply(Math, delays);

    _$jscoverage['adaptors/persistent.js'][124]++;
setTimeout(function () {
        _$jscoverage['adaptors/persistent.js'][125]++;
_persist();
    }, minTime);

}

/**
 * process job calling to "batchelor.execute" and waiting for callback to be called from batchelor
 * @param _persistentJob
 * @private
 */
_$jscoverage['adaptors/persistent.js'][135]++;
function _process(allowReqs) {
    _$jscoverage['adaptors/persistent.js'][136]++;
log.info("[Persistent Adaptor] _process calling batchelor.execute ...");

    _$jscoverage['adaptors/persistent.js'][138]++;
batchelor.execute(allowReqs, function(err, result) {
        _$jscoverage['adaptors/persistent.js'][139]++;
_batchelorCallbackFirstRun(err, result, allowReqs);

    });
}


/**
 * set the adaptor configuration + configure batchelor
 * @param cfg - configuration object for the adaptor and batchelor
 * @returns {*} - batchelor configuration
 */
_$jscoverage['adaptors/persistent.js'][150]++;
exports.configure = function (cfg) {
    _$jscoverage['adaptors/persistent.js'][151]++;
config = commons.helper.configure(cfg);
    _$jscoverage['adaptors/persistent.js'][152]++;
log = config.logger || console;
    _$jscoverage['adaptors/persistent.js'][153]++;
return batchelor.configure(cfg);
};

/**
 * entry point of the persistent object
 * @param job - object containing one or more requests
 * @param callback - method to call once the batchelor finish processing job
 * @returns {*} - job id - string
 */
_$jscoverage['adaptors/persistent.js'][162]++;
exports.execute = function (job, callback) {
    _$jscoverage['adaptors/persistent.js'][163]++;
log.info("[Persistent Adaptor] execute for job: " + JSON.stringify(job));
    _$jscoverage['adaptors/persistent.js'][164]++;
var persistent_requests = []
        , all_requests = []
        , reqs = commons.helper.convert2Array(job)
        , jobId = commons.helper.getUniqueId("jobName" + separator);

    _$jscoverage['adaptors/persistent.js'][169]++;
_.forEach(reqs, function (cReq) {

        _$jscoverage['adaptors/persistent.js'][171]++;
cReq.callback = cReq.callback || callback;

        _$jscoverage['adaptors/persistent.js'][173]++;
if (utils.validator.isValidRequest(cReq)) {

            _$jscoverage['adaptors/persistent.js'][175]++;
all_requests.push(cReq);

            _$jscoverage['adaptors/persistent.js'][177]++;
if (utils.validator.isPersistentRequest(cReq)) {
                _$jscoverage['adaptors/persistent.js'][178]++;
cReq.jobId = jobId;
                _$jscoverage['adaptors/persistent.js'][179]++;
cReq.firedTime = Date.now();
                _$jscoverage['adaptors/persistent.js'][180]++;
cReq.ignoreResponse = cReq.ignoreResponse || false;
                _$jscoverage['adaptors/persistent.js'][181]++;
persistent_requests.push(cReq);
            }
            else {
                _$jscoverage['adaptors/persistent.js'][184]++;
log.info("[Persistent Adaptor] not a persistent request: " + JSON.stringify(cReq));
            }
        }
    });

    _$jscoverage['adaptors/persistent.js'][189]++;
eterator.addItems(persistent_requests);

    _$jscoverage['adaptors/persistent.js'][191]++;
_process(all_requests);

    _$jscoverage['adaptors/persistent.js'][193]++;
return jobId;

};

/**
 * method to stop running job, if exist
 * @param jobId - job to stop
 * @returns {boolean}
 */
_$jscoverage['adaptors/persistent.js'][202]++;
exports.stop = function (jobId, reqId) {
    _$jscoverage['adaptors/persistent.js'][203]++;
log.info("[Persistent Adaptor] stopping jobId : " + jobId + " request Id: " + reqId);
    _$jscoverage['adaptors/persistent.js'][204]++;
var eteratorProp = eterator.getProperties();
    _$jscoverage['adaptors/persistent.js'][205]++;
eteratorProp.array = eteratorProp.array || [];
    _$jscoverage['adaptors/persistent.js'][206]++;
var index = _.findIndex(eteratorProp.array, { 'name': reqId });
    _$jscoverage['adaptors/persistent.js'][207]++;
if (index >= 0) {
        _$jscoverage['adaptors/persistent.js'][208]++;
eterator.removeItem(eteratorProp.array[index]);
    }
    else {
        _$jscoverage['adaptors/persistent.js'][211]++;
log.warn("[Persistent Adaptor] couldn't stop jobId : " + jobId + " request Id: " + reqId + " given values doesn't exist!");
    }
};