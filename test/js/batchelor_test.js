var expect = require('chai').expect;
var mockery = require('mockery');
var sinon = require('sinon');
var requireHelper = require('./util/require_helper');
var conf = requireHelper("util/Config");
var log = requireHelper("util/Logger");
var batchelor;

describe('Batchelor Tests', function () {

    var transport;
    var persistent;

    before(function () {
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false,
            useCleanCache: true
        });

        transport = {setTransport: sinon.stub(), issueCalls: sinon.stub()};
        persistent = {
            preparePersistentRequests: sinon.stub(),
            persist: sinon.stub(),
            stop: sinon.stub()
        };

        // replace the module `request` with a stub object
        mockery.registerMock('./Transport', transport);
        mockery.registerMock('./Persistent', persistent);
        mockery.registerMock('./util/Logger', log);
        mockery.registerMock('./util/Config', conf);
        batchelor = requireHelper('Batchelor');
    });

    after(function () {
        mockery.disable();
    });

    it('should stop and proxy behaviour to persistent', function () {
        batchelor.stop({
            ids: "id"
        });
        expect(persistent.stop.calledOnce).to.be.true;
        expect(persistent.stop.firstCall.args[0]).to.equal("id");
    });

    it('should configure correctly', function () {
        var counter = 0;
        var newLog = {
            debug: function () {
                counter++;
            },
            info: function () {
                counter++;
            },
            error: function () {
                counter++;
            }
        };
        batchelor.configure({
            log: newLog,
            conf: {
                "maxConcurrentBatches": 10,
                "request": {
                    "method": "POST",
                    "timeout": 10000,
                    "ip": "unknown",
                    "headers": {
                        "some-header": "zzz"
                    },
                    "strictSSL": true,
                    "pool": {
                        "otherConf": "somethingElse"
                    }
                }
            }
        });
        log.debug();
        log.info();
        log.error();
        expect(counter).to.equal(3);
        var cfg = conf.getConf();
        expect(cfg.maxConcurrentBatches).to.equal(10);
        expect(cfg.request.method).to.equal("POST");
        expect(cfg.request.headers["some-header"]).to.equal("zzz");
        expect(cfg.request.pool.maxSockets).to.equal(200);
        expect(cfg.request.pool.otherConf).to.equal("somethingElse");
        expect(transport.setTransport.calledOnce).to.be.true;

    });


    it('should execute requests correctly', function () {
        var result = {
            REQ1: {
                body: {
                    someBody: 1
                }
            },
            REQ2: {
                body: {
                    myBody: 1
                }
            }
        };
        transport.issueCalls.onFirstCall().yields(null, result);
        var batchId = batchelor.execute([
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
                    stop_persistent_once_change: true
                },
                {
                    name: "REQ2",
                    url: "htp://www.kojo.com",
                    encoding: "UTF8",
                    method: "GET",
                    retries: 3,
                    mimeType: "application/json",
                    data: "data",
                    timeout: 1000
                }],
            function (err, result) {

                expect(result["REQ1"].body.someBody).to.equal(1);
                expect(result["REQ2"].body.myBody).to.equal(1);

            });

        expect(batchId).to.be.a.string;
        expect(persistent.persist.firstCall.args[1]).to.equal(result);

    });

});
