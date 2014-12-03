var should    = require('chai').should();
var expect    = require('chai').expect;
var assert    = require('chai').assert;
var processor = require('./../lib/processor');
var cfg = {
    "maxConcurrentJobs": 10,
    "maxRequestsPerJob": 10,
    "log" : true,
    "logger": {
        debug: function () {
        },
        info: function () {
        },
        warn: function () {
        },
        error: function () {
        }
    },
    "request": {
        "method": "GET",
        "timeout": 5,
        "ip": "unknown",
        "headers": {},
        "body": ""
    },
    "whiteList": ["*"],
    "requestValidationType": 0
};

describe('processor', function () {

    describe('configure', function () {
        it('test configure method', function () {
            processor.configure.should.be.a('function');
            processor.configure(cfg);
        });

    });
    describe('run', function () {
        it('run method', function () {
            processor.run([], function () {
            });
        });
    });
});