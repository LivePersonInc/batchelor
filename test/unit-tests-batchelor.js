var should    = require('chai').should();
var expect    = require('chai').expect;
var assert    = require('chai').assert;
var batchelor = require('./../batchelor');
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

describe('batchelor', function () {

    describe('configure', function () {
        it('configure method', function () {
            batchelor.configure.should.be.a('function');
            var configuration = batchelor.configure(cfg);
            configuration.should.have.ownProperty("whiteList");
            configuration.request.timeout.should.be.a('number');
            configuration.request.timeout.should.be.equal(5);
        });

    });
    describe('execute', function () {
        var jobId;
        it('execute method', function () {
            jobId = batchelor.execute([], function () {
            });
            jobId.should.be.a('string');
        });
    });
});