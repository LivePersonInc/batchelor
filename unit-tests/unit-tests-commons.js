var should  = require('chai').should();
var expect  = require('chai').expect;
var assert  = require('chai').assert;
var utils   = require('./../utils/utils');
var commons = require('./../commons/commons');

describe('commons', function () {

    it('objects were created', function () {

        commons.should.be.an('object');
        commons.CONST.should.be.an('object');
        commons.helper.should.be.an('object');
    });

    it('helper', function () {
        commons.helper.configure.should.be.a('function');
        commons.helper.merge.should.be.a('function');
        commons.helper.setAdditionalProps.should.be.a('function');
        commons.helper.convert2Array.should.be.a('function');
    });

    it('helper merge method', function () {
        var source = {
            a: "a"
        };
        var target = {
            b: "b"
        }
        target = commons.helper.merge(source, target);
        target.should.have.ownProperty("a");
        target.should.have.ownProperty("b");
    });

    it('helper setAdditionalProps method', function () {
        var source = {
            a: "a"
        };
        var target = {
            b: "b"
        }
        target = commons.helper.setAdditionalProps(source, target);
        target.should.have.ownProperty("a");
        target.should.have.ownProperty("b");
    });

    it('helper convert2Array method', function () {
        var arr = [0, 1, 2];
        arr = commons.helper.convert2Array(arr);
        arr.should.be.a('array');
        arr.should.have.length(3);
    });




});