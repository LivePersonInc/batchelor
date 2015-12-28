var expect = require('chai').expect;
var requireHelper = require('./util/require_helper');
var utils = requireHelper('utils');
var commons = requireHelper('commons');
var cfg = {
    "maxConcurrentJobs": 10,
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
    "request_default_values": {
        "method": "GET",
        "timeout": 10000,
        "ip": "unknown",
        "headers": {},
        "data": ""
    },
    "whiteList": ["*"]
};


utils.configure(cfg);

describe('utils', function () {

    it('test objects were created', function () {
        expect(utils).to.be.a('object');
        expect(utils.builder).to.be.an('object');
        expect(utils.jobHolder).to.be.an('object');
        expect(utils.validator).to.be.an('object');
    });

    describe('builder', function () {

        it('test builder functionality', function () {
            var cfg = {
                num: 8080,
                str: "str",
                obj: {
                    num: 8080,
                    str: "str"
                }
            };

            var result = utils.builder.configure(cfg);
            expect(result).to.have.ownProperty("num");
            expect(result).to.have.ownProperty("str");
            expect(result).to.have.ownProperty("obj");

            expect(utils.builder.configure).to.be.a('function');
            expect(utils.builder.buildResponse).to.be.a('function');


            expect(utils.builder.buildResponse("INVALID_TASK").body).to.equal(commons.CONST.BODY_RESPONSE.INVALID_TASK);
            expect(utils.builder.buildResponse("INVALID_TASK").statusCode).to.equal(commons.CONST.HTTP_STATUS.BAD_REQUEST);

            expect(utils.builder.buildResponse("ETIMEDOUT").body).to.equal(commons.CONST.BODY_RESPONSE.ETIMEDOUT);
            expect(utils.builder.buildResponse("ETIMEDOUT").statusCode).to.equal(commons.CONST.HTTP_STATUS.GATEWAY_TIMEOUT);

            expect(utils.builder.buildResponse("ECONNREFUSED").body).to.equal(commons.CONST.BODY_RESPONSE.ECONNREFUSED);
            expect(utils.builder.buildResponse("ECONNREFUSED").statusCode).to.equal(commons.CONST.HTTP_STATUS.NOT_FOUND);

            expect(utils.builder.buildResponse("ENOTFOUND").body).to.equal(commons.CONST.BODY_RESPONSE.ENOTFOUND);
            expect(utils.builder.buildResponse("ENOTFOUND").statusCode).to.equal(commons.CONST.HTTP_STATUS.NOT_FOUND);

            expect(utils.builder.buildResponse("ERROR_API_URL").body).to.equal(commons.CONST.BODY_RESPONSE.ERROR_API_URL);
            expect(utils.builder.buildResponse("ERROR_API_URL").statusCode).to.equal(commons.CONST.HTTP_STATUS.INTERNAL_SERVER_ERROR);

            expect(utils.builder.buildResponse("NO_JSON_OBJECT").body).to.equal(commons.CONST.BODY_RESPONSE.NO_JSON_OBJECT);
            expect(utils.builder.buildResponse("NO_JSON_OBJECT").statusCode).to.equal(commons.CONST.HTTP_STATUS.BAD_REQUEST);

            expect(utils.builder.buildResponse("DEFAULT").body).to.equal(commons.CONST.BODY_RESPONSE.DEFAULT);
            expect(utils.builder.buildResponse("DEFAULT").statusCode).to.equal(commons.CONST.HTTP_STATUS.NOT_FOUND);

            expect(utils.builder.buildResponse().body).to.equal(commons.CONST.BODY_RESPONSE.DEFAULT);
            expect(utils.builder.buildResponse().statusCode).to.equal(commons.CONST.HTTP_STATUS.NOT_FOUND);
        });
    });

    describe('validator', function () {

        it('test methods', function () {
            expect(utils.validator.configure).to.be.a('function');
            expect(utils.validator.isValidRequest).to.be.a('function');
            expect(utils.validator.cleanRequest).to.be.a('function');
            expect(utils.validator.isPersistentRequest).to.be.a('function');
        });

        it('isValidRequest method', function () {
            expect(utils.validator.isValidRequest({name: "name", url: "url", method: "GET"})).to.be.a('boolean');
            expect(utils.validator.isValidRequest({name: "name", url: "url", method: "GET"})).to.equal(true);
            expect(utils.validator.isValidRequest({url: "url", method: "GET"})).to.equal(false);
            expect(utils.validator.isValidRequest({name: "name", method: "GET"})).to.equal(false);
            expect(utils.validator.isValidRequest({name: "name", url: "url"})).to.equal(false);
            expect(utils.validator.isValidRequest({})).to.equal(false);
            expect(utils.validator.isValidRequest()).to.equal(false);

        });

        it('cleanRequest method', function () {
            var validReq = utils.validator.cleanRequest({name: "name", url: "url", headers: {custom: "custom"}});
            var inValidReq = utils.validator.cleanRequest({name: "name", url: "url", headers: {host: "host"}});
            expect(validReq).to.have.ownProperty("headers");
            expect(inValidReq).to.have.not.ownProperty("headers.host");
        });

        it('isPersistentRequest method', function () {
            expect(utils.validator.isPersistentRequest({name: "name", isPersistentRequest: true})).to.be.a('boolean');
            expect(utils.validator.isPersistentRequest({name: "name", isPersistentRequest: true})).to.equal(true);
            expect(utils.validator.isPersistentRequest({name: "name", isPersistentRequest: false})).to.equal(false);
        });

        it('isValidURL method', function () {

            expect(utils.validator.isValidURL("https://www.valid.com")).to.be.a('boolean');
            expect(utils.validator.isValidURL("https://www.valid.com")).to.equal(true);

            cfg.whiteList = ["google.com", "github.com"];
            utils.validator.configure(cfg);

            expect(utils.validator.isValidURL("https://www.invalid.com")).to.be.a('boolean');
            expect(utils.validator.isValidURL("https://www.invalid.com")).to.equal(false);

            cfg.whiteList = ["valid.com", "valid.net"];
            utils.validator.configure(cfg);

            expect(utils.validator.isValidURL("https://www.valid.com")).to.be.a('boolean');
            expect(utils.validator.isValidURL("https://www.valid.net")).to.equal(true);

            expect(utils.validator.isValidURL({url: "url"})).to.be.a('boolean');
            expect(utils.validator.isValidURL({url: "url"})).to.equal(false);
        });

    });

    describe('jobHolder', function () {

        it('methods', function () {
            expect(utils.jobHolder.configure).to.be.a('function');
            expect(utils.jobHolder.addJob).to.be.a('function');
            expect(utils.jobHolder.getJob).to.be.a('function');
            expect(utils.jobHolder.clean).to.be.a('function');
            expect(utils.jobHolder.getActiveJobs).to.be.a('function');
        });

        it('addJob method', function () {
            var job = [{
                name: "single",
                url: "https://jsonresponser.herokuapp.com/api/json/users",
                method: "GET",
                encoding: "UTF8",
                retries: 3,
                headers: {},
                query: "/user1",
                mimeType: "application/json",
                data: "data",
                timeout: 10000
            }];

            var jobId = utils.jobHolder.addJob(job);
            expect(jobId).to.be.a('string');

        });

        it('addJob/getJob methods', function () {
            var job = [{
                name: "single",
                url: "https://jsonresponser.herokuapp.com/api/json/users",
                method: "GET",
                encoding: "UTF8",
                retries: 3,
                headers: {},
                query: "/user1",
                mimeType: "application/json",
                data: "data",
                timeout: 10000
            }];

            var jobId = utils.jobHolder.addJob(job);
            expect(jobId).to.be.a('string');

            var jobObj = utils.jobHolder.getJob(jobId);
            expect(jobObj).to.be.an('object');

            expect(utils.jobHolder.getAllJobs()).to.be.an('object');

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
                data: "data",
                timeout: 10000
            }];

            var jobId = utils.jobHolder.addJob(job);
            expect(jobId).to.be.a('string');

            var jobObj = utils.jobHolder.getJob(jobId);
            expect(jobObj).to.be.an('object');

            utils.jobHolder.clean(jobId);
            var jobObj = utils.jobHolder.getJob(jobId);
            expect(jobObj).to.be.a('null');

        });

        it('getActiveJobs method', function () {
            var activeJobs = utils.jobHolder.getActiveJobs();
            expect(activeJobs).to.have.ownProperty("activeJobs");
            expect(activeJobs).to.have.ownProperty("activeRequests");

            expect(activeJobs.activeJobs).to.be.a('number');
            expect(activeJobs.activeRequests).to.be.a('number');
        });
    });
});