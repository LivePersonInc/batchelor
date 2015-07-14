var request     = require('request')
    , mockery   = require('mockery')
    , sinon     = require('sinon')
    , should    = require('chai').should()
    , expect    = require('chai').expect
    , assert    = require('chai').assert
    , utils     = require('./../utils')
    , commons   = require('./../commons')
    , batchelor
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

describe('batchelor', function () {

    describe('functionality', function(){
        /**
         * In the batchelor utility we are using `request` module (https://github.com/request/request)
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
            batchelor.configure(cfg);
        });

        after(function(){
            mockery.disable();
        });

        it('configure', function (done) {
            batchelor.configure.should.be.a('function');
            var configuration = batchelor.configure(cfg);
            configuration.should.have.ownProperty("whiteList");
            configuration.request_default_values.timeout.should.be.a('number');
            configuration.request_default_values.timeout.should.be.equal(5);
            done();
        });

        it('execute method - INVALID_TASK - Missing URL', function (done) {
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
                    data: "data",
                    timeout: 10000
                }, function (err, result) {
                    result["INVALID_TASK"].body.should.equal(utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.INVALID_TASK).body);
                    done();

                });

        });

        it('execute method - INVALID_TASK - Missing name', function (done) {
            jobId = batchelor.execute(
                {
                    encoding: "UTF8",
                    method: "GET",
                    retries: 3,
                    headers: {},
                    doNotMergeHeaders: false,
                    query: "/user1",
                    mimeType: "application/json",
                    data: "data",
                    timeout: 10000
                }, function (err, result) {
                    result["missingName"].body.should.equal(utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.INVALID_TASK).body);
                    done();

                });

            jobId.should.be.a('string');
        });

        it('execute method - ETIMEDOUT', function (done) {
            requestStub.yields({code: "ETIMEDOUT"}, null, null);
            jobId = batchelor.execute(
                {
                    name: "ETIMEDOUT",
                    url: "http://notexisturl",
                    encoding: "UTF8",
                    method: "GET",
                    retries: 3,
                    headers: {},
                    mimeType: "application/json",
                    data: "data",
                    timeout: 100
                }, function (err, result) {
                    result["ETIMEDOUT"].body.should.equal(utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.ETIMEDOUT).body);
                    done();

                });

            jobId.should.be.a('string');
        });

        it('execute method - ERROR_API_URL', function (done) {
            requestStub.yields({error: "error"}, null, null);
            jobId = batchelor.execute(
                {
                    name: "ERROR_API_URL",
                    url: "htp://www.kojo.com",
                    encoding: "UTF8",
                    method: "GET",
                    retries: 3,
                    headers: {},
                    mimeType: "application/json",
                    data: "data",
                    timeout: 1000
                }, function (err, result) {
                    result["ERROR_API_URL"].body.should.equal(utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.ERROR_API_URL).body);
                    done();
                });

            jobId.should.be.a('string');
        });

        it.skip('execute method - NO_JSON_OBJECT', function (done) {
            requestStub.yields(null, {statusCode: 200, headers: {bigHead: "bigHead"}}, "string");
            jobId = batchelor.execute(
                {
                    name: "NO_JSON_OBJECT",
                    url: "htp://www.kojo.com",
                    encoding: "UTF8",
                    method: "GET",
                    retries: 3,
                    headers: {},
                    mimeType: "application/json",
                    data: "data",
                    timeout: 1000
                }, function (err, result) {
                    result["NO_JSON_OBJECT"].body.should.equal(utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.NO_JSON_OBJECT).body);
                    done();
                });

            jobId.should.be.a('string');
        });

    });

});