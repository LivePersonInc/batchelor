var expect = require('chai').expect;
var mockery = require('mockery');
var sinon = require('sinon');
var requireHelper = require('./util/require_helper');
var CONST = requireHelper("util/Const");
var persistent;

describe('Persistent Tests', function () {

    var transport;

    before(function () {
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false,
            useCleanCache: true
        });

        transport = {issueCalls: sinon.stub()};

        // replace the module `request` with a stub object
        mockery.registerMock('./Transport', transport);
        persistent = requireHelper('Persistent');
    });

    after(function () {
        mockery.disable();
    });

    it('should not stop a non existent unique id', function () {
        var reqs = persistent.stop("my Id");
        expect(reqs).to.have.length(0);
    });

    it('should filter requests correctly', function () {
        var filtered = persistent.preparePersistentRequests([
            {
                name: "REQ1",
                url: "htp://www.kojo.com",
                encoding: "UTF8",
                method: "GET",
                retries: 3,
                mimeType: "application/json",
                data: "data",
                persistent: true,
                timeout: 1000
            },
            {
                name: "REQ2",
                url: "htp://www.kojo.com",
                encoding: "UTF8",
                method: "GET",
                retries: 3,
                mimeType: "application/json",
                data: "data",
                isPersistentRequest: true,
                timeout: 1000
            },
            {
                name: "REQ3",
                url: "htp://www.kojo.com",
                encoding: "UTF8",
                method: "GET",
                retries: 3,
                mimeType: "application/json",
                data: "data",
                timeout: 1000
            }], function () {
        });
        expect(filtered).to.have.length(2);

        for (var i = 0; i < filtered.length; i++) {
            var reqs = persistent.stop(filtered[i].uniqueId);
            expect(reqs).to.have.length(1);
        }
    });


    it('should persist', function (done) {
        transport.issueCalls.onFirstCall().yields(null, {
            REQ1: {
                body: {
                    someBody: 1
                }
            }
        });
        transport.issueCalls.onSecondCall().yields(null, {
            REQ2: {
                body: {
                    myBody: 1
                }
            }
        });
        var req1NewRes;
        var req2NewRes;
        var filtered = persistent.preparePersistentRequests([
            {
                name: "REQ1",
                url: "htp://www.kojo.com",
                encoding: "UTF8",
                method: "GET",
                retries: 3,
                mimeType: "application/json",
                data: "data",
                persistent: true,
                timeout: 1000,
                persistentDelay: 20,
                stop_persistent_once_change: true,
                callback: function (err, result) {
                    req1NewRes = result;
                }
            },
            {
                name: "REQ2",
                url: "htp://www.kojo.com",
                encoding: "UTF8",
                method: "GET",
                retries: 3,
                mimeType: "application/json",
                data: "data",
                isPersistentRequest: true,
                timeout: 1000,
                persistentDelay: 30,
                stop_persistent_once_change: true,
                callback: function (err, result) {
                    req2NewRes = result;
                }
            }]);

        persistent.persist(filtered, {
            REQ1: {
                someBody: 0
            },
            REQ2: {
                myBody: 0
            }
        });

        setTimeout(function () {
            expect(req1NewRes).to.be.defined;
            expect(req1NewRes.REQ1.body.someBody).to.equal(1);
            expect(req2NewRes).to.be.defined;
            expect(req2NewRes.REQ2.body.myBody).to.equal(1);
            done();
        }, 50);

    });

});