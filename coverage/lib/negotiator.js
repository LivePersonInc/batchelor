if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['lib/negotiator.js'] === 'undefined'){_$jscoverage['lib/negotiator.js']=[];
_$jscoverage['lib/negotiator.js'].source=['/*jslint node: true */',
'\'use strict\';',
'var _           = require("lodash")',
'    , config    = require("./../config/config.json")',
'    , processor = require("./../lib/processor")',
'    , commons   = require("./../commons")',
'    , utils     = require("./../utils")',
'    , Media     = require("./../media")',
'    , log;',
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
'    log.debug("[batchelor] _prepareRequests");',
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
'    Media.emit("processing", utils.jobHolder.getActiveJobs());',
'',
'    log.debug("[batchelor] Processing Job # " + jobId);',
'',
'    processor.run(_reqs.supported, function (err, result) {',
'        utils.jobHolder.clean(jobId);',
'        Media.emit("complete", utils.jobHolder.getActiveJobs());',
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
_$jscoverage['lib/negotiator.js'][51]=0;
_$jscoverage['lib/negotiator.js'][2]=0;
_$jscoverage['lib/negotiator.js'][66]=0;
_$jscoverage['lib/negotiator.js'][18]=0;
_$jscoverage['lib/negotiator.js'][17]=0;
_$jscoverage['lib/negotiator.js'][3]=0;
_$jscoverage['lib/negotiator.js'][68]=0;
_$jscoverage['lib/negotiator.js'][34]=0;
_$jscoverage['lib/negotiator.js'][28]=0;
_$jscoverage['lib/negotiator.js'][29]=0;
_$jscoverage['lib/negotiator.js'][27]=0;
_$jscoverage['lib/negotiator.js'][33]=0;
_$jscoverage['lib/negotiator.js'][74]=0;
_$jscoverage['lib/negotiator.js'][44]=0;
_$jscoverage['lib/negotiator.js'][35]=0;
_$jscoverage['lib/negotiator.js'][36]=0;
_$jscoverage['lib/negotiator.js'][37]=0;
_$jscoverage['lib/negotiator.js'][40]=0;
_$jscoverage['lib/negotiator.js'][80]=0;
_$jscoverage['lib/negotiator.js'][56]=0;
_$jscoverage['lib/negotiator.js'][54]=0;
_$jscoverage['lib/negotiator.js'][55]=0;
_$jscoverage['lib/negotiator.js'][53]=0;
_$jscoverage['lib/negotiator.js'][52]=0;
_$jscoverage['lib/negotiator.js'][83]=0;
_$jscoverage['lib/negotiator.js'][65]=0;
_$jscoverage['lib/negotiator.js'][84]=0;
_$jscoverage['lib/negotiator.js'][71]=0;
_$jscoverage['lib/negotiator.js'][67]=0;
_$jscoverage['lib/negotiator.js'][69]=0;
_$jscoverage['lib/negotiator.js'][73]=0;
_$jscoverage['lib/negotiator.js'][75]=0;
_$jscoverage['lib/negotiator.js'][76]=0;
_$jscoverage['lib/negotiator.js'][77]=0;
_$jscoverage['lib/negotiator.js'][81]=0;
_$jscoverage['lib/negotiator.js'][82]=0;
_$jscoverage['lib/negotiator.js'][85]=0;
_$jscoverage['lib/negotiator.js'][89]=0;
}/*jslint node: true */
_$jscoverage['lib/negotiator.js'][2]++;
'use strict';
_$jscoverage['lib/negotiator.js'][3]++;
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
_$jscoverage['lib/negotiator.js'][17]++;
function _configure(obj, cfg) {
    _$jscoverage['lib/negotiator.js'][18]++;
obj.configure(cfg);
}

/**
 * method building the request for the running process
 * @param job - single request or multiple request
 * @returns {{supported: Array, unsupported: {}}}
 * @private
 */
_$jscoverage['lib/negotiator.js'][27]++;
function _prepareRequests(job) {
    _$jscoverage['lib/negotiator.js'][28]++;
log.debug("[batchelor] _prepareRequests");
    _$jscoverage['lib/negotiator.js'][29]++;
var _requests = {
        supported: [],
        unsupported: {}
    };
    _$jscoverage['lib/negotiator.js'][33]++;
_.forEach(job, function (cReq) {
        _$jscoverage['lib/negotiator.js'][34]++;
cReq = commons.helper.setDefaultValues(config.request_default_values, cReq);
        _$jscoverage['lib/negotiator.js'][35]++;
if (utils.validator.isValidRequest(cReq) && utils.validator.isValidURL(cReq.url)) {
            _$jscoverage['lib/negotiator.js'][36]++;
cReq = utils.validator.cleanRequest(cReq);
            _$jscoverage['lib/negotiator.js'][37]++;
_requests.supported.push(cReq);
        }
        else {
            _$jscoverage['lib/negotiator.js'][40]++;
_requests.unsupported[cReq.name || "missingName"] = utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.INVALID_TASK);
        }
    });

    _$jscoverage['lib/negotiator.js'][44]++;
return _requests;
}

