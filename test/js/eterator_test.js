var expect    = require('chai').expect;
var requireHelper = require('./util/require_helper');
var utils     = requireHelper('utils');
var commons   = requireHelper('commons/');
var Eterator  = requireHelper('commons/eterator');
var eterator;


describe('Eterator', function () {
    afterEach(function(){
        // runs after each test in this block
        eterator = null;
    });

    it('Test Empty Object', function (done) {
        eterator = new Eterator();
        expect(eterator).to.be.a("object");
        expect(eterator.start).to.be.a('function');
        expect(eterator.stop).to.be.a('function');
        expect(eterator.resume).to.be.a('function');
        expect(eterator.getProperties).to.be.a('function');
        expect(eterator.removeItem).to.be.a('function');
        expect(eterator.addItem).to.be.a('function');
        expect(eterator.addItems).to.be.a('function');
        done();
    });

    it('Test Not Empty Object', function (done) {
        eterator = new Eterator([
            {name: "name1", id: 1}
            ,{name: "name2", id: 2}
            ,{name: "name3", id: 3}
            ,{name: "name4", id: 4}
            ,{name: "name5", id: 5}
            ,{name: "name6", id: 6}
            ,{name: "name7", id: 7}
            ,{name: "name8", id: 8}
            ,{name: "name9", id: 9}
            ,{name: "name10", id: 10}
        ]);

        expect(eterator).to.be.a("object");
        expect(eterator.start).to.be.a('function');
        expect(eterator.stop).to.be.a('function');
        expect(eterator.resume).to.be.a('function');
        expect(eterator.getProperties).to.be.a('function');
        expect(eterator.removeItem).to.be.a('function');
        expect(eterator.addItem).to.be.a('function');
        expect(eterator.addItems).to.be.a('function');
        done();
    });

    it('Test functionality', function (done) {
        eterator = new Eterator();
        eterator.addItem({name: "name1"});
        eterator.addItems([{name: "name2"}, {name: "name3"}]);
        expect(eterator.getProperties().array).to.be.an("array");
        expect(eterator.getProperties().processing).to.be.a("boolean");
        expect(eterator.getProperties().array[0].name).to.be.a("string");
        expect(eterator.getProperties().array[0].name).to.equal("name1");
        expect(eterator.getProperties().array[1].name).to.be.a("string");
        expect(eterator.getProperties().array[1].name).to.equal("name2");
        expect(eterator.getProperties().array[2].name).to.be.a("string");
        expect(eterator.getProperties().array[2].name).to.equal("name3");
        eterator.stop();
        expect(eterator.getProperties().processing).to.equal(false);
        eterator.removeItem(eterator.getProperties().array[0]);
        expect(eterator.getProperties().array[0].name).to.equal("name2");
        expect(eterator.getProperties().array[1].name).to.equal("name3");

        done();
    });


    it('Test functionality start endless == false', function (done) {

        eterator = new Eterator([
            {name: "name1", id: 1}
        ]);

        eterator.start(0, false,
            function (err, item) {
                expect(item).to.be.a("object");
                expect(item.name).to.be.a("string");
                expect(item.name).to.equal("name1");
                expect(item.id).to.be.a("number");
                expect(item.id).to.equal(1);
                done();
        });
    });

    it('Test functionality start endless == false with complete callback', function (done) {

        eterator = new Eterator([
            {name: "name1", id: 1}
        ]);

        eterator.start(0, false,
            function (err, item) {
            },
            function () {
                done();
            });
    });

    it('Test functionality start endless == true', function (done) {

        eterator = new Eterator([
            {name: "name1", id: 1}
            ,{name: "name2", id: 2}
            ,{name: "name3", id: 3}
            ,{name: "name4", id: 4}
            ,{name: "name5", id: 5}
            ,{name: "name6", id: 6}
            ,{name: "name7", id: 7}
            ,{name: "name8", id: 8}
            ,{name: "name9", id: 9}
            ,{name: "name10", id: 10}
        ]);

        eterator.start(0, true,
            function (err, item) {
                if (item.name === "name10" && item.id === 10) {
                    eterator.stop();
                    done();
                }
            }
        );
    });

    it('Test functionality start and add items while running', function (done) {

        eterator = new Eterator([
            {name: "name1", id: 1}
        ]);

        eterator.start(0, true,
            function (err, item) {
            },
            function () {
            }
        );

        setImmediate(function () {
            eterator.addItem({name: "name4", id: 4});
            eterator.addItems([
                {name: "name2", id: 2}
                , {name: "name3", id: 3}
            ]);
            done();
        });

    });

    it('Test functionality start and add item while running', function (done) {

        eterator = new Eterator();

        eterator.start(0, true,
            function (err, item) {
            },
            function () {
            }
        );

        setImmediate(function () {
            eterator.addItem({name: "name", id: 1});
            done();
        });

    });

});