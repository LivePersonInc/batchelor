var expect = require('chai').expect;
var requireHelper = require('./util/require_helper');
var Media = requireHelper('media');

describe('Media', function () {

    it('should exist and be an object', function () {
        expect(Media).to.be.an('object');
    });

    it('should emit properly', function (done) {
        const event = "testEvent";
        Media.on(event, function (data) {
            expect(data).to.equal(1);
            done();
        });
        Media.emit(event, 1);
    });
});