if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['utils/validator.js'] === 'undefined'){_$jscoverage['utils/validator.js']=[];
_$jscoverage['utils/validator.js'].source=['/*jslint node: true */',
'\'use strict\';',
'var commons = require("./../commons")',
'    , url   = require("url")',
'    , config',
'    , log;',
'',
'',
'function _getHost (url) {',
'    var arr = url.split(".")',
'        , host;',
'',
'    if (arr.length >= 2) {',
'        host = arr[arr.length - 2] + "." + arr[arr.length - 1];',
'    }',
'',
'    return host;',
'}',
'exports.configure = function (cfg) {',
'    config = commons.helper.configure(cfg);',
'    log = config.logger || console;',
'    // if there is no "whiteList" in the config, we don\'t',
'    config.whiteList = config.whiteList || "*";',
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
'    log.info("[validator] isValidReq: " + validReq);',
'    return validReq;',
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
'};',
'',
'exports.isValidURL = function (_url) {',
'    var valid',
'        , urlObj',
'        , host;',
'',
'    // if in the whiteList exist "*" all domains allow',
'    if (config.whiteList.indexOf("*") > -1) {',
'        log.debug("[validator] Allow all URLS");',
'        valid = true;',
'    }',
'    else {',
'        try {',
'            urlObj = url.parse(_url, true);',
'            host = _getHost(urlObj.host);',
'            if (config.whiteList.indexOf(host) > -1) {',
'                valid = true;',
'                log.info(\'[validator] URL: \' + host + \' URL is valid -  !!!\');',
'            }',
'            else {',
'                valid = false;',
'                log.info("[validator] URL is not valid, host: " + host);',
'            }',
'        }',
'        catch (e) {',
'            valid = false;',
'            log.error("[validator] validateURL, exception e: " + e);',
'        }',
'    }',
'',
'    return valid;',
'};'];
_$jscoverage['utils/validator.js'][47]=0;
_$jscoverage['utils/validator.js'][2]=0;
_$jscoverage['utils/validator.js'][54]=0;
_$jscoverage['utils/validator.js'][10]=0;
_$jscoverage['utils/validator.js'][3]=0;
_$jscoverage['utils/validator.js'][9]=0;
_$jscoverage['utils/validator.js'][59]=0;
_$jscoverage['utils/validator.js'][17]=0;
_$jscoverage['utils/validator.js'][14]=0;
_$jscoverage['utils/validator.js'][13]=0;
_$jscoverage['utils/validator.js'][61]=0;
_$jscoverage['utils/validator.js'][24]=0;
_$jscoverage['utils/validator.js'][19]=0;
_$jscoverage['utils/validator.js'][20]=0;
_$jscoverage['utils/validator.js'][21]=0;
_$jscoverage['utils/validator.js'][23]=0;
_$jscoverage['utils/validator.js'][71]=0;
_$jscoverage['utils/validator.js'][35]=0;
_$jscoverage['utils/validator.js'][27]=0;
_$jscoverage['utils/validator.js'][28]=0;
_$jscoverage['utils/validator.js'][29]=0;
_$jscoverage['utils/validator.js'][33]=0;
_$jscoverage['utils/validator.js'][30]=0;
_$jscoverage['utils/validator.js'][77]=0;
_$jscoverage['utils/validator.js'][50]=0;
_$jscoverage['utils/validator.js'][38]=0;
_$jscoverage['utils/validator.js'][48]=0;
_$jscoverage['utils/validator.js'][36]=0;
_$jscoverage['utils/validator.js'][39]=0;
_$jscoverage['utils/validator.js'][83]=0;
_$jscoverage['utils/validator.js'][58]=0;
_$jscoverage['utils/validator.js'][51]=0;
_$jscoverage['utils/validator.js'][78]=0;
_$jscoverage['utils/validator.js'][64]=0;
_$jscoverage['utils/validator.js'][60]=0;
_$jscoverage['utils/validator.js'][88]=0;
_$jscoverage['utils/validator.js'][72]=0;
_$jscoverage['utils/validator.js'][65]=0;
_$jscoverage['utils/validator.js'][70]=0;
_$jscoverage['utils/validator.js'][75]=0;
_$jscoverage['utils/validator.js'][76]=0;
_$jscoverage['utils/validator.js'][79]=0;
_$jscoverage['utils/validator.js'][80]=0;
_$jscoverage['utils/validator.js'][84]=0;
_$jscoverage['utils/validator.js'][89]=0;
_$jscoverage['utils/validator.js'][93]=0;
}/*jslint node: true */
_$jscoverage['utils/validator.js'][2]++;
'use strict';
_$jscoverage['utils/validator.js'][3]++;
var commons = require("./../commons")
    , url   = require("url")
    , config
    , log;


