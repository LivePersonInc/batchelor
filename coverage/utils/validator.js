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
'',
'/**',
' * configure the object',
' * @param cfg',
' * @returns {{}}',
' */',
'exports.configure = function (cfg) {',
'    config = commons.helper.configure(cfg);',
'    log = config.logger || console;',
'    // if there is no "whiteList" in the config, we don\'t',
'    config.whiteList = config.whiteList || "*";',
'    return config;',
'};',
'',
'/**',
' * validate the given request',
' * request to be valid must have: name, url, method',
' * @param req',
' * @returns {boolean}',
' */',
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
'',
'/**',
' * clean the given',
' * @param req',
' * @returns {*}',
' */',
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
'/**',
' * check if the request if persistent',
' * @param req',
' * @returns {*|Function|Function|boolean|boolean}',
' */',
'exports.isPersistentRequest = function (req) {',
'    var persistentReq = req && req.isPersistentRequest && req.isPersistentRequest === true || false;',
'    config.logger.info("[validator] isPersistentRequest: " + persistentReq);',
'    return persistentReq;',
'};',
'',
'/**',
' * validate URL against the configuration',
' * @param _url',
' * @returns {*}',
' */',
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
_$jscoverage['utils/validator.js'][65]=0;
_$jscoverage['utils/validator.js'][2]=0;
_$jscoverage['utils/validator.js'][72]=0;
_$jscoverage['utils/validator.js'][10]=0;
_$jscoverage['utils/validator.js'][3]=0;
_$jscoverage['utils/validator.js'][9]=0;
_$jscoverage['utils/validator.js'][82]=0;
_$jscoverage['utils/validator.js'][17]=0;
_$jscoverage['utils/validator.js'][14]=0;
_$jscoverage['utils/validator.js'][13]=0;
_$jscoverage['utils/validator.js'][84]=0;
_$jscoverage['utils/validator.js'][30]=0;
_$jscoverage['utils/validator.js'][25]=0;
_$jscoverage['utils/validator.js'][26]=0;
_$jscoverage['utils/validator.js'][27]=0;
_$jscoverage['utils/validator.js'][29]=0;
_$jscoverage['utils/validator.js'][99]=0;
_$jscoverage['utils/validator.js'][47]=0;
_$jscoverage['utils/validator.js'][39]=0;
_$jscoverage['utils/validator.js'][40]=0;
_$jscoverage['utils/validator.js'][41]=0;
_$jscoverage['utils/validator.js'][45]=0;
_$jscoverage['utils/validator.js'][42]=0;
_$jscoverage['utils/validator.js'][105]=0;
_$jscoverage['utils/validator.js'][68]=0;
_$jscoverage['utils/validator.js'][56]=0;
_$jscoverage['utils/validator.js'][66]=0;
_$jscoverage['utils/validator.js'][48]=0;
_$jscoverage['utils/validator.js'][57]=0;
_$jscoverage['utils/validator.js'][111]=0;
_$jscoverage['utils/validator.js'][81]=0;
_$jscoverage['utils/validator.js'][69]=0;
_$jscoverage['utils/validator.js'][106]=0;
_$jscoverage['utils/validator.js'][92]=0;
_$jscoverage['utils/validator.js'][83]=0;
_$jscoverage['utils/validator.js'][116]=0;
_$jscoverage['utils/validator.js'][100]=0;
_$jscoverage['utils/validator.js'][93]=0;
_$jscoverage['utils/validator.js'][98]=0;
_$jscoverage['utils/validator.js'][103]=0;
_$jscoverage['utils/validator.js'][104]=0;
_$jscoverage['utils/validator.js'][107]=0;
_$jscoverage['utils/validator.js'][108]=0;
_$jscoverage['utils/validator.js'][112]=0;
_$jscoverage['utils/validator.js'][117]=0;
_$jscoverage['utils/validator.js'][121]=0;
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

/**
 * configure the object
 * @param cfg
 * @returns {{}}
 */
_$jscoverage['utils/validator.js'][25]++;
exports.configure = function (cfg) {
    _$jscoverage['utils/validator.js'][26]++;
config = commons.helper.configure(cfg);
    _$jscoverage['utils/validator.js'][27]++;
log = config.logger || console;
    // if there is no "whiteList" in the config, we don't
    _$jscoverage['utils/validator.js'][29]++;
config.whiteList = config.whiteList || "*";
    _$jscoverage['utils/validator.js'][30]++;
return config;
};

