var log = require("./Logger");

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
 * Returns a pretty random id, pretty good for our purposes
 * @param prefix
 * @returns {string}
 */
function getUID(prefix) {
    var UID = 'tttttttt-tttt-4ttt-fttt-t7ttttttttttt'.replace(/[tf]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 't' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    var id = UID + '-' + Math.floor(Math.random() * 100000);
    return  prefix ? prefix + id : id;
}

function runCallBack(func, err, data, context) {
    try {
        func.call(context || null, err, data);
    } catch (exc) {
        log.error("[batchelor] runCallBack Error executing callback");
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