_$jscoverage['utils/validator.js'][9]++;
function _getHost (url) {
    _$jscoverage['utils/validator.js'][10]++;
var arr = url.split(".")
        , host;

    _$jscoverage['utils/validator.js'][13]++;
if (arr.length >= 2) {
        _$jscoverage['utils/validator.js'][14]++;
host = arr[arr.length - 2] + "." + arr[arr.length - 1];
    }

    _$jscoverage['utils/validator.js'][17]++;
return host;
}
_$jscoverage['utils/validator.js'][19]++;
exports.configure = function (cfg) {
    _$jscoverage['utils/validator.js'][20]++;
config = commons.helper.configure(cfg);
    _$jscoverage['utils/validator.js'][21]++;
log = config.logger || console;
    // if there is no "whiteList" in the config, we don't
    _$jscoverage['utils/validator.js'][23]++;
config.whiteList = config.whiteList || "*";
    _$jscoverage['utils/validator.js'][24]++;
return config;
};

_$jscoverage['utils/validator.js'][27]++;
exports.isValidRequest = function (req) {
    _$jscoverage['utils/validator.js'][28]++;
req = req || {};
    _$jscoverage['utils/validator.js'][29]++;
var validReq = false;
    _$jscoverage['utils/validator.js'][30]++;
if ((req.name && typeof req.name === "string") &&
        (req.url && typeof req.url === "string") &&
        (req.method && typeof req.method === "string")) {
        _$jscoverage['utils/validator.js'][33]++;
validReq = true;
    }
    _$jscoverage['utils/validator.js'][35]++;
log.info("[validator] isValidReq: " + validReq);
    _$jscoverage['utils/validator.js'][36]++;
return validReq;
};
_$jscoverage['utils/validator.js'][38]++;
exports.cleanRequest = function (req) {
    _$jscoverage['utils/validator.js'][39]++;
req = req || {};
    /**
     * we are deleting the headers:
     * 1. content-length - don't limit the size of the content
     * 2. accept-encoding - currently we don't accept encoding gzip
     * 3. connection - deleted when requesting https
     * 4. host - deleted when requesting https
     */
    _$jscoverage['utils/validator.js'][47]++;
for (var header in commons.CONST.INVALID_HEADERS) {
        _$jscoverage['utils/validator.js'][48]++;
var currentHeader = commons.CONST.INVALID_HEADERS[header];
        // try to delete it only if were passed
        _$jscoverage['utils/validator.js'][50]++;
if (req.headers && req.headers[currentHeader]) {
            _$jscoverage['utils/validator.js'][51]++;
delete req.headers[currentHeader];
        }
    }
    _$jscoverage['utils/validator.js'][54]++;
return req;
};


_$jscoverage['utils/validator.js'][58]++;
exports.isPersistentRequest = function (req) {
    _$jscoverage['utils/validator.js'][59]++;
var persistentReq = req && req.persistent && req.persistent === true || false;
    _$jscoverage['utils/validator.js'][60]++;
config.logger.info("[validator] isPersistentReq: " + persistentReq);
    _$jscoverage['utils/validator.js'][61]++;
return persistentReq;
};

_$jscoverage['utils/validator.js'][64]++;
exports.isValidURL = function (_url) {
    _$jscoverage['utils/validator.js'][65]++;
var valid
        , urlObj
        , host;

    // if in the whiteList exist "*" all domains allow
    _$jscoverage['utils/validator.js'][70]++;
if (config.whiteList.indexOf("*") > -1) {
        _$jscoverage['utils/validator.js'][71]++;
log.debug("[validator] Allow all URLS");
        _$jscoverage['utils/validator.js'][72]++;
valid = true;
    }
    else {
        _$jscoverage['utils/validator.js'][75]++;
try {
            _$jscoverage['utils/validator.js'][76]++;
urlObj = url.parse(_url, true);
            _$jscoverage['utils/validator.js'][77]++;
host = _getHost(urlObj.host);
            _$jscoverage['utils/validator.js'][78]++;
if (config.whiteList.indexOf(host) > -1) {
                _$jscoverage['utils/validator.js'][79]++;
valid = true;
                _$jscoverage['utils/validator.js'][80]++;
log.info('[validator] URL: ' + host + ' URL is valid -  !!!');
            }
            else {
                _$jscoverage['utils/validator.js'][83]++;
valid = false;
                _$jscoverage['utils/validator.js'][84]++;
log.info("[validator] URL is not valid, host: " + host);
            }
        }
        catch (e) {
            _$jscoverage['utils/validator.js'][88]++;
valid = false;
            _$jscoverage['utils/validator.js'][89]++;
log.error("[validator] validateURL, exception e: " + e);
        }
    }

    _$jscoverage['utils/validator.js'][93]++;
return valid;
};