'use strict';
var BODY_RESPONSE = {
        INVALID_TASK: "Request URL is not valid (doesn't exist in the whitelist) or one of the following parameters is/are missing/s or invalid/s: name/method/url",
        ETIMEDOUT: "Api host didn't return a response in the time that was expected",
        ECONNREFUSED: "Api host didn't respond",
        ENOTFOUND: "Api host didn't respond (not exist)",
        URL_NOT_VALID: "Request URL is not valid, doesn't exist in the whitelist",
        NO_JSON_OBJECT: "Response was not a JSON object",
        ERROR_API_URL: "An error occurred in the API request URL",
        NON_PERSISTENT_REQUEST: "Trying to run non persistent (lazy) request with wrong persistent adaptor",
        DEFAULT: "Api host didn't respond (does not exist)"
    },
    RESPONSE_ERROR_CODE = {
        ETIMEDOUT: "ETIMEDOUT",
        ECONNREFUSED: "ECONNREFUSED",
        ENOTFOUND: "ENOTFOUND"
    },
    HTTP_STATUS = {
        100: "Continue",
        101: "Switching Protocols",
        200: "OK",
        201: "Created",
        202: "Accepted",
        203: "Non-Authoritative Information",
        204: "No Content",
        205: "Reset Content",
        206: "Partial Content",
        300: "Multiple Choices",
        301: "Moved Permanently",
        302: "Found",
        303: "See Other",
        304: "Not Modified",
        305: "Use Proxy",
        307: "Temporary Redirect",
        400: "Bad Request",
        401: "Unauthorized",
        402: "Payment Required",
        403: "Forbidden",
        404: "Not Found",
        405: "Method Not Allowed",
        406: "Not Acceptable",
        407: "Proxy Authentication Required",
        408: "Request Time-out",
        409: "Conflict",
        410: "Gone",
        411: "Length Required",
        412: "Precondition Failed",
        413: "Request Entity Too Large",
        414: "Request-URI Too Large",
        415: "Unsupported Media Type",
        416: "Requested range not satisfiable",
        417: "Expectation Failed",
        500: "Internal Server Error",
        501: "Not Implemented",
        502: "Bad Gateway",
        503: "Service Unavailable",
        504: "Gateway Time-out",
        505: "HTTP Version not supported",
        CONTINUE: 100,
        SWITCHING_PROTOCOLS: 101,
        OK: 200,
        CREATED: 201,
        ACCEPTED: 202,
        NON_AUTHORITATIVE_INFORMATION: 203,
        NO_CONTENT: 204,
        RESET_CONTENT: 205,
        PARTIAL_CONTENT: 206,
        MULTIPLE_CHOICES: 300,
        MOVED_PERMANENTLY: 301,
        FOUND: 302,
        SEE_OTHER: 303,
        NOT_MODIFIED: 304,
        USE_PROXY: 305,
        TEMPORARY_REDIRECT: 307,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        PAYMENT_REQUIRED: 402,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        METHOD_NOT_ALLOWED: 405,
        NOT_ACCEPTABLE: 406,
        PROXY_AUTHENTICATION_REQUIRED: 407,
        REQUEST_TIMEOUT: 408,
        CONFLICT: 409,
        GONE: 410,
        LENGTH_REQUIRED: 411,
        PRECONDITION_FAILED: 412,
        REQUEST_ENTITY_TOO_LARGE: 413,
        REQUEST_URI_TOO_LONG: 414,
        UNSUPPORTED_MEDIA_TYPE: 415,
        REQUESTED_RANGE_NOT_SATISFIABLE: 416,
        EXPECTATION_FAILED: 417,
        INTERNAL_SERVER_ERROR: 500,
        NOT_IMPLEMENTED: 501,
        BAD_GATEWAY: 502,
        SERVICE_UNAVAILABLE: 503,
        GATEWAY_TIMEOUT: 504,
        HTTP_VERSION_NOTSUPPORTED: 505
    },
    INVALID_HEADERS = [
        "content-length",
        "accept-encoding",
        "connection",
        "host"
    ],
    RESPONSE_TYPE = {
        INVALID_TASK: {
            body: BODY_RESPONSE.INVALID_TASK,
            HTTPStatus: HTTP_STATUS.BAD_REQUEST,
            statusCode: HTTP_STATUS.BAD_REQUEST
        },
        ETIMEDOUT: {
            body: BODY_RESPONSE.ETIMEDOUT,
            HTTPStatus: HTTP_STATUS.GATEWAY_TIMEOUT,
            statusCode: HTTP_STATUS.GATEWAY_TIMEOUT
        },
        ECONNREFUSED: {
            body: BODY_RESPONSE.ECONNREFUSED,
            HTTPStatus: HTTP_STATUS.NOT_FOUND,
            statusCode: HTTP_STATUS.NOT_FOUND
        },
        ENOTFOUND: {
            body: BODY_RESPONSE.ENOTFOUND,
            HTTPStatus: HTTP_STATUS.NOT_FOUND,
            statusCode: HTTP_STATUS.NOT_FOUND
        },
        ERROR_API_URL: {
            body: BODY_RESPONSE.ERROR_API_URL,
            HTTPStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR
        },
        NO_JSON_OBJECT: {
            body: BODY_RESPONSE.NO_JSON_OBJECT,
            HTTPStatus: HTTP_STATUS.BAD_REQUEST,
            statusCode: HTTP_STATUS.BAD_REQUEST
        },
        NON_PERSISTENT_REQUEST: {
            body: BODY_RESPONSE.NON_PERSISTENT_REQUEST,
            HTTPStatus: HTTP_STATUS.NOT_ACCEPTABLE,
            statusCode: HTTP_STATUS.NOT_ACCEPTABLE
        },
        DEFAULT: {
            body: BODY_RESPONSE.DEFAULT,
            HTTPStatus: HTTP_STATUS.NOT_FOUND,
            statusCode: HTTP_STATUS.NOT_FOUND
        }
    };

module.exports = {
    BODY_RESPONSE: BODY_RESPONSE,
    RESPONSE_ERROR_CODE: RESPONSE_ERROR_CODE,
    HTTP_STATUS: HTTP_STATUS,
    INVALID_HEADERS: INVALID_HEADERS,
    RESPONSE_TYPE: RESPONSE_TYPE
};
