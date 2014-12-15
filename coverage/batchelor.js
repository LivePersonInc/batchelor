if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['batchelor/batchelor.js'] === 'undefined'){_$jscoverage['batchelor/batchelor.js']=[];
_$jscoverage['batchelor/batchelor.js'].source=['\'use strict\';',
'var _          = require("lodash");',
'var config     = require(\'./config/config.json\');',
'var processor  = require(\'./lib/processor\');',
'var commons    = require(\'./commons\');',
'var utils      = require(\'./utils\');',
'var log;',
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
'        cReq = commons.helper.setAdditionalProps(config.request, cReq);',
'        if (utils.validator.isValidRequest(cReq)) {',
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
'    var jobId = utils.jobHolder.addJob(_reqs.supported);',
'',
'    log.info("[batchelor] Processing Job # " + jobId);',
'',
'    processor.run(_reqs.supported, function (err, result) {',
'        if (err) {',
'            callback(err);',
'        }',
'        else {',
'            result = commons.helper.merge(_reqs.unsupported, result);',
'            callback(null, result);',
'        }',
'    });',
'',
'    return jobId;',
'};'];
_$jscoverage['batchelor/batchelor.js'][25]=0;
_$jscoverage['batchelor/batchelor.js'][1]=0;
_$jscoverage['batchelor/batchelor.js'][50]=0;
_$jscoverage['batchelor/batchelor.js'][3]=0;
_$jscoverage['batchelor/batchelor.js'][2]=0;
_$jscoverage['batchelor/batchelor.js'][51]=0;
_$jscoverage['batchelor/batchelor.js'][6]=0;
_$jscoverage['batchelor/batchelor.js'][4]=0;
_$jscoverage['batchelor/batchelor.js'][5]=0;
_$jscoverage['batchelor/batchelor.js'][53]=0;
_$jscoverage['batchelor/batchelor.js'][26]=0;
_$jscoverage['batchelor/batchelor.js'][7]=0;
_$jscoverage['batchelor/batchelor.js'][16]=0;
_$jscoverage['batchelor/batchelor.js'][15]=0;
_$jscoverage['batchelor/batchelor.js'][64]=0;
_$jscoverage['batchelor/batchelor.js'][38]=0;
_$jscoverage['batchelor/batchelor.js'][31]=0;
_$jscoverage['batchelor/batchelor.js'][33]=0;
_$jscoverage['batchelor/batchelor.js'][35]=0;
_$jscoverage['batchelor/batchelor.js'][34]=0;
_$jscoverage['batchelor/batchelor.js'][32]=0;
_$jscoverage['batchelor/batchelor.js'][27]=0;
_$jscoverage['batchelor/batchelor.js'][72]=0;
_$jscoverage['batchelor/batchelor.js'][52]=0;
_$jscoverage['batchelor/batchelor.js'][49]=0;
_$jscoverage['batchelor/batchelor.js'][42]=0;
_$jscoverage['batchelor/batchelor.js'][54]=0;
_$jscoverage['batchelor/batchelor.js'][63]=0;
_$jscoverage['batchelor/batchelor.js'][65]=0;
_$jscoverage['batchelor/batchelor.js'][66]=0;
_$jscoverage['batchelor/batchelor.js'][68]=0;
_$jscoverage['batchelor/batchelor.js'][70]=0;
_$jscoverage['batchelor/batchelor.js'][71]=0;
_$jscoverage['batchelor/batchelor.js'][75]=0;
_$jscoverage['batchelor/batchelor.js'][76]=0;
_$jscoverage['batchelor/batchelor.js'][80]=0;
}_$jscoverage['batchelor/batchelor.js'][1]++;
'use strict';
_$jscoverage['batchelor/batchelor.js'][2]++;
var _          = require("lodash");
_$jscoverage['batchelor/batchelor.js'][3]++;
var config     = require('./config/config.json');
_$jscoverage['batchelor/batchelor.js'][4]++;
var processor  = require('./lib/processor');
_$jscoverage['batchelor/batchelor.js'][5]++;
var commons    = require('./commons');
_$jscoverage['batchelor/batchelor.js'][6]++;
var utils      = require('./utils');
_$jscoverage['batchelor/batchelor.js'][7]++;
var log;

