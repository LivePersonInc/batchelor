var expect = require('chai').expect;
var requireHelper = require('./util/require_helper');
var Media = requireHelper('media');

describe('Media', function () {

    it('object was created', function () {
        expect(Media).to.be.an('object');
    });
});