var expect = require('chai').expect;
var requireHelper = require('./util/require_helper');
var Events = requireHelper('Events');

describe('Events Tests', function () {

    it('should exist and be an object', function () {
        expect(Events).to.be.an('object');
    });

    it('should emit properly', function (done) {
        const event = "testEvent";
        Events.on(event, function (data) {
            expect(data).to.equal(1);
            done();
        });
        Events.emit(event, 1);
    });
});