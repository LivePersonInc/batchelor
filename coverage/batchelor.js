if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['batchelor/batchelor.js'] === 'undefined'){_$jscoverage['batchelor/batchelor.js']=[];
_$jscoverage['batchelor/batchelor.js'].source=['var config     = require(\'./config/config.json\');',
'var processor  = require(\'./lib/processor\');',
'var commons    = require(\'./commons/commons\');',
'var utils      = require(\'./utils/utils\');',
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
'    var requests = {',
'        supported: [],',
'        unsupported: {}',
'    };',
'    var cReq;',
'    var len = job.length;',
'    for (var i=0; i<len; i++) {',
'        cReq = job[i];',
'        cReq = commons.helper.setAdditionalProps(config.request, cReq);',
'        if (utils.validator.isValidRequest(cReq)) {',
'            cReq = utils.validator.cleanRequest(cReq);',
'            requests.supported.push(cReq);',
'        }',
'        else {',
'            requests.unsupported[cReq.name || "missingName"] = utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.INVALID_TASK);',
'        }',
'    }',
'',
'    return requests;',
'}',
'',
'/**',
' * configure the batchelor object and utils library',
' * @param cfg',
' */',
'exports.configure = function (cfg) {',
'    config = commons.helper.configure(cfg);',
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
'    var reqs = _prepareRequests(job);',
'    var jobId = utils.jobHolder.addJob(reqs.supported);',
'',
'    config.logger.info("Processing Job # " + jobId);',
'',
'    processor.run(reqs.supported, function (err, result) {',
'        if (err) {',
'            callback(err);',
'        }',
'        else {',
'            result = commons.helper.merge(reqs.unsupported, result);',
'            callback(null, result);',
'        }',
'    });',
'',
'    return jobId;',
'};',
'',
'',
'exports.stopJob = function (jobId) {',
'};'];
_$jscoverage['batchelor/batchelor.js'][22]=0;
_$jscoverage['batchelor/batchelor.js'][1]=0;
_$jscoverage['batchelor/batchelor.js'][49]=0;
_$jscoverage['batchelor/batchelor.js'][3]=0;
_$jscoverage['batchelor/batchelor.js'][2]=0;
_$jscoverage['batchelor/batchelor.js'][51]=0;
_$jscoverage['batchelor/batchelor.js'][12]=0;
_$jscoverage['batchelor/batchelor.js'][4]=0;
_$jscoverage['batchelor/batchelor.js'][52]=0;
_$jscoverage['batchelor/batchelor.js'][28]=0;
_$jscoverage['batchelor/batchelor.js'][23]=0;
_$jscoverage['batchelor/batchelor.js'][27]=0;
_$jscoverage['batchelor/batchelor.js'][13]=0;
_$jscoverage['batchelor/batchelor.js'][63]=0;
_$jscoverage['batchelor/batchelor.js'][37]=0;
_$jscoverage['batchelor/batchelor.js'][29]=0;
_$jscoverage['batchelor/batchelor.js'][32]=0;
_$jscoverage['batchelor/batchelor.js'][34]=0;
_$jscoverage['batchelor/batchelor.js'][33]=0;
_$jscoverage['batchelor/batchelor.js'][30]=0;
_$jscoverage['batchelor/batchelor.js'][31]=0;
_$jscoverage['batchelor/batchelor.js'][73]=0;
_$jscoverage['batchelor/batchelor.js'][50]=0;
_$jscoverage['batchelor/batchelor.js'][48]=0;
_$jscoverage['batchelor/batchelor.js'][41]=0;
_$jscoverage['batchelor/batchelor.js'][61]=0;
_$jscoverage['batchelor/batchelor.js'][62]=0;
_$jscoverage['batchelor/batchelor.js'][64]=0;
_$jscoverage['batchelor/batchelor.js'][66]=0;
_$jscoverage['batchelor/batchelor.js'][68]=0;
_$jscoverage['batchelor/batchelor.js'][69]=0;
_$jscoverage['batchelor/batchelor.js'][70]=0;
_$jscoverage['batchelor/batchelor.js'][74]=0;
_$jscoverage['batchelor/batchelor.js'][78]=0;
_$jscoverage['batchelor/batchelor.js'][82]=0;
}_$jscoverage['batchelor/batchelor.js'][1]++;
var config     = require('./config/config.json');
_$jscoverage['batchelor/batchelor.js'][2]++;
var processor  = require('./lib/processor');
_$jscoverage['batchelor/batchelor.js'][3]++;
var commons    = require('./commons/commons');
_$jscoverage['batchelor/batchelor.js'][4]++;
var utils      = require('./utils/utils');