/**
 * validate the given request
 * request to be valid must have: name, url, method
 * @param req
 * @returns {boolean}
 */
_$jscoverage['utils/validator.js'][39]++;
exports.isValidRequest = function (req) {
    _$jscoverage['utils/validator.js'][40]++;
req = req || {};
    _$jscoverage['utils/validator.js'][41]++;
var validReq = false;
    _$jscoverage['utils/validator.js'][42]++;
if ((req.name && typeof req.name === "string") &&
        (req.url && typeof req.url === "string") &&
        (req.method && typeof req.method === "string")) {
        _$jscoverage['utils/validator.js'][45]++;
validReq = true;
    }
    _$jscoverage['utils/validator.js'][47]++;
log.info("[validator] isValidReq: " + validReq);
    _$jscoverage['utils/validator.js'][48]++;
return validReq;
};

/**
 * clean the given
 * @param req
 * @returns {*}
 */
_$jscoverage['utils/validator.js'][56]++;
exports.cleanRequest = function (req) {
    _$jscoverage['utils/validator.js'][57]++;
req = req || {};
    /**
     * we are deleting the headers:
     * 1. content-length - don't limit the size of the content
     * 2. accept-encoding - currently we don't accept encoding gzip
     * 3. connection - deleted when requesting https
     * 4. host - deleted when requesting https
     */
    _$jscoverage['utils/validator.js'][65]++;
for (var header in commons.CONST.INVALID_HEADERS) {
        _$jscoverage['utils/validator.js'][66]++;
var currentHeader = commons.CONST.INVALID_HEADERS[header];
        // try to delete it only if were passed
        _$jscoverage['utils/validator.js'][68]++;
if (req.headers && req.headers[currentHeader]) {
            _$jscoverage['utils/validator.js'][69]++;
delete req.headers[currentHeader];
        }
    }
    _$jscoverage['utils/validator.js'][72]++;
return req;
};


/**
 * check if the request if persistent
 * @param req
 * @returns {*|Function|Function|boolean|boolean}
 */
_$jscoverage['utils/validator.js'][81]++;
exports.isPersistentRequest = function (req) {
    _$jscoverage['utils/validator.js'][82]++;
var persistentReq = req && req.isPersistentRequest && req.isPersistentRequest === true || false;
    _$jscoverage['utils/validator.js'][83]++;
config.logger.info("[validator] isPersistentRequest: " + persistentReq);
    _$jscoverage['utils/validator.js'][84]++;
return persistentReq;
};

/**
 * validate URL against the configuration
 * @param _url
 * @returns {*}
 */
_$jscoverage['utils/validator.js'][92]++;
exports.isValidURL = function (_url) {
    _$jscoverage['utils/validator.js'][93]++;
var valid
        , urlObj
        , host;

    // if in the whiteList exist "*" all domains allow
    _$jscoverage['utils/validator.js'][98]++;
if (config.whiteList.indexOf("*") > -1) {
        _$jscoverage['utils/validator.js'][99]++;
log.debug("[validator] Allow all URLS");
        _$jscoverage['utils/validator.js'][100]++;
valid = true;
    }
    else {
        _$jscoverage['utils/validator.js'][103]++;
try {
            _$jscoverage['utils/validator.js'][104]++;
urlObj = url.parse(_url, true);
            _$jscoverage['utils/validator.js'][105]++;
host = _getHost(urlObj.host);
            _$jscoverage['utils/validator.js'][106]++;
if (config.whiteList.indexOf(host) > -1) {
                _$jscoverage['utils/validator.js'][107]++;
valid = true;
                _$jscoverage['utils/validator.js'][108]++;
log.info('[validator] URL: ' + host + ' URL is valid -  !!!');
            }
            else {
                _$jscoverage['utils/validator.js'][111]++;
valid = false;
                _$jscoverage['utils/validator.js'][112]++;
log.info("[validator] URL is not valid, host: " + host);
            }
        }
        catch (e) {
            _$jscoverage['utils/validator.js'][116]++;
valid = false;
            _$jscoverage['utils/validator.js'][117]++;
log.error("[validator] validateURL, exception e: " + e);
        }
    }

    _$jscoverage['utils/validator.js'][121]++;
return valid;
};