var expect  = require('chai').expect;
var requireHelper = require('./util/require_helper');
var utils   = requireHelper('utils');
var commons = requireHelper('commons');

describe('commons', function () {

    it('objects were created', function () {

        expect(commons).to.be.an.object;
        expect(commons.CONST).to.be.an.object;
        expect(commons.helper).to.be.an.object;
    });

    it('helper', function () {
        expect(commons.helper.configure).to.be.a.function;
        expect(commons.helper.merge).to.be.a.function;
        expect(commons.helper.setDefaultValues).to.be.a.function;
        expect(commons.helper.convert2Array).to.be.a.function;
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
        expect(result).to.have.ownProperty("num");
        expect(result).to.have.ownProperty("str");
        expect(result).to.have.ownProperty("obj");
    });
    it('helper merge method', function () {
        var source = {
            a: "a"
        };
        var target = {
            b: "b"
        };
        target = commons.helper.merge(source, target);
        expect(target).to.have.ownProperty("a");
        expect(target).to.have.ownProperty("b");
    });

    it('helper setDefaultValues method', function () {
        var source = {
            a: "a"
        };
        var target = {
            b: "b"
        };
        target = commons.helper.setDefaultValues(source, target);
        expect(target).to.have.ownProperty("a");
        expect(target).to.have.ownProperty("b");
    });

    it('helper convert2Array method', function () {
        var arr = [0, 1, 2];
        var obj = {};
        arr = commons.helper.convert2Array(arr);
        expect(arr).to.be.an.array;
        expect(arr).to.have.length(3);
        obj = commons.helper.convert2Array(obj);
        expect(obj).to.be.an.array;
    });

    it('helper isObjectEmpty method', function () {
        var emptyObj = {};
        var fullObj = {a: "s"};
        expect(commons.helper.isEmptyObject(emptyObj)).to.be.a.boolean;
        expect(commons.helper.isEmptyObject(emptyObj)).to.equal(true);
        expect(commons.helper.isEmptyObject(fullObj)).to.equal(false);
    });




});