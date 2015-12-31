var request = require('request');
var mockery = require('mockery');
var sinon = require('sinon');
var expect = require('chai').expect;
var requireHelper = require('./util/require_helper');
var utils = requireHelper('utils');
var commons = requireHelper('commons');
var processor;
var cfg = {
    "originalHeader": true,
    "maxConcurrentJobs": 10,
    "log": true,
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

describe('processor', function () {
    describe('processor functionality', function () {
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

        before(function () {
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false,
                useCleanCache: true
            });

            requestStub = sinon.stub();

            // replace the module `request` with a stub object
            mockery.registerMock('request', requestStub);
            processor = requireHelper('processor');
            processor.configure(cfg);
        });

        after(function () {
            mockery.disable();
        });

        it('configure', function (done) {
            expect(processor.configure).to.be.a('function');
            var configuration = processor.configure(cfg);
            expect(configuration).to.be.a('object');
            done();
        });

        it('execute method - ETIMEDOUT', function (done) {
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
                    expect(result["ETIMEDOUT"].body).to.equal(utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.ETIMEDOUT).body);
                    done();
                });
        });

        it('run method - ERROR_API_URL', function (done) {
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
                    expect(result["ERROR_API_URL"].body).to.equal(utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.ERROR_API_URL).body);
                    done();
                });

        });

        it('using param originalHeader', function (done) {
            before(function () {
                cfg.originalHeader = true;
                processor.configure(cfg);
            });
            requestStub.yields(null, {statusCode: 200, headers: {bigHead: "bigHead"}}, {"name": "myname", "id": 1});
            jobId = processor.run(
                [{
                    name: "ORIGINAL_HEADERS",
                    url: "htp://www.kojo.com",
                    encoding: "UTF8",
                    method: "GET",
                    retries: 3,
                    headers: {},
                    mimeType: "application/json",
                    data: "data",
                    timeout: 1000
                }], function (err, result) {
                    expect(result["ORIGINAL_HEADERS"].originalHeader).to.be.a('string');
                    done();
                });

        });

        it('using param originalHeader false', function (done) {
            requestStub.yields(null, {statusCode: 200, headers: {bigHead: "bigHead"}}, {"name": "myname", "id": 1});
            cfg.originalHeader = false;
            processor.configure(cfg);
            jobId = processor.run(
                [{
                    name: "ORIGINAL_HEADERS_FALSE",
                    url: "htp://www.kojo.com",
                    encoding: "UTF8",
                    method: "GET",
                    retries: 3,
                    headers: {},
                    mimeType: "application/json",
                    data: "data",
                    timeout: 1000
                }], function (err, result) {
                    expect(result["ORIGINAL_HEADERS_FALSE"].originalHeader).to.not.exist;
                    done();
                });

        });

    });
});
