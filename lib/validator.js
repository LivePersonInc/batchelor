/**
 * Created with IntelliJ IDEA.
 * User: omerh
 * Date: 11/18/14
 * Time: 13:59
 * To change this template use File | Settings | File Templates.
 */

var CONST = require('./const');
var util = require('./util');
var config;

exports.configure = function (cfg) {
    config = util.configure(cfg);
};

exports.isValidTask = function (task) {
    var validTask = false;
    if ((task.name && typeof task.name === "string") &&
        (task.url && typeof task.url === "string") &&
        (task.method && typeof task.method === "string")) {
        validTask = true;
    }
    config["logger"].info("isValidTask: " + validTask)
    return validTask
};
exports.cleanTask = function (task) {
    /**
     * we are deleting the headers:
     * 1. content-length - don't limit the size of the content
     * 2. accept-encoding - currently we don't accept encoding gzip
     * 3. connection - deleted when requesting https
     * 4. host - deleted when requesting https
     */
    for (var header in CONST.NOT_VALID_HEADERS) {
        var currentHeader = CONST.NOT_VALID_HEADERS[header];
        // try to delete it only if were passed
        if (task.headers && task.headers[currentHeader]) {
            delete task.headers[currentHeader];
        }
    }
    return task;
};

