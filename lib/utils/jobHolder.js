'use strict';
var commons = require("./../commons")
    , jobs = {}
    , config
    , activeJobs = 0
    , activeRequests = 0;


function _incrementCounters(_reqsLength) {
    activeJobs++;
    activeRequests += _reqsLength;
}

function _decrementCounters(_reqsLength) {
    activeJobs--;
    activeRequests -= _reqsLength;
}

exports.configure = function (cfg) {
    config = commons.helper.configure(cfg);
    return config;
};


exports.addJob = function (reqs) {
    var jobId = commons.helper.getUniqueId("job");
    jobs[jobId] = {};
    jobs[jobId].reqs = reqs.slice(0, reqs.length);

    _incrementCounters(jobs[jobId].reqs.length || 0);

    return jobId;
};

exports.getAllJobs = function () {
   return jobs;
};

exports.getJob = function (jobId) {
    return jobs[jobId] || null;
};

exports.clean = function (jobId) {
    if (jobs[jobId]) {
        _decrementCounters(jobs[jobId].reqs.length || 0);
        jobs[jobId].reqs.length = 0;
        delete jobs[jobId].reqs;
        delete jobs[jobId];
    }

};

exports.getActiveJobs = function () {
    return {
        activeJobs: activeJobs,
        activeRequests: activeRequests
    };
};
