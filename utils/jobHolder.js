var commons = require("./../commons/commons");
var idCounter = 0;
var jobs = {};
var config;
var activeJobs = 0;
var activeRequests = 0;

function _getUniqueId (prefix) {
    var id = ++idCounter + "";
    return prefix ? prefix + id : id;
}

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
    var jobId = _getUniqueId("job");
    jobs[jobId] = {}
    jobs[jobId].reqs = reqs;

    _incrementCounters(jobs[jobId].reqs.length || 0);

    return jobId;
};

exports.getJob = function (jobId) {
    return jobs[jobId] || null;
};

exports.clean = function (jobId) {
    var job = this.getJob(jobId);

    _decrementCounters(job.reqs.length || 0);

    delete jobs[jobId];
};

exports.getActiveJobs = function () {
    return {
        activeJobs: activeJobs,
        activeRequests: activeRequests
    }
};
