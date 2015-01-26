var should    = require('chai').should()
    , expect  = require('chai').expect
    , assert  = require('chai').assert
    , Media   = require('./../media')

describe('Media', function () {

    it('object was created', function () {
        Media.should.be.an('object');
    });
});