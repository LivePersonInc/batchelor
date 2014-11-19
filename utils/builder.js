var config;
var helper = require('./../lib/helper');
var CONST = require('./../lib/const');

var RESPONSE_TYPE = {
    INVALID_TASK: {
        body: CONST.BODY_RESPONSE.INVALID_TASK,
        statusCode: CONST.HTTP_STATUS.BAD_REQUEST
    },
    ETIMEDOUT: {
        body: CONST.BODY_RESPONSE.ETIMEDOUT,
        statusCode: CONST.HTTP_STATUS.GATEWAY_TIMEOUT
    },
    ECONNREFUSED: {
        body: CONST.BODY_RESPONSE.ECONNREFUSED,
        statusCode: CONST.HTTP_STATUS.NOT_FOUND
    },
    ENOTFOUND: {
        body: CONST.BODY_RESPONSE.ENOTFOUND,
        statusCode: CONST.HTTP_STATUS.NOT_FOUND
    },
    ERROR_API_URL: {
        body: CONST.BODY_RESPONSE.ERROR_API_URL,
        statusCode: CONST.HTTP_STATUS.INTERNAL_SERVER_ERROR
    },
    NO_JSON_OBJECT: {
        body: CONST.BODY_RESPONSE.NO_JSON_OBJECT,
        statusCode: CONST.HTTP_STATUS.INTERNAL_SERVER_ERROR
    },
    DEFAULT: {
        body: CONST.BODY_RESPONSE.DEFAULT,
        statusCode: CONST.HTTP_STATUS.NOT_FOUND
    }

};

exports.configure = function (cfg) {
    config = helper.configure(cfg);
};


exports.buildResponse = function (type) {
    return RESPONSE_TYPE[type];
};