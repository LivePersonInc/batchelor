var expect = require('chai').expect;
var mockery = require('mockery');
var sinon = require('sinon');
var requireHelper = require('./util/require_helper');
var CONST = requireHelper("util/Const");
var transport;

describe('Transport Tests', function () {

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
        transport = requireHelper('Transport');
    });

    after(function () {
        mockery.disable();
    });

    it('should not issue requests without url', function (done) {
        transport.issueCalls(
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
                expect(result["INVALID_TASK"].body).to.equal(CONST.RESPONSE_TYPE.INVALID_TASK.body);
                done();
            });
    });

    it('should not issue requests without name', function (done) {
        transport.issueCalls(
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
                expect(result["missingName"].body).to.equal(CONST.RESPONSE_TYPE.INVALID_TASK.body);
                done();
            });
    });

    it('should return timeout error on timeout', function (done) {
        requestStub.yields({code: "ETIMEDOUT"}, null, null);
        transport.issueCalls(
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
                expect(result["ETIMEDOUT"].body).to.equal(CONST.RESPONSE_TYPE.ETIMEDOUT.body);
                done();
            });
    });

    it('should return ERROR_API_URL', function (done) {
        requestStub.yields({error: "error"}, null, null);
        transport.issueCalls(
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
                expect(result["ERROR_API_URL"].body).to.equal(CONST.RESPONSE_TYPE.ERROR_API_URL.body);
                done();
            });
    });

    it('should return NO_JSON_OBJECT', function (done) {
        requestStub.yields(null, {statusCode: 200, headers: {bigHead: "bigHead"}}, "string");
        transport.issueCalls(
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
                expect(result["NO_JSON_OBJECT"].body).to.equal("string");
                done();
            });
    });

    it('should return array in response', function (done) {
        var body = [{
            "id": 0,
            "something": "some value"
        }, {"id": 1, "something": "some value"}];
        requestStub.yields(null, {
            statusCode: 200,
            headers: {bighead: "bighead"},
            rawHeaders: ["bigHead", "bigHead"]
        }, body);
        transport.issueCalls(
            {
                name: "MY_ARRAY",
                url: "htp://www.kojo.com",
                encoding: "UTF8",
                method: "GET",
                retries: 3,
                headers: {},
                mimeType: "application/json",
                data: "data",
                caseSensitiveHeaders: true,
                timeout: 1000
            }, function (err, result) {
                expect(result["MY_ARRAY"].body).to.equal(body);
                expect(result["MY_ARRAY"].headers["bigHead"]).to.equal("bigHead");
                done();
            });
    });

});