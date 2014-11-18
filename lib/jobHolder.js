/**
 * Created with IntelliJ IDEA.
 * User: omerh
 * Date: 11/18/14
 * Time: 10:52
 * To change this template use File | Settings | File Templates.
 */

var util = require('./util');
var idCounter= 0;
var jobs = {};
var config;

function _getUniqueId (prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
}


exports.configure = function (cfg) {
    config = util.configure(cfg);
};


exports.addJob = function (job) {
    var jobId = _getUniqueId("job");
    var len = job.length;
    jobs[jobId] = {}
    jobs[jobId].tasks = [];

    for (var i=0; i<len; i++) {
        jobs[jobId].tasks.push(job[i])
    }
    return jobId;
};

exports.getJob = function (jobId) {
    return jobs[jobId];
};

exports.clean = function () {
};