/**
 * configure the batchelor object and utils library
 * @param cfg
 */
_$jscoverage['lib/negotiator.js'][51]++;
exports.configure = function (cfg) {
    _$jscoverage['lib/negotiator.js'][52]++;
config = commons.helper.configure(cfg);
    _$jscoverage['lib/negotiator.js'][53]++;
log = config.logger || console;
    _$jscoverage['lib/negotiator.js'][54]++;
_configure(utils, config);
    _$jscoverage['lib/negotiator.js'][55]++;
_configure(processor, config);
    _$jscoverage['lib/negotiator.js'][56]++;
return config;
};

/**
 * this is the entry point for the batchelor utility
 * @param job - a object containing a single requests or multiple request to be fetch
 * @param callback - callback  method to be called once the request are performed
 * @returns {jobId}
 */
_$jscoverage['lib/negotiator.js'][65]++;
exports.execute = function (job, callback) {
    _$jscoverage['lib/negotiator.js'][66]++;
job = commons.helper.convert2Array(job);
    _$jscoverage['lib/negotiator.js'][67]++;
var _reqs = _prepareRequests(job);
    _$jscoverage['lib/negotiator.js'][68]++;
var jobId = utils.jobHolder.addJob(_reqs.supported.slice(0));
    _$jscoverage['lib/negotiator.js'][69]++;
Media.emit("processing", utils.jobHolder.getActiveJobs());

    _$jscoverage['lib/negotiator.js'][71]++;
log.debug("[batchelor] Processing Job # " + jobId);

    _$jscoverage['lib/negotiator.js'][73]++;
processor.run(_reqs.supported, function (err, result) {
        _$jscoverage['lib/negotiator.js'][74]++;
utils.jobHolder.clean(jobId);
        _$jscoverage['lib/negotiator.js'][75]++;
Media.emit("complete", utils.jobHolder.getActiveJobs());
        _$jscoverage['lib/negotiator.js'][76]++;
if (err) {
            _$jscoverage['lib/negotiator.js'][77]++;
return callback(err);
        }
        else {
            _$jscoverage['lib/negotiator.js'][80]++;
result = commons.helper.merge(_reqs.unsupported, result);
            _$jscoverage['lib/negotiator.js'][81]++;
_reqs.supported.length = 0;
            _$jscoverage['lib/negotiator.js'][82]++;
delete _reqs.supported;
            _$jscoverage['lib/negotiator.js'][83]++;
_reqs.unsupported = null;
            _$jscoverage['lib/negotiator.js'][84]++;
delete _reqs.unsupported;
            _$jscoverage['lib/negotiator.js'][85]++;
return callback(null, result);
        }
    });

    _$jscoverage['lib/negotiator.js'][89]++;
return jobId;
};