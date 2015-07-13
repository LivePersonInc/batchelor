/*jslint node: true */
'use strict';
var config
    , commons = require("./../commons");

var RESPONSE_TYPE = {
    INVALID_TASK: {
        data: commons.CONST.BODY_RESPONSE.INVALID_TASK,
        statusCode: commons.CONST.HTTP_STATUS.BAD_REQUEST
    },
    ETIMEDOUT: {
        data: commons.CONST.BODY_RESPONSE.ETIMEDOUT,
        statusCode: commons.CONST.HTTP_STATUS.GATEWAY_TIMEOUT
    },
    ECONNREFUSED: {
        data: commons.CONST.BODY_RESPONSE.ECONNREFUSED,
        statusCode: commons.CONST.HTTP_STATUS.NOT_FOUND
    },
    ENOTFOUND: {
        data: commons.CONST.BODY_RESPONSE.ENOTFOUND,
        statusCode: commons.CONST.HTTP_STATUS.NOT_FOUND
    },
    ERROR_API_URL: {
        data: commons.CONST.BODY_RESPONSE.ERROR_API_URL,
        statusCode: commons.CONST.HTTP_STATUS.INTERNAL_SERVER_ERROR
    },
    NO_JSON_OBJECT: {
        data: commons.CONST.BODY_RESPONSE.NO_JSON_OBJECT,
        statusCode: commons.CONST.HTTP_STATUS.BAD_REQUEST
    },
    NON_PERSISTENT_REQUEST: {
        data: commons.CONST.BODY_RESPONSE.NON_PERSISTENT_REQUEST,
        statusCode: commons.CONST.HTTP_STATUS.NOT_ACCEPTABLE
    },
    DEFAULT: {
        data: commons.CONST.BODY_RESPONSE.DEFAULT,
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
