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
'/**',
' * method to stop running job, if exist',
' * @param jobId - job to stop',
' * @returns {boolean}',
' */',
'function _stop (options) {',
'    options = options || {};',
'    log.info("[Persistent Adaptor] stopping jobId : " + options.jobId + " request Id: " + options.reqId);',
'    var eteratorProp = eterator.getProperties();',
'    eteratorProp.array = eteratorProp.array || [];',
'    var index = _.findIndex(eteratorProp.array, { \'name\': options.reqId });',
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
'exports.stop = _stop;'];
_$jscoverage['adaptors/persistent.js'][129]=0;
_$jscoverage['adaptors/persistent.js'][2]=0;
_$jscoverage['adaptors/persistent.js'][111]=0;
_$jscoverage['adaptors/persistent.js'][23]=0;
_$jscoverage['adaptors/persistent.js'][22]=0;
_$jscoverage['adaptors/persistent.js'][4]=0;
_$jscoverage['adaptors/persistent.js'][144]=0;
_$jscoverage['adaptors/persistent.js'][41]=0;
_$jscoverage['adaptors/persistent.js'][37]=0;
_$jscoverage['adaptors/persistent.js'][34]=0;
_$jscoverage['adaptors/persistent.js'][33]=0;
_$jscoverage['adaptors/persistent.js'][35]=0;
_$jscoverage['adaptors/persistent.js'][38]=0;
_$jscoverage['adaptors/persistent.js'][156]=0;
_$jscoverage['adaptors/persistent.js'][65]=0;
_$jscoverage['adaptors/persistent.js'][45]=0;
_$jscoverage['adaptors/persistent.js'][59]=0;
_$jscoverage['adaptors/persistent.js'][64]=0;
_$jscoverage['adaptors/persistent.js'][58]=0;
_$jscoverage['adaptors/persistent.js'][63]=0;
_$jscoverage['adaptors/persistent.js'][159]=0;
_$jscoverage['adaptors/persistent.js'][66]=0;
_$jscoverage['adaptors/persistent.js'][161]=0;
_$jscoverage['adaptors/persistent.js'][91]=0;
_$jscoverage['adaptors/persistent.js'][88]=0;
_$jscoverage['adaptors/persistent.js'][87]=0;
_$jscoverage['adaptors/persistent.js'][89]=0;
_$jscoverage['adaptors/persistent.js'][69]=0;
_$jscoverage['adaptors/persistent.js'][70]=0;
_$jscoverage['adaptors/persistent.js'][71]=0;
_$jscoverage['adaptors/persistent.js'][75]=0;
_$jscoverage['adaptors/persistent.js'][74]=0;
_$jscoverage['adaptors/persistent.js'][176]=0;
_$jscoverage['adaptors/persistent.js'][119]=0;
_$jscoverage['adaptors/persistent.js'][116]=0;
_$jscoverage['adaptors/persistent.js'][101]=0;
_$jscoverage['adaptors/persistent.js'][100]=0;
_$jscoverage['adaptors/persistent.js'][112]=0;
_$jscoverage['adaptors/persistent.js'][117]=0;
_$jscoverage['adaptors/persistent.js'][114]=0;
_$jscoverage['adaptors/persistent.js'][180]=0;
_$jscoverage['adaptors/persistent.js'][141]=0;
_$jscoverage['adaptors/persistent.js'][140]=0;
_$jscoverage['adaptors/persistent.js'][123]=0;
_$jscoverage['adaptors/persistent.js'][120]=0;
_$jscoverage['adaptors/persistent.js'][127]=0;
_$jscoverage['adaptors/persistent.js'][130]=0;
_$jscoverage['adaptors/persistent.js'][203]=0;
_$jscoverage['adaptors/persistent.js'][158]=0;
_$jscoverage['adaptors/persistent.js'][157]=0;
_$jscoverage['adaptors/persistent.js'][143]=0;
_$jscoverage['adaptors/persistent.js'][154]=0;
_$jscoverage['adaptors/persistent.js'][155]=0;
_$jscoverage['adaptors/persistent.js'][208]=0;
_$jscoverage['adaptors/persistent.js'][175]=0;
_$jscoverage['adaptors/persistent.js'][174]=0;
_$jscoverage['adaptors/persistent.js'][164]=0;
_$jscoverage['adaptors/persistent.js'][160]=0;
_$jscoverage['adaptors/persistent.js'][212]=0;
_$jscoverage['adaptors/persistent.js'][191]=0;
_$jscoverage['adaptors/persistent.js'][190]=0;
_$jscoverage['adaptors/persistent.js'][181]=0;
_$jscoverage['adaptors/persistent.js'][177]=0;
_$jscoverage['adaptors/persistent.js'][197]=0;
_$jscoverage['adaptors/persistent.js'][207]=0;
_$jscoverage['adaptors/persistent.js'][199]=0;
_$jscoverage['adaptors/persistent.js'][192]=0;
_$jscoverage['adaptors/persistent.js'][205]=0;
_$jscoverage['adaptors/persistent.js'][201]=0;
_$jscoverage['adaptors/persistent.js'][206]=0;
_$jscoverage['adaptors/persistent.js'][209]=0;
_$jscoverage['adaptors/persistent.js'][217]=0;
_$jscoverage['adaptors/persistent.js'][219]=0;
_$jscoverage['adaptors/persistent.js'][221]=0;
_$jscoverage['adaptors/persistent.js'][230]=0;
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

                // this flag will stop/remove this request from the running requests
                _$jscoverage['adaptors/persistent.js'][74]++;
