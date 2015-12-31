var expect = require('chai').expect;
var requireHelper = require('./util/require_helper');
var validator = requireHelper('util/Validator');
var conf = requireHelper('util/Config');

describe('Validator Tests', function () {

    after(function () {
        conf.setConf({
            whiteList: ["*"]
        });
    });

    it('should not validate request without name/url', function () {
        expect(validator.isValidRequest({shmoop: "myName"})).to.be.false;
        expect(validator.isValidRequest({name: "myName"})).to.be.false;
        expect(validator.isValidRequest({url: "http://www.mySite.com"})).to.be.false;
    });

    it('should validate a valid request', function () {
        expect(validator.isValidRequest({name: "myName", url: "http://www.mySite.com"})).to.be.true;
    });

    it('should validate url against white list', function () {
        conf.setConf({
            whiteList: ["myothersite.com"]
        });
        expect(validator.isValidRequest({name: "myName", url: "http://www.mySite.com"})).to.be.false;
        expect(validator.isValidRequest({name: "myName", url: "http://www.myOtherSite.com"})).to.be.true;
    });

});