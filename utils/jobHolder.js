var helper = require('./../lib/helper');
var idCounter = 0;
var jobs = {};
var config;

function _getUniqueId (prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
}


exports.configure = function (cfg) {
    config = helper.configure(cfg);
};


exports.addJob = function (reqs) {
    var jobId = _getUniqueId("job");
    jobs[jobId] = {}
    jobs[jobId].reqs = reqs;

    return jobId;
};

exports.getJob = function (jobId) {
    return jobs[jobId];
};

exports.clean = function () {
};
