"use strict";

var log = require("./Logger");
var uuid = require("node-uuid");

function padArray(obj) {
    var arr;
    if (Array.isArray(obj)) {
        arr = obj;
    }
    else {
        arr = [obj];
    }
    return arr;
}

/**
 * Returns a random id
 * @param prefix
 * @returns {string}
 */
function getUID(prefix) {
    var id = uuid.v4();
    return  prefix ? prefix + id : id;
}

function runCallBack(func, err, data, context) {
    try {
        if (typeof func === "function") {
            func.call(context || null, err, data);
        }
    }
    catch (exc) {
        log.error("[batchelor] Utils runCallBack Error executing callback err=" + exc.message);
    }
}


/**
 * check if the request if persistent
 * @param req
 * @returns {boolean}
 */
function isPersistentRequest(req) {
    return req && (req.isPersistentRequest === true || req.persistent === true);
}


module.exports = {
    padArray: padArray,
    getUID: getUID,
    runCallBack: runCallBack,
    isPersistentRequest: isPersistentRequest
};
