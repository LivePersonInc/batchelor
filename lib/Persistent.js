var async = require("async");
var _ = require("lodash");
var utils = require("./util/Utils");
var validator = require("./util/Validator");
var log = require("./util/Logger");
var transport = require("./Transport");
var config = require("./util/Config");
var Events = require("./Events");

var persisting = false;
var persistentRequests = [];
var currentIndex = 0;

function stop(ids) {
    var uniqueIds = utils.padArray(ids);

    var requests = _.remove(persistentRequests, function (request) {
        return -1 !== uniqueIds.indexOf(request.uniqueId);
    });

    if (!requests || !requests.length) {
        log.debug("[Persistent] couldn't stop. unique id was not found : " + JSON.stringify(uniqueIds));
    } else {
        Events.emit("persistent_stopped", requests);
    }

    return requests;
}

function preparePersistentRequests(requests, callback) {
    var currentPersistentRequests = [];
    requests = utils.padArray(requests);

    requests.forEach(function (request) {

        var clonedRequest = _.clone(config.getConf().request, true); //Deep clone
        _.merge(clonedRequest, request);
        clonedRequest.callback = clonedRequest.callback || callback;

        if (validator.isValidRequest(clonedRequest) && utils.isPersistentRequest(clonedRequest)) {
            clonedRequest.persistentDelay = clonedRequest.persistentDelay || 2000;
            clonedRequest.launchTime = Date.now();
            clonedRequest.ignoreResponse = clonedRequest.ignoreResponse || false;
            clonedRequest.uniqueId = clonedRequest.uniqueId || utils.getUID("uId");
            currentPersistentRequests.push(clonedRequest);
        }
    });

    persistentRequests = persistentRequests.concat(currentPersistentRequests);
    return currentPersistentRequests;
}

/**
 * Will be called once batchelor finish processing batch
 * @param result - result passed from batchelor
 * @param requests
 * @private
 */
function persist(requests, result) {
    log.debug("[batchelor] Persistent persist called");

    if (requests && requests.length) {
        requests.forEach(function (request) {
            result[request.name] = result[request.name] || {};
            result[request.name].persistent = true; // set the result with persistent type, in case the client want to do something with it
            request.bodyTemp = result[request.name] || {};
        });

        _startPersisting();
    }
}

function _startPersisting() {
    if (!persisting) {
        persisting = true;
        async.until(_noMoreRequests, _handlePersistentRequest, _finishedPersisting);
    }
}

function _noMoreRequests() {
    return persistentRequests.length === 0;
}

function _handlePersistentRequest(done) {
    if (currentIndex >= persistentRequests.length) {
        currentIndex = 0;
    }
    var request = persistentRequests[currentIndex];
    var currTime = Date.now();
    var delta = currTime - request.launchTime;
    var name = request.name;

    if (delta >= request.persistentDelay) {
        request.launchTime = currTime;

        transport.issueCalls(request, function (err, result) {
            Events.emit("persistent_processed", request.uniqueId);
            if (request.ignoreResponse || (!_.isEmpty(result) && result[name] && result[name].body && !_.isEqual(result[name].body, request.bodyTemp))) {
                request.bodyTemp = result[name].body;
                // when processing single item, mark it - in the case someone wants to know
                result[name].singlePersistenResponse = true;
                result[name].persistent = true;
                utils.runCallBack(request.callback, err, result);

                // this flag will stop/remove this request from the running requests
                if (request.stop_persistent_once_change) {
                    stop(request.uniqueId);
                }
            }
        });
    }

    currentIndex++;
    done();
}

function _finishedPersisting() {
    persisting = false;
    currentIndex = 0;
}

module.exports = {
    stop: stop,
    persist: persist,
    preparePersistentRequests: preparePersistentRequests
};
