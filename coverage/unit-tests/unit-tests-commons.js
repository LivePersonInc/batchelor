var should    = require('chai').should()
    , expect  = require('chai').expect
    , assert  = require('chai').assert
    , utils   = require('./../utils')
    , commons = require('./../commons')

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
    it('helper configure method', function () {
        var cfg = {
            num: 8080,
            str: "str",
            obj: {
                num: 8080,
                str: "str"
            }
        };

        var result = commons.helper.configure(cfg);
        result.should.have.ownProperty("num");
        result.should.have.ownProperty("str");
        result.should.have.ownProperty("obj");
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
        var obj = {};
        arr = commons.helper.convert2Array(arr);
        arr.should.be.a('array');
        arr.should.have.length(3);
        obj = commons.helper.convert2Array(obj);
        obj.should.be.a('array');
    });

    it('helper isObjectEmpty method', function () {
        var emptyObj = {};
        var fullObj = {a: "s"};
        commons.helper.isEmptyObject(emptyObj).should.be.a('boolean');
        commons.helper.isEmptyObject(emptyObj).should.equal(true);
        commons.helper.isEmptyObject(fullObj).should.equal(false);
    });




});