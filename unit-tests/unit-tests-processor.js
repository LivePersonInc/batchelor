var request     = require('request')
    , mockery   = require('mockery')
    , sinon     = require('sinon')
    , should    = require('chai').should()
    , expect    = require('chai').expect
    , assert    = require('chai').assert
    , utils     = require('./../utils')
    , commons   = require('./../commons')
    , processor
    , cfg = {
    "maxConcurrentJobs": 10,
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

describe('processor', function () {
    describe('processor functionality', function(){
        /**
         * In the processor utility we are using `request` module (https://github.com/request/request)
         * and in unit test we don't want to really make a request we use `mockery` && `sinon` to mock and stub
         * start preparation using:
         * require('mockery') && require('sinon')
         * mockery hijacks the require function and replaces modules with our mocks.
         * In the below code we register a sinon stub to be returned when require('request') is called.
         * Then we configure the mock in the test using the method .yield on the stub to a call the callback function passed to request with null/code for the error, an object for the response and another object for the body.
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
            processor = require('./../lib/processor');
            processor.configure(cfg);
        });

        after(function(){
            mockery.disable();
        });

        it('configure', function (done) {
            processor.configure.should.be.a('function');
            var configuration = processor.configure(cfg);
            configuration.should.be.a('object');
            done();
        });

        it('execute method - INVALID_TASK - Missing URL', function () {
            processor.run(
                [{
                    name: "INVALID_TASK",
                    encoding: "UTF8",
                    method: "GET",
                    retries: 3,
                    headers: {},
                    mimeType: "application/json",
                    data: "body",
                    timeout: 10000
                }], function (err, result) {
                    console.log(JSON.stringify(result));
                    result["INVALID_TASK"].data.should.equal(utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.INVALID_TASK).data);
                });
        });

        it('execute method - ETIMEDOUT', function () {
            requestStub.yields({code: "ETIMEDOUT"}, null, null);
            processor.run(
                [{
                    name: "ETIMEDOUT",
                    url: "http://notexisturl",
                    encoding: "UTF8",
                    method: "GET",
                    retries: 3,
                    headers: {},
                    mimeType: "application/json",
                    data: "data",
                    timeout: 100
                }], function (err, result) {
                    result["ETIMEDOUT"].data.should.equal(utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.ETIMEDOUT).data);
                });
        });

        it('run method - ERROR_API_URL', function () {
            requestStub.yields({error: "error"}, {response: "response"}, null);
            processor.run(
                [{
                    name: "ERROR_API_URL",
                    url: "htp://www.kojo.com",
                    encoding: "UTF8",
                    method: "GET",
                    retries: 3,
                    headers: {},
                    mimeType: "application/json",
                    data: "data",
                    timeout: 1000
                }], function (err, result) {
                    result["ERROR_API_URL"].data.should.equal(utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.ERROR_API_URL).data);
                });

        });

        it('run method - NO_JSON_OBJECT', function () {
            requestStub.yields(null, {statusCode: 200, headers: {bigHead: "bigHead"}}, "string");
            jobId = processor.run(
                [{
                    name: "NO_JSON_OBJECT",
                    url: "htp://www.kojo.com",
                    encoding: "UTF8",
                    method: "GET",
                    retries: 3,
                    headers: {},
                    mimeType: "application/json",
                    data: "data",
                    timeout: 1000
                }], function (err, result) {
                    result["NO_JSON_OBJECT"].data.should.equal(utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.NO_JSON_OBJECT).data);
                });

        });

    });
});
