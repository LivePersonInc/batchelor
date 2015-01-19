if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['lib/negotiator.js'] === 'undefined'){_$jscoverage['lib/negotiator.js']=[];
_$jscoverage['lib/negotiator.js'].source=['/*jslint node: true */',
'\'use strict\';',
'var _           = require("lodash")',
'    , config    = require(\'./../config/config.json\')',
'    , processor = require(\'./../lib/processor\')',
'    , commons   = require(\'./../commons\')',
'    , utils     = require(\'./../utils\')',
'    ,log;',
'',
'/**',
' * helper method that configure the given object',
' * @param obj - target object',
' * @param cfg - source object',
' * @private',
' */',
'function _configure(obj, cfg) {',
'    obj.configure(cfg);',
'}',
'',
'/**',
' * method building the request for the running process',
' * @param job - single request or multiple request',
' * @returns {{supported: Array, unsupported: {}}}',
' * @private',
' */',
'function _prepareRequests(job) {',
'    log.info("[batchelor] _prepareRequests");',
'    var _requests = {',
'        supported: [],',
'        unsupported: {}',
'    };',
'    _.forEach(job, function (cReq) {',
'        cReq = commons.helper.setDefaultValues(config.request_default_values, cReq);',
'        if (utils.validator.isValidRequest(cReq) && utils.validator.isValidURL(cReq.url)) {',
'            cReq = utils.validator.cleanRequest(cReq);',
'            _requests.supported.push(cReq);',
'        }',
'        else {',
'            _requests.unsupported[cReq.name || "missingName"] = utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.INVALID_TASK);',
'        }',
'    });',
'',
'    return _requests;',
'}',
'',
'/**',
' * configure the batchelor object and utils library',
' * @param cfg',
' */',
'exports.configure = function (cfg) {',
'    config = commons.helper.configure(cfg);',
'    log = config.logger || console;',
'    _configure(utils, config);',
'    _configure(processor, config);',
'    return config;',
'};',
'',
'/**',
' * this is the entry point for the batchelor utility',
' * @param job - a object containing a single requests or multiple request to be fetch',
' * @param callback - callback  method to be called once the request are performed',
' * @returns {jobId}',
' */',
'exports.execute = function (job, callback) {',
'    job = commons.helper.convert2Array(job);',
'    var _reqs = _prepareRequests(job);',
'    var jobId = utils.jobHolder.addJob(_reqs.supported.slice(0));',
'',
'    log.info("[batchelor] Processing Job # " + jobId);',
'',
'    processor.run(_reqs.supported, function (err, result) {',
'        utils.jobHolder.clean(jobId);',
'        if (err) {',
'            return callback(err);',
'        }',
'        else {',
'            result = commons.helper.merge(_reqs.unsupported, result);',
'            _reqs.supported.length = 0;',
'            delete _reqs.supported;',
'            _reqs.unsupported = null;',
'            delete _reqs.unsupported;',
'            return callback(null, result);',
'        }',
'    });',
'',
'    return jobId;',
'};'];
_$jscoverage['lib/negotiator.js'][55]=0;
_$jscoverage['lib/negotiator.js'][2]=0;
_$jscoverage['lib/negotiator.js'][50]=0;
_$jscoverage['lib/negotiator.js'][17]=0;
_$jscoverage['lib/negotiator.js'][16]=0;
_$jscoverage['lib/negotiator.js'][3]=0;
_$jscoverage['lib/negotiator.js'][66]=0;
_$jscoverage['lib/negotiator.js'][33]=0;
_$jscoverage['lib/negotiator.js'][27]=0;
_$jscoverage['lib/negotiator.js'][28]=0;
_$jscoverage['lib/negotiator.js'][26]=0;
_$jscoverage['lib/negotiator.js'][32]=0;
_$jscoverage['lib/negotiator.js'][72]=0;
_$jscoverage['lib/negotiator.js'][43]=0;
_$jscoverage['lib/negotiator.js'][34]=0;
_$jscoverage['lib/negotiator.js'][35]=0;
_$jscoverage['lib/negotiator.js'][36]=0;
_$jscoverage['lib/negotiator.js'][39]=0;
_$jscoverage['lib/negotiator.js'][78]=0;
_$jscoverage['lib/negotiator.js'][54]=0;
_$jscoverage['lib/negotiator.js'][53]=0;
_$jscoverage['lib/negotiator.js'][52]=0;
_$jscoverage['lib/negotiator.js'][51]=0;
_$jscoverage['lib/negotiator.js'][80]=0;
_$jscoverage['lib/negotiator.js'][64]=0;
_$jscoverage['lib/negotiator.js'][81]=0;
_$jscoverage['lib/negotiator.js'][69]=0;
_$jscoverage['lib/negotiator.js'][65]=0;
_$jscoverage['lib/negotiator.js'][67]=0;
_$jscoverage['lib/negotiator.js'][71]=0;
_$jscoverage['lib/negotiator.js'][73]=0;
_$jscoverage['lib/negotiator.js'][74]=0;
_$jscoverage['lib/negotiator.js'][77]=0;
_$jscoverage['lib/negotiator.js'][79]=0;
_$jscoverage['lib/negotiator.js'][82]=0;
_$jscoverage['lib/negotiator.js'][86]=0;
}/*jslint node: true */
_$jscoverage['lib/negotiator.js'][2]++;
'use strict';
_$jscoverage['lib/negotiator.js'][3]++;
var _           = require("lodash")
    , config    = require('./../config/config.json')
    , processor = require('./../lib/processor')
    , commons   = require('./../commons')
    , utils     = require('./../utils')
    ,log;

