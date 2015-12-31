var request = require('request');
var mockery = require('mockery');
var sinon = require('sinon');
var expect = require('chai').expect;
var requireHelper = require('./util/require_helper');
var utils = requireHelper('utils');
var commons = requireHelper('commons');
var batchelor;
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

describe('batchelor', function () {

    describe('functionality', function () {
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

        before(function () {
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false,
                useCleanCache: true
            });

            requestStub = sinon.stub();

            // replace the module `request` with a stub object
            mockery.registerMock('request', requestStub);
            batchelor = require('./../../batchelor');
            batchelor.configure(cfg);
        });

        after(function () {
            mockery.disable();
        });

        it('configure', function (done) {
            expect(batchelor.configure).to.be.a.function;
            var configuration = batchelor.configure(cfg);
            expect(configuration).to.have.ownProperty("whiteList");
            expect(configuration.request_default_values.timeout).to.be.a.number;
            expect(configuration.request_default_values.timeout).to.equal(5);
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
                    expect(result["INVALID_TASK"].body).to.equal(utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.INVALID_TASK).body);
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
                    expect(result["missingName"].body).to.equal(utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.INVALID_TASK).body);
                    done();

                });
            expect(jobId).to.be.a.string;
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
                    expect(result["ETIMEDOUT"].body).to.equal(utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.ETIMEDOUT).body);
                    done();

                });
            expect(jobId).to.be.a.string;
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
                    expect(result["ERROR_API_URL"].body).to.equal(utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.ERROR_API_URL).body);
                    done();
                });
            expect(jobId).to.be.a.string;
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
                    expect(result["NO_JSON_OBJECT"].body).to.equal(utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.NO_JSON_OBJECT).body);
                    done();
                });
            expect(jobId).to.be.a.string;
        });

        it('execute method - array in response', function (done) {
            var body = [{
                "id": 0,
                "something": "some value"
            }, {"id": 1, "something": "some value"}];
            requestStub.yields(null, {statusCode: 200, headers: {bigHead: "bigHead"}}, body);
            jobId = batchelor.execute(
                {
                    name: "MY_ARRAY",
                    url: "htp://www.kojo.com",
                    encoding: "UTF8",
                    method: "GET",
                    retries: 3,
                    headers: {},
                    mimeType: "application/json",
                    data: "data",
                    timeout: 1000
                }, function (err, result) {
                    expect(result["MY_ARRAY"].body).to.equal(body);
                    done();
                });
            expect(jobId).to.be.a.string;
        });

    });

});