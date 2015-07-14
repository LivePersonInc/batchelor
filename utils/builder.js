/*jslint node: true */
'use strict';
var config
    , commons = require("./../commons");

var RESPONSE_TYPE = {
    INVALID_TASK: {
        body: commons.CONST.BODY_RESPONSE.INVALID_TASK,
        HTTPStatus: commons.CONST.HTTP_STATUS.BAD_REQUEST,
        statusCode: commons.CONST.HTTP_STATUS.BAD_REQUEST
    },
    ETIMEDOUT: {
        body: commons.CONST.BODY_RESPONSE.ETIMEDOUT,
        HTTPStatus: commons.CONST.HTTP_STATUS.GATEWAY_TIMEOUT,
        statusCode: commons.CONST.HTTP_STATUS.GATEWAY_TIMEOUT
    },
    ECONNREFUSED: {
        body: commons.CONST.BODY_RESPONSE.ECONNREFUSED,
        HTTPStatus: commons.CONST.HTTP_STATUS.NOT_FOUND,
        statusCode: commons.CONST.HTTP_STATUS.NOT_FOUND
    },
    ENOTFOUND: {
        body: commons.CONST.BODY_RESPONSE.ENOTFOUND,
        HTTPStatus: commons.CONST.HTTP_STATUS.NOT_FOUND,
        statusCode: commons.CONST.HTTP_STATUS.NOT_FOUND
    },
    ERROR_API_URL: {
        body: commons.CONST.BODY_RESPONSE.ERROR_API_URL,
        HTTPStatus: commons.CONST.HTTP_STATUS.INTERNAL_SERVER_ERROR,
        statusCode: commons.CONST.HTTP_STATUS.INTERNAL_SERVER_ERROR
    },
    NO_JSON_OBJECT: {
        body: commons.CONST.BODY_RESPONSE.NO_JSON_OBJECT,
        HTTPStatus: commons.CONST.HTTP_STATUS.BAD_REQUEST,
        statusCode: commons.CONST.HTTP_STATUS.BAD_REQUEST
    },
    NON_PERSISTENT_REQUEST: {
        body: commons.CONST.BODY_RESPONSE.NON_PERSISTENT_REQUEST,
        HTTPStatus: commons.CONST.HTTP_STATUS.NOT_ACCEPTABLE,
        statusCode: commons.CONST.HTTP_STATUS.NOT_ACCEPTABLE
    },
    DEFAULT: {
        body: commons.CONST.BODY_RESPONSE.DEFAULT, 
        HTTPStatus: commons.CONST.HTTP_STATUS.NOT_FOUND,
        statusCode: commons.CONST.HTTP_STATUS.NOT_FOUND
    }

};

/**
 * configure the object
 * @param cfg
 * @returns {{}}
 */

exports.configure = function (cfg) {
    config = commons.helper.configure(cfg);
    return config;
};

/**
 * return the type of response of the given type
 * @param type
 * @returns {*}
 */
exports.buildResponse = function (type) {
    type = type || "DEFAULT";
    return RESPONSE_TYPE[type];
};