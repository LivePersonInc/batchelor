/**
 * Created with IntelliJ IDEA.
 * User: omerh
 * Date: 11/18/14
 * Time: 13:59
 * To change this template use File | Settings | File Templates.
 */

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

