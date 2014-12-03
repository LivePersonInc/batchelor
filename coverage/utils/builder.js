if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['utils/builder.js'] === 'undefined'){_$jscoverage['utils/builder.js']=[];
_$jscoverage['utils/builder.js'].source=['var config;',
'var commons = require(\'./../commons/commons\');',
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
'    DEFAULT: {',
'        body: commons.CONST.BODY_RESPONSE.DEFAULT,',
'        statusCode: commons.CONST.HTTP_STATUS.NOT_FOUND',
'    }',
'',
'};',
'',
'exports.configure = function (cfg) {',
'    config = commons.helper.configure(cfg);',
'    return config;',
'};',
'',
'',
'exports.buildResponse = function (type) {',
'    type = type || "DEFAULT"',
'    return RESPONSE_TYPE[type];',
'};'];
_$jscoverage['utils/builder.js'][1]=0;
_$jscoverage['utils/builder.js'][2]=0;
_$jscoverage['utils/builder.js'][4]=0;
_$jscoverage['utils/builder.js'][36]=0;
_$jscoverage['utils/builder.js'][37]=0;
_$jscoverage['utils/builder.js'][38]=0;
_$jscoverage['utils/builder.js'][42]=0;
_$jscoverage['utils/builder.js'][43]=0;
_$jscoverage['utils/builder.js'][44]=0;
}_$jscoverage['utils/builder.js'][1]++;
var config;
_$jscoverage['utils/builder.js'][2]++;
var commons = require('./../commons/commons');

_$jscoverage['utils/builder.js'][4]++;
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

_$jscoverage['utils/builder.js'][36]++;
exports.configure = function (cfg) {
    _$jscoverage['utils/builder.js'][37]++;
config = commons.helper.configure(cfg);
    _$jscoverage['utils/builder.js'][38]++;
return config;
};


_$jscoverage['utils/builder.js'][42]++;
exports.buildResponse = function (type) {
    _$jscoverage['utils/builder.js'][43]++;
type = type || "DEFAULT"
    _$jscoverage['utils/builder.js'][44]++;
return RESPONSE_TYPE[type];
};