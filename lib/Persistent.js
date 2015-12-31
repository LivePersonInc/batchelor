var async = require("async");
var _ = require("lodash");
var utils = require("./util/Utils");
var validator = require("./util/Validator");
var log = require("./util/Logger");
var transport = require("./Transport");

var persisting = false;
var persistentRequests = [];
var currentIndex = 0;

function stop(uniqueId) {
    var requests = _.remove(persistentRequests, function (request) {
        return request.uniqueId === uniqueId;
    });
    if (!requests) {
        log.debug("[Persistent] couldn't stop. unique id was not found : " + uniqueId);
    }
}

function preparePersistentRequests(requests, callback) {
    var currentPersistentRequests = [];
    requests = utils.toArray(requests);
    requests.forEach(function (request) {
        request.callback = request.callback || callback;

        if (validator.isValidRequest(request) && utils.isPersistentRequest(request)) {
            request.launchTime = Date.now();
            request.ignoreResponse = request.ignoreResponse || false;
            request.uniqueId = request.uniqueId || utils.getUID("uId");
            currentPersistentRequests.push(request);
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
    log.debug("[Persistent] persist called");
    var delays = [], minTime;

    if (requests && requests.length) {
        requests.forEach(function (request) {
            delays.push(request.persistentDelay || 2000);
            result[request.name].persistent = true; // set the result with persistent type, in case the client want to do something with it
            var reqRes = result[request.name] || {};
            request.bodyTemp = reqRes || {};
        });

        // take the minimum timeout - the minimum is the one we will use in the timeout
        minTime = Math.min.apply(Math, delays);

        setTimeout(function () {
            _startPersisting();
        }, minTime);
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