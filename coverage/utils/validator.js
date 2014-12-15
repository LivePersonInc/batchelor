if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['utils/validator.js'] === 'undefined'){_$jscoverage['utils/validator.js']=[];
_$jscoverage['utils/validator.js'].source=['/*jslint node: true */',
'\'use strict\';',
'var commons = require("./../commons");',
'var config;',
'',
'exports.configure = function (cfg) {',
'    config = commons.helper.configure(cfg);',
'    return config;',
'};',
'',
'exports.isValidRequest = function (req) {',
'    req = req || {};',
'    var validReq = false;',
'    if ((req.name && typeof req.name === "string") &&',
'        (req.url && typeof req.url === "string") &&',
'        (req.method && typeof req.method === "string")) {',
'        validReq = true;',
'    }',
'    config.logger.info("[validator] isValidReq: " + validReq)',
'    return validReq',
'};',
'exports.cleanRequest = function (req) {',
'    req = req || {};',
'    /**',
'     * we are deleting the headers:',
'     * 1. content-length - don\'t limit the size of the content',
'     * 2. accept-encoding - currently we don\'t accept encoding gzip',
'     * 3. connection - deleted when requesting https',
'     * 4. host - deleted when requesting https',
'     */',
'    for (var header in commons.CONST.INVALID_HEADERS) {',
'        var currentHeader = commons.CONST.INVALID_HEADERS[header];',
'        // try to delete it only if were passed',
'        if (req.headers && req.headers[currentHeader]) {',
'            delete req.headers[currentHeader];',
'        }',
'    }',
'    return req;',
'};',
'',
'',
'exports.isPersistentRequest = function (req) {',
'    var persistentReq = req && req.persistent && req.persistent === true || false;',
'    config.logger.info("[validator] isPersistentReq: " + persistentReq);',
'    return persistentReq;',
'};'];
_$jscoverage['utils/validator.js'][11]=0;
_$jscoverage['utils/validator.js'][2]=0;
_$jscoverage['utils/validator.js'][23]=0;
_$jscoverage['utils/validator.js'][4]=0;
_$jscoverage['utils/validator.js'][3]=0;
_$jscoverage['utils/validator.js'][32]=0;
_$jscoverage['utils/validator.js'][6]=0;
_$jscoverage['utils/validator.js'][35]=0;
_$jscoverage['utils/validator.js'][13]=0;
_$jscoverage['utils/validator.js'][12]=0;
_$jscoverage['utils/validator.js'][7]=0;
_$jscoverage['utils/validator.js'][8]=0;
_$jscoverage['utils/validator.js'][38]=0;
_$jscoverage['utils/validator.js'][20]=0;
_$jscoverage['utils/validator.js'][14]=0;
_$jscoverage['utils/validator.js'][17]=0;
_$jscoverage['utils/validator.js'][19]=0;
_$jscoverage['utils/validator.js'][22]=0;
_$jscoverage['utils/validator.js'][31]=0;
_$jscoverage['utils/validator.js'][34]=0;
_$jscoverage['utils/validator.js'][42]=0;
_$jscoverage['utils/validator.js'][43]=0;
_$jscoverage['utils/validator.js'][44]=0;
_$jscoverage['utils/validator.js'][45]=0;
}/*jslint node: true */
_$jscoverage['utils/validator.js'][2]++;
'use strict';
_$jscoverage['utils/validator.js'][3]++;
var commons = require("./../commons");
_$jscoverage['utils/validator.js'][4]++;
var config;

_$jscoverage['utils/validator.js'][6]++;
exports.configure = function (cfg) {
    _$jscoverage['utils/validator.js'][7]++;
config = commons.helper.configure(cfg);
    _$jscoverage['utils/validator.js'][8]++;
return config;
};

_$jscoverage['utils/validator.js'][11]++;
exports.isValidRequest = function (req) {
    _$jscoverage['utils/validator.js'][12]++;
req = req || {};
    _$jscoverage['utils/validator.js'][13]++;
var validReq = false;
    _$jscoverage['utils/validator.js'][14]++;
if ((req.name && typeof req.name === "string") &&
        (req.url && typeof req.url === "string") &&
        (req.method && typeof req.method === "string")) {
        _$jscoverage['utils/validator.js'][17]++;
validReq = true;
    }
    _$jscoverage['utils/validator.js'][19]++;
config.logger.info("[validator] isValidReq: " + validReq)
    _$jscoverage['utils/validator.js'][20]++;
return validReq
};
_$jscoverage['utils/validator.js'][22]++;
exports.cleanRequest = function (req) {
    _$jscoverage['utils/validator.js'][23]++;
req = req || {};
    /**
     * we are deleting the headers:
     * 1. content-length - don't limit the size of the content
     * 2. accept-encoding - currently we don't accept encoding gzip
     * 3. connection - deleted when requesting https
     * 4. host - deleted when requesting https
     */
    _$jscoverage['utils/validator.js'][31]++;
for (var header in commons.CONST.INVALID_HEADERS) {
        _$jscoverage['utils/validator.js'][32]++;
var currentHeader = commons.CONST.INVALID_HEADERS[header];
        // try to delete it only if were passed
        _$jscoverage['utils/validator.js'][34]++;
if (req.headers && req.headers[currentHeader]) {
            _$jscoverage['utils/validator.js'][35]++;
delete req.headers[currentHeader];
        }
    }
    _$jscoverage['utils/validator.js'][38]++;
return req;
};


_$jscoverage['utils/validator.js'][42]++;
exports.isPersistentRequest = function (req) {
    _$jscoverage['utils/validator.js'][43]++;
var persistentReq = req && req.persistent && req.persistent === true || false;
    _$jscoverage['utils/validator.js'][44]++;
config.logger.info("[validator] isPersistentReq: " + persistentReq);
    _$jscoverage['utils/validator.js'][45]++;
return persistentReq;
};