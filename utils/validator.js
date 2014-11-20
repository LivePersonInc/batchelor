var commons = require('./../commons/index');
var config;

exports.configure = function (cfg) {
    config = commons.helper.configure(cfg);
};

exports.isValidRequest = function (task) {
    var validTask = false;
    if ((task.name && typeof task.name === "string") &&
        (task.url && typeof task.url === "string") &&
        (task.method && typeof task.method === "string")) {
        validTask = true;
    }
    config["logger"].info("isValidTask: " + validTask)
    return validTask
};
exports.cleanRequest = function (task) {
    /**
     * we are deleting the headers:
     * 1. content-length - don't limit the size of the content
     * 2. accept-encoding - currently we don't accept encoding gzip
     * 3. connection - deleted when requesting https
     * 4. host - deleted when requesting https
     */
    for (var header in commons.CONST.INVALID_HEADERS) {
        var currentHeader = commons.CONST.INVALID_HEADERS[header];
        // try to delete it only if were passed
        if (task.headers && task.headers[currentHeader]) {
            delete task.headers[currentHeader];
        }
    }
    return task;
};

