/**
 * Created with IntelliJ IDEA.
 * User: omerh
 * Date: 11/18/14
 * Time: 10:36
 * To change this template use File | Settings | File Templates.
 */
exports.configure = function (cfg) {
    var config = {};
    for (var key in cfg) {
        config[key] = cfg[key];
    }
    return config;
};
