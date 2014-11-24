var should  = require('chai').should();
var expect  = require('chai').expect;
var assert  = require('chai').assert;
var utils   = require('./../utils/index');
var commons = require('./../commons/index');
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
        "timeout": 10000,
        "ip": "unknown",
        "headers": {},
        "body": ""
    },
    "whiteList": ["*"],
    "requestValidationType": 0
};


utils.configure(cfg);

describe('utils', function () {

    it('test objects were created', function () {
        utils.should.be.a('object');
        utils.builder.should.be.an('object');
        utils.jobHolder.should.be.an('object');
        utils.validator.should.be.an('object');
    });

    describe('builder', function () {

        it('test builder functionality', function () {
            utils.builder.configure.should.be.a('function');
            utils.builder.buildResponse.should.be.a('function');

            utils.builder.buildResponse("INVALID_TASK").body.should.equal(commons.CONST.BODY_RESPONSE.INVALID_TASK);
            utils.builder.buildResponse("INVALID_TASK").statusCode.should.equal(commons.CONST.HTTP_STATUS.BAD_REQUEST);

            utils.builder.buildResponse("ETIMEDOUT").body.should.equal(commons.CONST.BODY_RESPONSE.ETIMEDOUT);
            utils.builder.buildResponse("ETIMEDOUT").statusCode.should.equal(commons.CONST.HTTP_STATUS.GATEWAY_TIMEOUT);

            utils.builder.buildResponse("ECONNREFUSED").body.should.equal(commons.CONST.BODY_RESPONSE.ECONNREFUSED);
            utils.builder.buildResponse("ECONNREFUSED").statusCode.should.equal(commons.CONST.HTTP_STATUS.NOT_FOUND);

            utils.builder.buildResponse("ENOTFOUND").body.should.equal(commons.CONST.BODY_RESPONSE.ENOTFOUND);
            utils.builder.buildResponse("ENOTFOUND").statusCode.should.equal(commons.CONST.HTTP_STATUS.NOT_FOUND);

            utils.builder.buildResponse("ERROR_API_URL").body.should.equal(commons.CONST.BODY_RESPONSE.ERROR_API_URL);
            utils.builder.buildResponse("ERROR_API_URL").statusCode.should.equal(commons.CONST.HTTP_STATUS.INTERNAL_SERVER_ERROR);

            utils.builder.buildResponse("NO_JSON_OBJECT").body.should.equal(commons.CONST.BODY_RESPONSE.NO_JSON_OBJECT);
            utils.builder.buildResponse("NO_JSON_OBJECT").statusCode.should.equal(commons.CONST.HTTP_STATUS.INTERNAL_SERVER_ERROR);

            utils.builder.buildResponse("DEFAULT").body.should.equal(commons.CONST.BODY_RESPONSE.DEFAULT);
            utils.builder.buildResponse("DEFAULT").statusCode.should.equal(commons.CONST.HTTP_STATUS.NOT_FOUND);
        });
    });

    describe('validator', function () {

        it('test methods', function () {
            utils.validator.configure.should.be.a('function');
            utils.validator.isValidRequest.should.be.a('function');
            utils.validator.cleanRequest.should.be.a('function');
        });

        it('isValidRequest method', function () {
            utils.validator.isValidRequest({name: "name", url: "url", method: "GET"}).should.be.a('boolean');
            utils.validator.isValidRequest({name: "name", url: "url", method: "GET"}).should.equal(true);
            utils.validator.isValidRequest({url: "url", method: "GET"}).should.equal(false);
            utils.validator.isValidRequest({name: "name", method: "GET"}).should.equal(false);
            utils.validator.isValidRequest({name: "name", url: "url"}).should.equal(false);
            utils.validator.isValidRequest({}).should.equal(false);
            utils.validator.isValidRequest().should.equal(false);

        });

        it('cleanRequest method', function () {
            var validReq = utils.validator.cleanRequest({name: "name", url: "url", headers: {custom: "custom"}});
            var inValidReq = utils.validator.cleanRequest({name: "name", url: "url", headers: {host: "host"}});
            validReq.should.have.ownProperty("headers")
            inValidReq.should.have.not.ownProperty("headers.host")
        });
    });

    describe('jobHolder', function () {

        it('methods', function () {
            utils.jobHolder.configure.should.be.a('function');
            utils.jobHolder.addJob.should.be.a('function');
            utils.jobHolder.getJob.should.be.a('function');
            utils.jobHolder.clean.should.be.a('function');
        });

        it('addJob/getJob/clean methods', function () {
            var job = [{
                name: "single",
                url: "https://jsonresponser.herokuapp.com/api/json/users",
                method: "GET",
                encoding: "UTF8",
                retries: 3,
                headers: {},
                query: "/user1",
                mimeType: "application/json",
                body: "body",
                timeout: 10000
            }];

            var jobId = utils.jobHolder.addJob(job);
            jobId.should.be.a('string');

            var jobObj = utils.jobHolder.getJob(jobId);
            jobObj.should.be.an('object');

            utils.jobHolder.clean(jobId);
            var jobObj = utils.jobHolder.getJob(jobId);
            expect(jobObj).to.be.a('null');

        });
    });
});