/**
 * helper method that configure the given object
 * @param obj - target object
 * @param cfg - source object
 * @private
 */
_$jscoverage['lib/negotiator.js'][16]++;
function _configure(obj, cfg) {
    _$jscoverage['lib/negotiator.js'][17]++;
obj.configure(cfg);
}

/**
 * method building the request for the running process
 * @param job - single request or multiple request
 * @returns {{supported: Array, unsupported: {}}}
 * @private
 */
_$jscoverage['lib/negotiator.js'][26]++;
function _prepareRequests(job) {
    _$jscoverage['lib/negotiator.js'][27]++;
log.info("[batchelor] _prepareRequests");
    _$jscoverage['lib/negotiator.js'][28]++;
var _requests = {
        supported: [],
        unsupported: {}
    };
    _$jscoverage['lib/negotiator.js'][32]++;
_.forEach(job, function (cReq) {
        _$jscoverage['lib/negotiator.js'][33]++;
cReq = commons.helper.setDefaultValues(config.request_default_values, cReq);
        _$jscoverage['lib/negotiator.js'][34]++;
if (utils.validator.isValidRequest(cReq) && utils.validator.isValidURL(cReq.url)) {
            _$jscoverage['lib/negotiator.js'][35]++;
cReq = utils.validator.cleanRequest(cReq);
            _$jscoverage['lib/negotiator.js'][36]++;
_requests.supported.push(cReq);
        }
        else {
            _$jscoverage['lib/negotiator.js'][39]++;
_requests.unsupported[cReq.name || "missingName"] = utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.INVALID_TASK);
        }
    });

    _$jscoverage['lib/negotiator.js'][43]++;
return _requests;
}

/**
 * configure the batchelor object and utils library
 * @param cfg
 */
_$jscoverage['lib/negotiator.js'][50]++;
exports.configure = function (cfg) {
    _$jscoverage['lib/negotiator.js'][51]++;
config = commons.helper.configure(cfg);
    _$jscoverage['lib/negotiator.js'][52]++;
log = config.logger || console;
    _$jscoverage['lib/negotiator.js'][53]++;
_configure(utils, config);
    _$jscoverage['lib/negotiator.js'][54]++;
_configure(processor, config);
    _$jscoverage['lib/negotiator.js'][55]++;
return config;
};

/**
 * this is the entry point for the batchelor utility
 * @param job - a object containing a single requests or multiple request to be fetch
 * @param callback - callback  method to be called once the request are performed
 * @returns {jobId}
 */
_$jscoverage['lib/negotiator.js'][64]++;
exports.execute = function (job, callback) {
    _$jscoverage['lib/negotiator.js'][65]++;
job = commons.helper.convert2Array(job);
    _$jscoverage['lib/negotiator.js'][66]++;
var _reqs = _prepareRequests(job);
    _$jscoverage['lib/negotiator.js'][67]++;
var jobId = utils.jobHolder.addJob(_reqs.supported.slice(0));

    _$jscoverage['lib/negotiator.js'][69]++;
log.info("[batchelor] Processing Job # " + jobId);

    _$jscoverage['lib/negotiator.js'][71]++;
processor.run(_reqs.supported, function (err, result) {
        _$jscoverage['lib/negotiator.js'][72]++;
utils.jobHolder.clean(jobId);
        _$jscoverage['lib/negotiator.js'][73]++;
if (err) {
            _$jscoverage['lib/negotiator.js'][74]++;
return callback(err);
        }
        else {
            _$jscoverage['lib/negotiator.js'][77]++;
result = commons.helper.merge(_reqs.unsupported, result);
            _$jscoverage['lib/negotiator.js'][78]++;
_reqs.supported.length = 0;
            _$jscoverage['lib/negotiator.js'][79]++;
delete _reqs.supported;
            _$jscoverage['lib/negotiator.js'][80]++;
_reqs.unsupported = null;
            _$jscoverage['lib/negotiator.js'][81]++;
delete _reqs.unsupported;
            _$jscoverage['lib/negotiator.js'][82]++;
return callback(null, result);
        }
    });

    _$jscoverage['lib/negotiator.js'][86]++;
return jobId;
};