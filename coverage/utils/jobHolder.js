if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['utils/jobHolder.js'] === 'undefined'){_$jscoverage['utils/jobHolder.js']=[];
_$jscoverage['utils/jobHolder.js'].source=['/*jslint node: true */',
'\'use strict\';',
'var commons = require("./../commons")',
'    , jobs = {}',
'    , config',
'    , activeJobs = 0',
'    , activeRequests = 0;',
'',
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
'    var jobId = commons.helper.getUniqueId("job");',
'    jobs[jobId] = {};',
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
'    };',
'};',
''];
_$jscoverage['utils/jobHolder.js'][28]=0;
_$jscoverage['utils/jobHolder.js'][2]=0;
_$jscoverage['utils/jobHolder.js'][29]=0;
_$jscoverage['utils/jobHolder.js'][11]=0;
_$jscoverage['utils/jobHolder.js'][10]=0;
_$jscoverage['utils/jobHolder.js'][3]=0;
_$jscoverage['utils/jobHolder.js'][33]=0;
_$jscoverage['utils/jobHolder.js'][17]=0;
_$jscoverage['utils/jobHolder.js'][15]=0;
_$jscoverage['utils/jobHolder.js'][12]=0;
_$jscoverage['utils/jobHolder.js'][16]=0;
_$jscoverage['utils/jobHolder.js'][36]=0;
_$jscoverage['utils/jobHolder.js'][27]=0;
_$jscoverage['utils/jobHolder.js'][22]=0;
_$jscoverage['utils/jobHolder.js'][20]=0;
_$jscoverage['utils/jobHolder.js'][21]=0;
_$jscoverage['utils/jobHolder.js'][26]=0;
_$jscoverage['utils/jobHolder.js'][31]=0;
_$jscoverage['utils/jobHolder.js'][37]=0;
_$jscoverage['utils/jobHolder.js'][40]=0;
_$jscoverage['utils/jobHolder.js'][41]=0;
_$jscoverage['utils/jobHolder.js'][43]=0;
_$jscoverage['utils/jobHolder.js'][45]=0;
_$jscoverage['utils/jobHolder.js'][48]=0;
_$jscoverage['utils/jobHolder.js'][49]=0;
}/*jslint node: true */
_$jscoverage['utils/jobHolder.js'][2]++;
'use strict';
_$jscoverage['utils/jobHolder.js'][3]++;
var commons = require("./../commons")
    , jobs = {}
    , config
    , activeJobs = 0
    , activeRequests = 0;


_$jscoverage['utils/jobHolder.js'][10]++;
function _incrementCounters(_reqsLength) {
    _$jscoverage['utils/jobHolder.js'][11]++;
activeJobs++;
    _$jscoverage['utils/jobHolder.js'][12]++;
activeRequests += _reqsLength;
}

_$jscoverage['utils/jobHolder.js'][15]++;
function _decrementCounters(_reqsLength) {
    _$jscoverage['utils/jobHolder.js'][16]++;
activeJobs--;
    _$jscoverage['utils/jobHolder.js'][17]++;
activeRequests -= _reqsLength;
}

_$jscoverage['utils/jobHolder.js'][20]++;
exports.configure = function (cfg) {
    _$jscoverage['utils/jobHolder.js'][21]++;
config = commons.helper.configure(cfg);
    _$jscoverage['utils/jobHolder.js'][22]++;
return config;
};


_$jscoverage['utils/jobHolder.js'][26]++;
exports.addJob = function (reqs) {
    _$jscoverage['utils/jobHolder.js'][27]++;
var jobId = commons.helper.getUniqueId("job");
    _$jscoverage['utils/jobHolder.js'][28]++;
jobs[jobId] = {};
    _$jscoverage['utils/jobHolder.js'][29]++;
jobs[jobId].reqs = reqs;

    _$jscoverage['utils/jobHolder.js'][31]++;
_incrementCounters(jobs[jobId].reqs.length || 0);

    _$jscoverage['utils/jobHolder.js'][33]++;
return jobId;
};

_$jscoverage['utils/jobHolder.js'][36]++;
exports.getJob = function (jobId) {
    _$jscoverage['utils/jobHolder.js'][37]++;
return jobs[jobId] || null;
};

_$jscoverage['utils/jobHolder.js'][40]++;
exports.clean = function (jobId) {
    _$jscoverage['utils/jobHolder.js'][41]++;
var job = this.getJob(jobId);

    _$jscoverage['utils/jobHolder.js'][43]++;
_decrementCounters(job.reqs.length || 0);

    _$jscoverage['utils/jobHolder.js'][45]++;
delete jobs[jobId];
};

_$jscoverage['utils/jobHolder.js'][48]++;
exports.getActiveJobs = function () {
    _$jscoverage['utils/jobHolder.js'][49]++;
return {
        activeJobs: activeJobs,
        activeRequests: activeRequests
    };
};
