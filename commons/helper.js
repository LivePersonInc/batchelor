/*jslint node: true */
'use strict';

var idCounter = 0;

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
};

exports.setDefaultValues = function (source, target) {
    for(var key in source) {
        if (!target.hasOwnProperty(key)) {
            target[key] = source[key];
        }
    }
    return target;
};

exports.convert2Array = function(obj) {
    var arr = [];
    if (obj.constructor === Array) {
        arr = obj.slice(0);
    }
    else {
        arr.push(obj);
    }

    return arr;
};

exports.getUniqueId = function (prefix) {
    var id = ++idCounter + "";
    return prefix ? prefix + id : id;
};
exports.isEmptyObject = function (obj) {
    return Object.keys(obj).length === 0;
};