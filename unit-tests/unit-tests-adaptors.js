var request         = require('request')
    , mockery       = require('mockery')
    , sinon         = require('sinon')
    , should        = require('chai').should()
    , expect        = require('chai').expect
    , assert        = require('chai').assert
    , utils         = require('./../utils')
    , commons       = require('./../commons')
    , negotiator    = require("./../lib/negotiator")
    , batchelor
    , persistent
    , jobId
    , cfg = {
        "maxConcurrentJobs": 10,
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
        "request_default_values": {
            "method": "GET",
            "timeout": 5,
            "ip": "unknown",
            "headers": {},
            "data": ""
        },
        "whiteList": ["*"]
    }

utils.configure(cfg);

describe('Adaptor Persistent', function () {

    describe('Adaptor Persistent functionality', function(){
        /**
         * In the persistent utility we are using `request` module (https://github.com/request/request)
         * and in unit test we don't want to really make a request we use `mockery` && `sinon` to mock and stub
         * start preparation using:
         * require('mockery') && require('sinon')
         * mockery hijacks the require function and replaces modules with our mocks.
         * In the below code we register a sinon stub to be returned when require('request') is called.
         * Then we configure the mock in the test using the method .yield on the stub to a call the callback function passed to request with null/code for the error, an object for the response and another object for the data.
         * */
        var requestStub;

        before(function(){
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false,
                useCleanCache: true
            });

            requestStub = sinon.stub();

            // replace the module `request` with a stub object
            mockery.registerMock('request', requestStub);
            batchelor = require('./../batchelor');
//            persistent = require('./../adaptors/persistent');
            persistent = batchelor.persistent;
            persistent.configure(cfg);
//            persistent.setBatchelor(negotiator)
        });

        after(function(){
            mockery.disable();
        });

        it('configure', function (done) {
            var configuration;
            persistent.configure.should.be.a('function');
            configuration = persistent.configure(cfg);
            configuration.should.be.a('object');
            done();
        });

        describe('execute method', function () {
            it('execute not persistent request', function (done) {
                var jobId = persistent.execute(
                    {
                        name: "NOT_PERSISTENT_REQ_TEST_1",
                        url: "htp://www.kojo.com",
                        encoding: "UTF8",
                        method: "GET",
                        retries: 3,
                        headers: {},
                        query: "/user1",
                        mimeType: "application/json",
                        data: "data",
                        timeout: 1000
                    },
                    function (err, result) {
                    });
                jobId.should.be.a('string');
                done();
            });

            it('execute not persistent request, persistent=false', function (done) {
                var jobId = persistent.execute(
                    {
                        name: "NOT_PERSISTENT_REQ_TEST_2",
                        url: "htp://www.kojo.com",
                        encoding: "UTF8",
                        method: "GET",
                        retries: 3,
                        headers: {},
                        query: "/user1",
                        mimeType: "application/json",
                        data: "data",
                        timeout: 1000,
                        isPersistentRequest: false
                    },
                    function (err, result) {
                    });
                jobId.should.be.a('string');
                done();
            });

            it('execute persistent request not valid callback', function (done) {
                requestStub.yields(null, {statusCode: 200, headers: {bigHead: "bigHead"}}, "{\"user\":\"omher\"}");
                jobId = persistent.execute(
                    {
                        name: "PERSISTENT_REQ_TEST_2",
                        url: "htp://www.kojo.com",
                        encoding: "UTF8",
                        method: "GET",
                        retries: 3,
                        headers: {},
                        query: "/user1",
                        mimeType: "application/json",
                        data: "data",
                        timeout: 1000,
                        isPersistentRequest: true,
                        callback: "callback"
                    },
                    function (err, result) {
                        done();
                    });

            });

            it('execute persistent callback throws exception', function () {
                requestStub.yields(null, {statusCode: 200, headers: {bigHead: "bigHead"}}, "{\"user\":\"omher\"}");
                jobId = persistent.execute(
                    {
                        name: "NOT_PERSISTENT_REQ_TEST_2",
                        url: "htp://www.kojo.com",
                        encoding: "UTF8",
                        method: "GET",
                        retries: 3,
                        headers: {},
                        query: "/user1",
                        mimeType: "application/json",
                        data: "data",
                        timeout: 1000,
                        isPersistentRequest: true,
                        callback: function () {
                            throw {error: "error"};

                        }
                    },
                    function (err, result) {
                    });

            });
        });

        describe('Stop Persistent', function (done) {
            it('execute persistent and stop', function () {
                requestStub.yields(null, {statusCode: 200, headers: {bigHead: "bigHead"}}, "{\"user\":\"omher\"}");
                persistent.stop.should.be.a('function');
                var jobId = persistent.execute(
                    {
                        name: "PERSISTENT_STOP",
                        url: "http://mockURL",
                        encoding: "UTF8",
                        method: "GET",
                        retries: 3,
                        headers: {},
                        query: "/user1",
                        mimeType: "application/json",
                        data: "data",
                        timeout: 10000,
                        isPersistentRequest: true,
                        persistentDelay: 5000
                    },
                    function (err, result) {
                        persistent.stop({uniqueId: "PERSISTENT_STOP"});
                        done();
                    });
            });

            it('stop_persistent_once_change', function () {
                requestStub.yields(null, {statusCode: 200, headers: {bigHead: "bigHead"}}, "{\"user\":\"omher\"}");
                var jobId = persistent.execute(
                    {
                        name: "PERSISTENT_STOP_ONCE_CHANGE",
                        url: "http://mockURL",
                        method: "GET",
                        headers: {},
                        mimeType: "application/json",
                        data: "data",
                        timeout: 10000,
                        isPersistentRequest: true,
                        persistentDelay: 5000,
                        stop_persistent_once_change: true
                    },
                    function (err, result) {
                        done();
                    });
            });

        });

    });

});
