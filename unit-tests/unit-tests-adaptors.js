var should    = require('chai').should();
var expect    = require('chai').expect;
var assert    = require('chai').assert;
var persitent = require('./../adaptors/persistent');
var utils     = require('./../utils');
var commons   = require('./../commons');
var cfg = {


    "maxConcurrentJobs": 10,
    "maxRequestsPerJob": 10,
    "log" : true,
    "request": {
        "method": "GET",
        "timeout": 10000,
        "ip": "unknown",
        "headers": {},
        "body": ""
    },
    "logger": {
        debug: function () {
        },
        info: function () {
        },
        warn: function () {
        },
        error: function () {
        }
    }
};

utils.configure(cfg);

describe('Adaptor Persistent', function () {

    describe('configure', function () {
        it('configure method', function () {
            persitent.configure.should.be.a('function');
            persitent.configure(cfg);
        });
    });

    describe('execute method', function () {
        var jobId;

        it('execute', function () {
            jobId = persitent.execute(
                {
                    name: "PERSISTENT_REQ",
                    url: "htp://www.kojo.com",
                    encoding: "UTF8",
                    method: "GET",
                    retries: 3,
                    headers: {},
                    query: "/user1",
                    mimeType: "application/json",
                    body: "body",
                    timeout: 1000,
                    persistent: true,
                    persistentDelay: 5000
                },
                function (err, result) {
                    result["PERSISTENT_REQ"].body.should.equal(utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.INVALID_TASK).body);
                });

            jobId.should.be.a('string');
        });

        it('execute not persistent request', function () {
            jobId = persitent.execute(
                {
                    name: "NOT_PERSISTENT_REQ_TEST_1",
                    url: "htp://www.kojo.com",
                    encoding: "UTF8",
                    method: "GET",
                    retries: 3,
                    headers: {},
                    query: "/user1",
                    mimeType: "application/json",
                    body: "body",
                    timeout: 1000
                },
                function (err, result) {
                });

        });

        it('execute not persistent request, persistent=false', function () {
            jobId = persitent.execute(
                {
                    name: "NOT_PERSISTENT_REQ_TEST_2",
                    url: "htp://www.kojo.com",
                    encoding: "UTF8",
                    method: "GET",
                    retries: 3,
                    headers: {},
                    query: "/user1",
                    mimeType: "application/json",
                    body: "body",
                    timeout: 1000,
                    persistent: false
                },
                function (err, result) {
                });

        });

        it('execute persistent request not valid callback', function () {
            jobId = persitent.execute(
                {
                    name: "NOT_PERSISTENT_REQ_TEST_2",
                    url: "htp://www.kojo.com",
                    encoding: "UTF8",
                    method: "GET",
                    retries: 3,
                    headers: {},
                    query: "/user1",
                    mimeType: "application/json",
                    body: "body",
                    timeout: 1000,
                    persistent: true,
                    callback: "callback"
                },
                function (err, result) {
                });

        });

        it('execute persistent request small delay', function () {
            jobId = persitent.execute(
                {
                    name: "NOT_PERSISTENT_REQ_TEST_4",
                    url: "https://jsonresponser.herokuapp.com/api/json/users",
                    encoding: "UTF8",
                    method: "GET",
                    retries: 3,
                    headers: {},
                    query: "/user1",
                    mimeType: "application/json",
                    body: "body",
                    timeout: 10000,
                    persistent: true,
                    persistentDelay: 1,
                    callback: "callback"
                },
                function (err, result) {
                });
        });


        describe('stop method', function () {
            it('execute persistent and stop', function () {
                persitent.stop.should.be.a('function');
                jobId = persitent.execute(
                    {
                        name: "PERSISTENT_STOP",
                        url: "https://jsonresponser.herokuapp.com/api/json/users",
                        encoding: "UTF8",
                        method: "GET",
                        retries: 3,
                        headers: {},
                        query: "/user1",
                        mimeType: "application/json",
                        body: "body",
                        timeout: 10000,
                        persistent: true,
                        persistentDelay: 5000
                    },
                    function (err, result) {
                    });
            });

//            persitent.stop(jobId, "PERSISTENT_STOP");
        });
    });
});