/**
 * helper method that configure the given object
 * @param obj - target object
 * @param cfg - source object
 * @private
 */
_$jscoverage['batchelor/batchelor.js'][15]++;
function _configure(obj, cfg) {
    _$jscoverage['batchelor/batchelor.js'][16]++;
obj.configure(cfg);
}

/**
 * method building the request for the running process
 * @param job - single request or multiple request
 * @returns {{supported: Array, unsupported: {}}}
 * @private
 */
_$jscoverage['batchelor/batchelor.js'][25]++;
function _prepareRequests(job) {
    _$jscoverage['batchelor/batchelor.js'][26]++;
log.info("[batchelor] _prepareRequests");
    _$jscoverage['batchelor/batchelor.js'][27]++;
var _requests = {
        supported: [],
        unsupported: {}
    };
    _$jscoverage['batchelor/batchelor.js'][31]++;
_.forEach(job, function (cReq) {
        _$jscoverage['batchelor/batchelor.js'][32]++;
cReq = commons.helper.setAdditionalProps(config.request, cReq);
        _$jscoverage['batchelor/batchelor.js'][33]++;
if (utils.validator.isValidRequest(cReq)) {
            _$jscoverage['batchelor/batchelor.js'][34]++;
cReq = utils.validator.cleanRequest(cReq);
            _$jscoverage['batchelor/batchelor.js'][35]++;
_requests.supported.push(cReq);
        }
        else {
            _$jscoverage['batchelor/batchelor.js'][38]++;
_requests.unsupported[cReq.name || "missingName"] = utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.INVALID_TASK);
        }
    });

    _$jscoverage['batchelor/batchelor.js'][42]++;
return _requests;
}

/**
 * configure the batchelor object and utils library
 * @param cfg
 */
_$jscoverage['batchelor/batchelor.js'][49]++;
exports.configure = function (cfg) {
    _$jscoverage['batchelor/batchelor.js'][50]++;
config = commons.helper.configure(cfg);
    _$jscoverage['batchelor/batchelor.js'][51]++;
log = config.logger || console;
    _$jscoverage['batchelor/batchelor.js'][52]++;
_configure(utils, config);
    _$jscoverage['batchelor/batchelor.js'][53]++;
_configure(processor, config);
    _$jscoverage['batchelor/batchelor.js'][54]++;
return config;
};

/**
 * this is the entry point for the batchelor utility
 * @param job - a object containing a single requests or multiple request to be fetch
 * @param callback - callback  method to be called once the request are performed
 * @returns {jobId}
 */
_$jscoverage['batchelor/batchelor.js'][63]++;
exports.execute = function (job, callback) {
    _$jscoverage['batchelor/batchelor.js'][64]++;
job = commons.helper.convert2Array(job);
    _$jscoverage['batchelor/batchelor.js'][65]++;
var _reqs = _prepareRequests(job);
    _$jscoverage['batchelor/batchelor.js'][66]++;
var jobId = utils.jobHolder.addJob(_reqs.supported);

    _$jscoverage['batchelor/batchelor.js'][68]++;
log.info("[batchelor] Processing Job # " + jobId);

    _$jscoverage['batchelor/batchelor.js'][70]++;
processor.run(_reqs.supported, function (err, result) {
        _$jscoverage['batchelor/batchelor.js'][71]++;
if (err) {
            _$jscoverage['batchelor/batchelor.js'][72]++;
callback(err);
        }
        else {
            _$jscoverage['batchelor/batchelor.js'][75]++;
result = commons.helper.merge(_reqs.unsupported, result);
            _$jscoverage['batchelor/batchelor.js'][76]++;
callback(null, result);
        }
    });

    _$jscoverage['batchelor/batchelor.js'][80]++;
return jobId;
};