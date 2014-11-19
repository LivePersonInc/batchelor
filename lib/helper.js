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

exports.merge = function (source, target) {
    for (var cur in source) {
        target[cur] = source[cur];
    }

    return target;
}

exports.setAdditionalProps = function (source, target) {
    for(var key in source) {
        if (!target.hasOwnProperty(key)) {
            target[key] = source[key];
        }
    }
    return target;
}

exports.convert2Array = function(obj) {
    var arr = [];
    arr = (obj.constructor === Array) ? obj : arr.push(obj);
    return arr;
}