if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['utils/jobHolder.js'] === 'undefined'){_$jscoverage['utils/jobHolder.js']=[];
_$jscoverage['utils/jobHolder.js'].source=['var commons = require(\'./../commons/commons\');',
'var idCounter = 0;',
'var jobs = {};',
'var config;',
'var activeJobs = 0;',
'var activeRequests = 0;',
'',
'function _getUniqueId (prefix) {',
'    var id = ++idCounter + \'\';',
'    return prefix ? prefix + id : id;',
'}',
'',
'function _incrementCounters(_reqsLength) {',
'    activeJobs++;',
'    activeRequests += _reqsLength;',
'}',
'',
'function _decrementCounters(_reqsLength) {',
'    activeJobs--;',
'    activeRequests -= _reqsLength;',
'}',
'',
'exports.configure = function (cfg) {',
'    config = commons.helper.configure(cfg);',
'    return config;',
'};',
'',
'',
'exports.addJob = function (reqs) {',
'    var jobId = _getUniqueId("job");',
'    jobs[jobId] = {}',
'    jobs[jobId].reqs = reqs;',
'',
'    _incrementCounters(jobs[jobId].reqs.length || 0);',
'',
'    return jobId;',
'};',
'',
'exports.getJob = function (jobId) {',
'    return jobs[jobId] || null;',
'};',
'',
'exports.clean = function (jobId) {',
'    var job = this.getJob(jobId);',
'',
'    _decrementCounters(job.reqs.length || 0);',
'',
'    delete jobs[jobId];',
'};',
'',
'exports.getActiveJobs = function () {',
'    return {',
'        activeJobs: activeJobs,',
'        activeRequests: activeRequests',
'    }',
'};',
''];
_$jscoverage['utils/jobHolder.js'][25]=0;
_$jscoverage['utils/jobHolder.js'][1]=0;
_$jscoverage['utils/jobHolder.js'][23]=0;
_$jscoverage['utils/jobHolder.js'][3]=0;
_$jscoverage['utils/jobHolder.js'][2]=0;
_$jscoverage['utils/jobHolder.js'][30]=0;
_$jscoverage['utils/jobHolder.js'][6]=0;
_$jscoverage['utils/jobHolder.js'][4]=0;
_$jscoverage['utils/jobHolder.js'][5]=0;
_$jscoverage['utils/jobHolder.js'][32]=0;
_$jscoverage['utils/jobHolder.js'][14]=0;
_$jscoverage['utils/jobHolder.js'][13]=0;
_$jscoverage['utils/jobHolder.js'][9]=0;
_$jscoverage['utils/jobHolder.js'][10]=0;
_$jscoverage['utils/jobHolder.js'][8]=0;
_$jscoverage['utils/jobHolder.js'][29]=0;
_$jscoverage['utils/jobHolder.js'][24]=0;
_$jscoverage['utils/jobHolder.js'][20]=0;
_$jscoverage['utils/jobHolder.js'][19]=0;
_$jscoverage['utils/jobHolder.js'][18]=0;
_$jscoverage['utils/jobHolder.js'][15]=0;
_$jscoverage['utils/jobHolder.js'][44]=0;
_$jscoverage['utils/jobHolder.js'][34]=0;
_$jscoverage['utils/jobHolder.js'][31]=0;
_$jscoverage['utils/jobHolder.js'][36]=0;
_$jscoverage['utils/jobHolder.js'][39]=0;
_$jscoverage['utils/jobHolder.js'][40]=0;
_$jscoverage['utils/jobHolder.js'][43]=0;
_$jscoverage['utils/jobHolder.js'][46]=0;
_$jscoverage['utils/jobHolder.js'][48]=0;
_$jscoverage['utils/jobHolder.js'][51]=0;
_$jscoverage['utils/jobHolder.js'][52]=0;
}_$jscoverage['utils/jobHolder.js'][1]++;
var commons = require('./../commons/commons');
_$jscoverage['utils/jobHolder.js'][2]++;
var idCounter = 0;
_$jscoverage['utils/jobHolder.js'][3]++;
var jobs = {};
_$jscoverage['utils/jobHolder.js'][4]++;
var config;
_$jscoverage['utils/jobHolder.js'][5]++;
var activeJobs = 0;
_$jscoverage['utils/jobHolder.js'][6]++;
var activeRequests = 0;

_$jscoverage['utils/jobHolder.js'][8]++;
function _getUniqueId (prefix) {
    _$jscoverage['utils/jobHolder.js'][9]++;
var id = ++idCounter + '';
    _$jscoverage['utils/jobHolder.js'][10]++;
return prefix ? prefix + id : id;
}

_$jscoverage['utils/jobHolder.js'][13]++;
function _incrementCounters(_reqsLength) {
    _$jscoverage['utils/jobHolder.js'][14]++;
activeJobs++;
    _$jscoverage['utils/jobHolder.js'][15]++;
activeRequests += _reqsLength;
}

_$jscoverage['utils/jobHolder.js'][18]++;
function _decrementCounters(_reqsLength) {
    _$jscoverage['utils/jobHolder.js'][19]++;
activeJobs--;
    _$jscoverage['utils/jobHolder.js'][20]++;
activeRequests -= _reqsLength;
}

_$jscoverage['utils/jobHolder.js'][23]++;
exports.configure = function (cfg) {
    _$jscoverage['utils/jobHolder.js'][24]++;
config = commons.helper.configure(cfg);
    _$jscoverage['utils/jobHolder.js'][25]++;
return config;
};


_$jscoverage['utils/jobHolder.js'][29]++;
exports.addJob = function (reqs) {
    _$jscoverage['utils/jobHolder.js'][30]++;
var jobId = _getUniqueId("job");
    _$jscoverage['utils/jobHolder.js'][31]++;
jobs[jobId] = {}
    _$jscoverage['utils/jobHolder.js'][32]++;
jobs[jobId].reqs = reqs;

    _$jscoverage['utils/jobHolder.js'][34]++;
_incrementCounters(jobs[jobId].reqs.length || 0);

    _$jscoverage['utils/jobHolder.js'][36]++;
return jobId;
};

_$jscoverage['utils/jobHolder.js'][39]++;
exports.getJob = function (jobId) {
    _$jscoverage['utils/jobHolder.js'][40]++;
return jobs[jobId] || null;
};

_$jscoverage['utils/jobHolder.js'][43]++;
exports.clean = function (jobId) {
    _$jscoverage['utils/jobHolder.js'][44]++;
var job = this.getJob(jobId);

    _$jscoverage['utils/jobHolder.js'][46]++;
_decrementCounters(job.reqs.length || 0);

    _$jscoverage['utils/jobHolder.js'][48]++;
delete jobs[jobId];
};

_$jscoverage['utils/jobHolder.js'][51]++;
exports.getActiveJobs = function () {
    _$jscoverage['utils/jobHolder.js'][52]++;
return {
        activeJobs: activeJobs,
        activeRequests: activeRequests
    }
};
