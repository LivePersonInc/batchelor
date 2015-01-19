var should  = require('chai').should()
    , expect  = require('chai').expect
    , assert  = require('chai').assert
    , utils   = require('./../utils')
    , commons = require('./../commons')
    , cfg = {
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
            "body": ""
        },
        "whiteList": ["*"]
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
            var cfg = {
                num: 8080,
                str: "str",
                obj: {
                    num: 8080,
                    str: "str"
                }
            };

            var result = utils.builder.configure(cfg);
            result.should.have.ownProperty("num");
            result.should.have.ownProperty("str");
            result.should.have.ownProperty("obj");

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

            utils.builder.buildResponse().body.should.equal(commons.CONST.BODY_RESPONSE.DEFAULT);
            utils.builder.buildResponse().statusCode.should.equal(commons.CONST.HTTP_STATUS.NOT_FOUND);
        });
    });

    describe('validator', function () {

        it('test methods', function () {
            utils.validator.configure.should.be.a('function');
            utils.validator.isValidRequest.should.be.a('function');
            utils.validator.cleanRequest.should.be.a('function');
            utils.validator.isPersistentRequest.should.be.a('function');
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

        it('isPersistentRequest method', function () {
            utils.validator.isPersistentRequest({name: "name", isPersistentRequest: true}).should.be.a('boolean');
            utils.validator.isPersistentRequest({name: "name", isPersistentRequest: true}).should.equal(true);
            utils.validator.isPersistentRequest({name: "name", isPersistentRequest: false}).should.equal(false);
        });

        it('isValidURL method', function () {

            utils.validator.isValidURL("https://www.valid.com").should.be.a('boolean');
            utils.validator.isValidURL("https://www.valid.com").should.equal(true);

            cfg.whiteList = ["google.com", "github.com"];
            utils.validator.configure(cfg);

            utils.validator.isValidURL("https://www.invalid.com").should.be.a('boolean');
            utils.validator.isValidURL("https://www.invalid.com").should.equal(false);

            cfg.whiteList = ["valid.com", "valid.net"];
            utils.validator.configure(cfg);

            utils.validator.isValidURL("https://www.valid.com").should.be.a('boolean');
            utils.validator.isValidURL("https://www.valid.net").should.equal(true);

            utils.validator.isValidURL({url: "url"}).should.be.a('boolean');
            utils.validator.isValidURL({url: "url"}).should.equal(false);
        });

    });

    describe('jobHolder', function () {

        it('methods', function () {
            utils.jobHolder.configure.should.be.a('function');
            utils.jobHolder.addJob.should.be.a('function');
            utils.jobHolder.getJob.should.be.a('function');
            utils.jobHolder.clean.should.be.a('function');
            utils.jobHolder.getActiveJobs.should.be.a('function');
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
                body: "body",
                timeout: 10000
            }];

            var jobId = utils.jobHolder.addJob(job);
            jobId.should.be.a('string');

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
                body: "body",
                timeout: 10000
            }];

            var jobId = utils.jobHolder.addJob(job);
            jobId.should.be.a('string');

            var jobObj = utils.jobHolder.getJob(jobId);
            jobObj.should.be.an('object');

            utils.jobHolder.getAllJobs().should.be.an('object');

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

        it('getActiveJobs method', function () {
            var activeJobs = utils.jobHolder.getActiveJobs();
            activeJobs.should.have.ownProperty("activeJobs");
            activeJobs.should.have.ownProperty("activeRequests");

            activeJobs.activeJobs.should.be.a('number');
            activeJobs.activeRequests.should.be.a('number');
        });
    });
});