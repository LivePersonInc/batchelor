var expect = require('chai').expect;
var mockery = require('mockery');
var sinon = require('sinon');
var requireHelper = require('./util/require_helper');
var transport;

describe('Transport Exception Tests', function () {

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

    it('should fail on request error', function (done) {
        requestStub.throws(new Error("invalid request"));
        transport.issueCalls(
            {
                name: "NO_HEADERS",
                url: "htp://www.kojo.com",
                encoding: "UTF8",
                method: "GET",
                retries: 3,
                mimeType: "application/json",
                data: "data",
                timeout: 1000
            }, function (err, result) {
                expect(err.message).to.equal("invalid request");
                done();
            });
    });

});