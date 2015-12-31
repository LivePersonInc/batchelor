var expect = require('chai').expect;
var requireHelper = require('./util/require_helper');
var log = requireHelper('util/Logger');

describe('Logger Tests', function () {

    it('should have debug, info and error function', function () {
        expect(log.debug).to.be.a.function;
        expect(log.info).to.be.a.function;
        expect(log.error).to.be.a.function;
    });

    it('should allow override', function () {
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
        log.overrideLogger(newLog);
        log.debug();
        log.info();
        log.error();
        expect(counter).to.equal(3);
    });
});