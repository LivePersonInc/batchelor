if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['utils/builder.js'] === 'undefined'){_$jscoverage['utils/builder.js']=[];
_$jscoverage['utils/builder.js'].source=['/*jslint node: true */',
'\'use strict\';',
'var config',
'    , commons = require("./../commons");',
'',
'var RESPONSE_TYPE = {',
'    INVALID_TASK: {',
'        body: commons.CONST.BODY_RESPONSE.INVALID_TASK,',
'        statusCode: commons.CONST.HTTP_STATUS.BAD_REQUEST',
'    },',
'    ETIMEDOUT: {',
'        body: commons.CONST.BODY_RESPONSE.ETIMEDOUT,',
'        statusCode: commons.CONST.HTTP_STATUS.GATEWAY_TIMEOUT',
'    },',
'    ECONNREFUSED: {',
'        body: commons.CONST.BODY_RESPONSE.ECONNREFUSED,',
'        statusCode: commons.CONST.HTTP_STATUS.NOT_FOUND',
'    },',
'    ENOTFOUND: {',
'        body: commons.CONST.BODY_RESPONSE.ENOTFOUND,',
'        statusCode: commons.CONST.HTTP_STATUS.NOT_FOUND',
'    },',
'    ERROR_API_URL: {',
'        body: commons.CONST.BODY_RESPONSE.ERROR_API_URL,',
'        statusCode: commons.CONST.HTTP_STATUS.INTERNAL_SERVER_ERROR',
'    },',
'    NO_JSON_OBJECT: {',
'        body: commons.CONST.BODY_RESPONSE.NO_JSON_OBJECT,',
'        statusCode: commons.CONST.HTTP_STATUS.INTERNAL_SERVER_ERROR',
'    },',
'    NON_PERSISTENT_REQUEST: {',
'        body: commons.CONST.BODY_RESPONSE.NON_PERSISTENT_REQUEST,',
'        statusCode: commons.CONST.HTTP_STATUS.NOT_ACCEPTABLE',
'    },',
'    DEFAULT: {',
'        body: commons.CONST.BODY_RESPONSE.DEFAULT,',
'        statusCode: commons.CONST.HTTP_STATUS.NOT_FOUND',
'    }',
'',
'};',
'',
'/**',
' * configure the object',
' * @param cfg',
' * @returns {{}}',
' */',
'',
'exports.configure = function (cfg) {',
'    config = commons.helper.configure(cfg);',
'    return config;',
'};',
'',
'/**',
' * return the type of response of the given type',
' * @param type',
' * @returns {*}',
' */',
'exports.buildResponse = function (type) {',
'    type = type || "DEFAULT";',
'    return RESPONSE_TYPE[type];',
'};'];
_$jscoverage['utils/builder.js'][2]=0;
_$jscoverage['utils/builder.js'][3]=0;
_$jscoverage['utils/builder.js'][6]=0;
_$jscoverage['utils/builder.js'][48]=0;
_$jscoverage['utils/builder.js'][49]=0;
_$jscoverage['utils/builder.js'][50]=0;
_$jscoverage['utils/builder.js'][58]=0;
_$jscoverage['utils/builder.js'][59]=0;
_$jscoverage['utils/builder.js'][60]=0;
}/*jslint node: true */
_$jscoverage['utils/builder.js'][2]++;
'use strict';
_$jscoverage['utils/builder.js'][3]++;
var config
    , commons = require("./../commons");

_$jscoverage['utils/builder.js'][6]++;
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
    NON_PERSISTENT_REQUEST: {
        body: commons.CONST.BODY_RESPONSE.NON_PERSISTENT_REQUEST,
        statusCode: commons.CONST.HTTP_STATUS.NOT_ACCEPTABLE
    },
    DEFAULT: {
        body: commons.CONST.BODY_RESPONSE.DEFAULT,
        statusCode: commons.CONST.HTTP_STATUS.NOT_FOUND
    }

};

/**
 * configure the object
 * @param cfg
 * @returns {{}}
 */

_$jscoverage['utils/builder.js'][48]++;
exports.configure = function (cfg) {
    _$jscoverage['utils/builder.js'][49]++;
config = commons.helper.configure(cfg);
    _$jscoverage['utils/builder.js'][50]++;
return config;
};

/**
 * return the type of response of the given type
 * @param type
 * @returns {*}
 */
_$jscoverage['utils/builder.js'][58]++;
exports.buildResponse = function (type) {
    _$jscoverage['utils/builder.js'][59]++;
type = type || "DEFAULT";
    _$jscoverage['utils/builder.js'][60]++;
return RESPONSE_TYPE[type];
};