var should    = require('chai').should();
var expect    = require('chai').expect;
var assert    = require('chai').assert;
var batchelor = require('./../batchelor');
var utils     = require('./../utils/index');
var commons   = require('./../commons/index');
var cfg = {
    "maxConcurrentJobs": 10,
    "maxRequestsPerJob": 10,
    "log" : true,
    "logger": {
        debug: function () {
        },
        info: function () {
        },
        warn: function () {
        },
        error: function () {
        }
    },
    "request": {
        "method": "GET",
        "timeout": 5,
        "ip": "unknown",
        "headers": {},
        "body": ""
    },
    "whiteList": ["*"],
    "requestValidationType": 0
};

utils.configure(cfg);

describe('batchelor', function () {

    describe('configure', function () {
        it('configure method', function () {
            batchelor.configure.should.be.a('function');
            var configuration = batchelor.configure(cfg);
            configuration.should.have.ownProperty("whiteList");
            configuration.request.timeout.should.be.a('number');
            configuration.request.timeout.should.be.equal(5);
        });

    });

    describe('execute', function () {
        function buildObj(stringObj) {
            try {
                return JSON.parse(stringObj);
            }
            catch (e) {
                return {};
            }
        }
        var jobId;

        it('execute method - INVALID_TASK - Missing URL', function () {
            jobId = batchelor.execute(
                {
                    name: "INVALID_TASK",
                    encoding: "UTF8",
                    method: "GET",
                    retries: 3,
                    headers: {},
                    doNotMergeHeaders: false,
                    query: "/user1",
                    mimeType: "application/json",
                    body: "body",
                    timeout: 10000
                }, function (err, result) {
                    result["INVALID_TASK"].body.should.equal(utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.INVALID_TASK).body);

                });

            jobId.should.be.a('string');
        });

        it('execute method - INVALID_TASK - Missing name', function () {
            jobId = batchelor.execute(
                {
                    name: "INVALID_TASK_NAME",
                    encoding: "UTF8",
                    method: "GET",
                    retries: 3,
                    headers: {},
                    doNotMergeHeaders: false,
                    query: "/user1",
                    mimeType: "application/json",
                    body: "body",
                    timeout: 10000
                }, function (err, result) {
                    result["INVALID_TASK_NAME"].body.should.equal(utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.INVALID_TASK).body);

                });

            jobId.should.be.a('string');
        });

        it('execute method - ETIMEDOUT', function () {
            jobId = batchelor.execute(
                {
                    name: "ETIMEDOUT",
                    url: "https://jsonresponser.herokuapp.com/api/json/users",
                    encoding: "UTF8",
                    method: "GET",
                    retries: 3,
                    headers: {},
                    doNotMergeHeaders: false,
                    query: "/user1",
                    mimeType: "application/json",
                    body: "body",
                    timeout: 100
                }, function (err, result) {
                    result["ETIMEDOUT"].body.should.equal(utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.ETIMEDOUT).body);

                });

            jobId.should.be.a('string');
        });

        it('execute method - ERROR_API_URL', function () {
            jobId = batchelor.execute(
                {
                    name: "ERROR_API_URL",
                    url: "htp://www.kojo.com",
                    encoding: "UTF8",
                    method: "GET",
                    retries: 3,
                    headers: {},
                    doNotMergeHeaders: false,
                    query: "/user1",
                    mimeType: "application/json",
                    body: "body",
                    timeout: 1000
                }, function (err, result) {
                    result["ERROR_API_URL"].body.should.equal(utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.ERROR_API_URL).body);
                });

            jobId.should.be.a('string');
        });

//        it('execute method - NO_JSON_OBJECT', function () {
//            jobId = batchelor.execute(
//                {
//                    name: "NO_JSON_OBJECT",
//                    url: "http://www.google.com",
//                    encoding: "UTF8",
//                    method: "GET",
//                    retries: 3,
//                    headers: {},
//                    doNotMergeHeaders: false,
//                    query: "/user1",
//                    mimeType: "application/json",
//                    body: "body",
//                    timeout: 10000
//                }, function (err, result) {
//                    result["NO_JSON_OBJECT"].body.should.equal(utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.NO_JSON_OBJECT).body);
//                });
//
//            jobId.should.be.a('string');
//        });

//        it('execute method - POST', function () {
//            jobId = batchelor.execute(
//                {
//                    name: "POST",
//                    url: "https://jsonresponser.herokuapp.com/api/json/users",
//                    encoding: "UTF8",
//                    method: "POST",
//                    retries: 3,
//                    headers: {},
//                    doNotMergeHeaders: false,
//                    query: "/user1",
//                    mimeType: "application/json",
//                    body: "body",
//                    timeout: 5000
//                }, function (err, result) {
//                    result["NO_JSON_OBJECT"].body.should.equal(utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.NO_JSON_OBJECT).body);
//                });
//
//            jobId.should.be.a('string');
//        });

    });
});