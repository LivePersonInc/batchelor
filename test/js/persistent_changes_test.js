var request         = require('request');
var mockery       = require('mockery');
var sinon         = require('sinon');
var expect        = require('chai').expect;
var requireHelper = require('./util/require_helper');
var utils         = requireHelper('utils');
var commons       = requireHelper('commons');
var batchelor;
var persistent;
var jobId;
var cfg = {
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
    };

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
            batchelor = require('./../../batchelor');
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
            expect(persistent.configure).to.be.a('function');
            configuration = persistent.configure(cfg);
            expect(configuration).to.be.a('object');
            done();
        });

        describe('execute method', function () {

            it('should execute persistent and get changes', function (done) {
                requestStub.onFirstCall().yieldsAsync(null, {statusCode: 200, headers: {bigHead: "bigHead"}}, "{\"account\":\"omerh\"}");
                requestStub.onSecondCall().yieldsAsync(null, {statusCode: 200, headers: {bigHead: "bigHead"}}, "{\"account\":\"omerh\"}");
                requestStub.onThirdCall().yieldsAsync(null, {statusCode: 200, headers: {bigHead: "bigHead"}}, "{\"account\":\"miki\"}");

                var count = 0;
                var jobId = persistent.execute(
                    {
                        name: "PERSISTENT_CHANGES",
                        url: "http://mockURL",
                        encoding: "UTF8",
                        method: "GET",
                        retries: 3,
                        headers: {},
                        query: "/user1",
                        mimeType: "application/json",
                        data: "data",
                        timeout: 100,
                        isPersistentRequest: true,
                        persistentDelay: 200
                    },
                    function (err, result) {
                        if (count === 0) {
                            expect(err).to.be.null;
                            expect(result).to.be.defined;
                            expect(result.PERSISTENT_CHANGES.body.account).to.equal("omerh");
                        } else if (count === 1) {
                            expect(err).to.be.null;
                            expect(result).to.be.defined;
                            expect(result.PERSISTENT_CHANGES.body.account).to.equal("miki");
                            done();
                        }
                        count++;
                    });
            });
        });

    });

});