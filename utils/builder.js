'use strict';
var config;
var commons = require("./../commons/commons");

var RESPONSE_TYPE = {
    INVALID_TASK: {
        body: commons.CONST.BODY_RESPONSE.INVALID_TASK,
        statusCode: commons.CONST.HTTP_STATUS.BAD_REQUEST
    },
    ETIMEDOUT: {
        body: commons.CONST.BODY_RESPONSE.ETIMEDOUT,
        statusCode: commons.CONST.HTTP_STATUS.GATEWAY_TIMEOUT
    },
    ECONNREFUSED: {
        body: commons.CONST.BODY_RESPONSE.ECONNREFUSED,
        statusCode: commons.CONST.HTTP_STATUS.NOT_FOUND
    },
    ENOTFOUND: {
        body: commons.CONST.BODY_RESPONSE.ENOTFOUND,
        statusCode: commons.CONST.HTTP_STATUS.NOT_FOUND
    },
    ERROR_API_URL: {
        body: commons.CONST.BODY_RESPONSE.ERROR_API_URL,
        statusCode: commons.CONST.HTTP_STATUS.INTERNAL_SERVER_ERROR
    },
    NO_JSON_OBJECT: {
        body: commons.CONST.BODY_RESPONSE.NO_JSON_OBJECT,
        statusCode: commons.CONST.HTTP_STATUS.INTERNAL_SERVER_ERROR
    },
    DEFAULT: {
        body: commons.CONST.BODY_RESPONSE.DEFAULT,
        statusCode: commons.CONST.HTTP_STATUS.NOT_FOUND
    }

};

exports.configure = function (cfg) {
    config = commons.helper.configure(cfg);
    return config;
};


exports.buildResponse = function (type) {
    type = type || "DEFAULT"
    return RESPONSE_TYPE[type];
};