/**
 * helper method that configure the given object
 * @param obj - target object
 * @param cfg - source object
 * @private
 */
_$jscoverage['batchelor/batchelor.js'][12]++;
function _configure(obj, cfg) {
    _$jscoverage['batchelor/batchelor.js'][13]++;
obj.configure(cfg);
}

/**
 * method building the request for the running process
 * @param job - single request or multiple request
 * @returns {{supported: Array, unsupported: {}}}
 * @private
 */
_$jscoverage['batchelor/batchelor.js'][22]++;
function _prepareRequests(job) {
    _$jscoverage['batchelor/batchelor.js'][23]++;
var requests = {
        supported: [],
        unsupported: {}
    };
    _$jscoverage['batchelor/batchelor.js'][27]++;
var cReq;
    _$jscoverage['batchelor/batchelor.js'][28]++;
var len = job.length;
    _$jscoverage['batchelor/batchelor.js'][29]++;
for (var i=0; i<len; i++) {
        _$jscoverage['batchelor/batchelor.js'][30]++;
cReq = job[i];
        _$jscoverage['batchelor/batchelor.js'][31]++;
cReq = commons.helper.setAdditionalProps(config.request, cReq);
        _$jscoverage['batchelor/batchelor.js'][32]++;
if (utils.validator.isValidRequest(cReq)) {
            _$jscoverage['batchelor/batchelor.js'][33]++;
cReq = utils.validator.cleanRequest(cReq);
            _$jscoverage['batchelor/batchelor.js'][34]++;
requests.supported.push(cReq);
        }
        else {
            _$jscoverage['batchelor/batchelor.js'][37]++;
requests.unsupported[cReq.name || "missingName"] = utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.INVALID_TASK);
        }
    }

    _$jscoverage['batchelor/batchelor.js'][41]++;
return requests;
}

/**
 * configure the batchelor object and utils library
 * @param cfg
 */
_$jscoverage['batchelor/batchelor.js'][48]++;
exports.configure = function (cfg) {
    _$jscoverage['batchelor/batchelor.js'][49]++;
config = commons.helper.configure(cfg);
    _$jscoverage['batchelor/batchelor.js'][50]++;
_configure(utils, config);
    _$jscoverage['batchelor/batchelor.js'][51]++;
_configure(processor, config);
    _$jscoverage['batchelor/batchelor.js'][52]++;
return config;
};

/**
 * this is the entry point for the batchelor utility
 * @param job - a object containing a single requests or multiple request to be fetch
 * @param callback - callback  method to be called once the request are performed
 * @returns {jobId}
 */
_$jscoverage['batchelor/batchelor.js'][61]++;
exports.execute = function (job, callback) {
    _$jscoverage['batchelor/batchelor.js'][62]++;
job = commons.helper.convert2Array(job);
    _$jscoverage['batchelor/batchelor.js'][63]++;
var reqs = _prepareRequests(job);
    _$jscoverage['batchelor/batchelor.js'][64]++;
var jobId = utils.jobHolder.addJob(reqs.supported);

    _$jscoverage['batchelor/batchelor.js'][66]++;
config.logger.info("Processing Job # " + jobId);

    _$jscoverage['batchelor/batchelor.js'][68]++;
processor.run(reqs.supported, function (err, result) {
        _$jscoverage['batchelor/batchelor.js'][69]++;
if (err) {
            _$jscoverage['batchelor/batchelor.js'][70]++;
callback(err);
        }
        else {
            _$jscoverage['batchelor/batchelor.js'][73]++;
result = commons.helper.merge(reqs.unsupported, result);
            _$jscoverage['batchelor/batchelor.js'][74]++;
callback(null, result);
        }
    });

    _$jscoverage['batchelor/batchelor.js'][78]++;
return jobId;
};


_$jscoverage['batchelor/batchelor.js'][82]++;
exports.stopJob = function (jobId) {
};