if (item.stop_persistent_once_change) {
                    _$jscoverage['adaptors/persistent.js'][75]++;
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
_$jscoverage['adaptors/persistent.js'][87]++;
function _startPersist() {
    _$jscoverage['adaptors/persistent.js'][88]++;
setImmediate(function () {
        _$jscoverage['adaptors/persistent.js'][89]++;
eterator.start(0, true,
            function (err, item) {
                _$jscoverage['adaptors/persistent.js'][91]++;
_processSingleItem(item);
            });
    });
}

/**
 * start the persitent polling
 * @private
 */
_$jscoverage['adaptors/persistent.js'][100]++;
function _persist () {
    _$jscoverage['adaptors/persistent.js'][101]++;
_startPersist();
}

/**
 * callback to be called once the batchelor finish processing the job
 * @param err - error passed from batchelor
 * @param result - result passed from batchelor
 * @param persistentJob - job to process again and again until its stopped
 * @private
 */
_$jscoverage['adaptors/persistent.js'][111]++;
function _batchelorCallbackFirstRun(err, result, reqs) {
    _$jscoverage['adaptors/persistent.js'][112]++;
var delays = [], minTime;

    _$jscoverage['adaptors/persistent.js'][114]++;
log.info("[Persistent Adaptor] _batchelorCallbackFirstRun called with  err: " + err);

    _$jscoverage['adaptors/persistent.js'][116]++;
_.forEach(reqs, function (cReq) {
        _$jscoverage['adaptors/persistent.js'][117]++;
var name = cReq.name;

        _$jscoverage['adaptors/persistent.js'][119]++;
if (utils.validator.isPersistentRequest(cReq)) {
            _$jscoverage['adaptors/persistent.js'][120]++;
delays.push(cReq.persistentDelay || 2000);
        }

        _$jscoverage['adaptors/persistent.js'][123]++;
_runCallback(cReq.callback, err, result);
    });

    // take the minimum timeout - the minimum is the one we will use in the timeout
    _$jscoverage['adaptors/persistent.js'][127]++;
minTime = Math.min.apply(Math, delays);

    _$jscoverage['adaptors/persistent.js'][129]++;
setTimeout(function () {
        _$jscoverage['adaptors/persistent.js'][130]++;
_persist();
    }, minTime);

}

/**
 * process job calling to "batchelor.execute" and waiting for callback to be called from batchelor
 * @param _persistentJob
 * @private
 */
_$jscoverage['adaptors/persistent.js'][140]++;
function _process(allowReqs) {
    _$jscoverage['adaptors/persistent.js'][141]++;
log.info("[Persistent Adaptor] _process calling batchelor.execute ...");

    _$jscoverage['adaptors/persistent.js'][143]++;
batchelor.execute(allowReqs, function(err, result) {
        _$jscoverage['adaptors/persistent.js'][144]++;
_batchelorCallbackFirstRun(err, result, allowReqs);

    });
}

/**
 * method to stop running job, if exist
 * @param jobId - job to stop
 * @returns {boolean}
 */
_$jscoverage['adaptors/persistent.js'][154]++;
function _stop (options) {
    _$jscoverage['adaptors/persistent.js'][155]++;
options = options || {};
    _$jscoverage['adaptors/persistent.js'][156]++;
log.info("[Persistent Adaptor] stopping jobId : " + options.jobId + " request Id: " + options.reqId);
    _$jscoverage['adaptors/persistent.js'][157]++;
var eteratorProp = eterator.getProperties();
    _$jscoverage['adaptors/persistent.js'][158]++;
eteratorProp.array = eteratorProp.array || [];
    _$jscoverage['adaptors/persistent.js'][159]++;
var index = _.findIndex(eteratorProp.array, { 'name': options.reqId });
    _$jscoverage['adaptors/persistent.js'][160]++;
if (index >= 0) {
        _$jscoverage['adaptors/persistent.js'][161]++;
eterator.removeItem(eteratorProp.array[index]);
    }
    else {
        _$jscoverage['adaptors/persistent.js'][164]++;
log.warn("[Persistent Adaptor] couldn't stop jobId : " + options.jobId + " request Id: " + options.reqId + " given values doesn't exist!");
    }
}


/**
 * set the adaptor configuration + configure batchelor
 * @param cfg - configuration object for the adaptor and batchelor
 * @returns {*} - batchelor configuration
 */
_$jscoverage['adaptors/persistent.js'][174]++;
exports.configure = function (cfg) {
    _$jscoverage['adaptors/persistent.js'][175]++;
config = commons.helper.configure(cfg);
    _$jscoverage['adaptors/persistent.js'][176]++;
log = config.logger || console;
    _$jscoverage['adaptors/persistent.js'][177]++;
return batchelor.configure(cfg);
};

_$jscoverage['adaptors/persistent.js'][180]++;
exports.setBatchelor = function (_batchelor) {
    _$jscoverage['adaptors/persistent.js'][181]++;
batchelor = _batchelor || {};
};

/**
 * entry point of the persistent object
 * @param job - object containing one or more requests
 * @param callback - method to call once the batchelor finish processing job
 * @returns {*} - job id - string
 */
_$jscoverage['adaptors/persistent.js'][190]++;
exports.execute = function (job, callback) {
    _$jscoverage['adaptors/persistent.js'][191]++;
log.info("[Persistent Adaptor] execute for job: " + JSON.stringify(job));
    _$jscoverage['adaptors/persistent.js'][192]++;
var persistent_requests = []
        , all_requests = []
        , reqs = commons.helper.convert2Array(job)
        , jobId = commons.helper.getUniqueId("jobName" + separator);

    _$jscoverage['adaptors/persistent.js'][197]++;
_.forEach(reqs, function (cReq) {

        _$jscoverage['adaptors/persistent.js'][199]++;
cReq.callback = cReq.callback || callback;

        _$jscoverage['adaptors/persistent.js'][201]++;
if (utils.validator.isValidRequest(cReq)) {

            _$jscoverage['adaptors/persistent.js'][203]++;
all_requests.push(cReq);

            _$jscoverage['adaptors/persistent.js'][205]++;
if (utils.validator.isPersistentRequest(cReq)) {
                _$jscoverage['adaptors/persistent.js'][206]++;
cReq.jobId = jobId;
                _$jscoverage['adaptors/persistent.js'][207]++;
cReq.firedTime = Date.now();
                _$jscoverage['adaptors/persistent.js'][208]++;
cReq.ignoreResponse = cReq.ignoreResponse || false;
                _$jscoverage['adaptors/persistent.js'][209]++;
persistent_requests.push(cReq);
            }
            else {
                _$jscoverage['adaptors/persistent.js'][212]++;
log.info("[Persistent Adaptor] not a persistent request: " + JSON.stringify(cReq));
            }
        }
    });

    _$jscoverage['adaptors/persistent.js'][217]++;
eterator.addItems(persistent_requests);

    _$jscoverage['adaptors/persistent.js'][219]++;
_process(all_requests);

    _$jscoverage['adaptors/persistent.js'][221]++;
return jobId;

};

/**
 * method to stop running job, if exist
 * @param jobId - job to stop
 * @returns {boolean}
 */
_$jscoverage['adaptors/persistent.js'][230]++;
exports.stop = _stop;