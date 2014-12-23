var should      = require('chai').should()
    , expect    = require('chai').expect
    , assert    = require('chai').assert
    , utils     = require('./../utils')
    , commons   = require('./../commons/')
    , Eterator  = require('./../commons/eterator')
    , eterator


describe('Eterator', function () {
    afterEach(function(){
        // runs after each test in this block
        eterator = null;
    });

    it('Test Empty Object', function (done) {
        eterator = new Eterator();
        eterator.should.be.a("object");
        eterator.start.should.be.a('function');
        eterator.stop.should.be.a('function');
        eterator.resume.should.be.a('function');
        eterator.getProperties.should.be.a('function');
        eterator.removeItem.should.be.a('function');
        eterator.addItem.should.be.a('function');
        eterator.addItems.should.be.a('function');
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

        eterator.should.be.a("object");
        eterator.start.should.be.a('function');
        eterator.stop.should.be.a('function');
        eterator.resume.should.be.a('function');
        eterator.getProperties.should.be.a('function');
        eterator.removeItem.should.be.a('function');
        eterator.addItem.should.be.a('function');
        eterator.addItems.should.be.a('function');
        done();
    });

    it('Test functionality', function (done) {
        eterator = new Eterator();
        eterator.addItem({name: "name1"});
        eterator.addItems([{name: "name2"}, {name: "name3"}]);
        eterator.getProperties().array.should.be.an("array");
        eterator.getProperties().processing.should.be.a("boolean");
        eterator.getProperties().array[0].name.should.be.a("string");
        eterator.getProperties().array[0].name.should.equal("name1");
        eterator.getProperties().array[1].name.should.be.a("string");
        eterator.getProperties().array[1].name.should.equal("name2");
        eterator.getProperties().array[2].name.should.be.a("string");
        eterator.getProperties().array[2].name.should.equal("name3");
        eterator.stop()
        eterator.getProperties().processing.should.equal(false);
        eterator.removeItem(eterator.getProperties().array[0]);
        eterator.getProperties().array[0].name.should.equal("name2");
        eterator.getProperties().array[1].name.should.equal("name3");

        done();
    });


    it('Test functionality start endless == false', function (done) {

        eterator = new Eterator([
            {name: "name1", id: 1}
        ]);

        eterator.start(0, false,
            function (err, item) {
                item.should.be.a("object");
                item.name.should.be.a("string");
                item.name.should.equal("name1");
                item.id.should.be.a("number");
                item.id.should.equal(1);
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

});