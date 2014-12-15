if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['lib/processor.js'] === 'undefined'){_$jscoverage['lib/processor.js']=[];
_$jscoverage['lib/processor.js'].source=['/*jslint node: true */',
'\'use strict\';',
'var async   = require("async");',
'var request = require("request");',
'var utils   = require("./../utils");',
'var commons = require("./../commons");',
'var config;',
'',
'function _process(req, error, response, body, callback) {',
'',
'    var result = {};',
'',
'    if (!response) {',
'        result = utils.builder.buildResponse(error.code || commons.CONST.RESPONSE_TYPE.ERROR_API_URL);',
'    }',
'    else {',
'        if (error) {',
'            config.logger.error(commons.CONST.BODY_RESPONSE.ERROR_API_URL + " " + req.url +  " Error Code: " + error.code + ", IP: " + req.ip);',
'            result = utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.ERROR_API_URL);',
'        } else {',
'            try {',
'                result.body = JSON.parse(body);',
'            } catch (err) {',
'                config.logger.error(commons.CONST.BODY_RESPONSE.NO_JSON_OBJECT + ", IP: " + req.ip);',
'                result = utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.NO_JSON_OBJECT);',
'            }',
'        }',
'',
'        // set the headers/status in the result object',
'        result.headers = response.headers;',
'        result.statusCode = response.statusCode;',
'',
'    }',
'',
'    // callback of the async.parallel method (async.parallel(reqs, function (err, results) {...))',
'    // in the callback expects two parameters - error and results',
'    callback(null, result);',
'}',
'',
'function _getReq(req) {',
'    return function (cb) {',
'        var options = {',
'            url: req.url,',
'            headers: req.headers,',
'            method: req.method,',
'            body: req.body,',
'            timeout: (req.timeout <= config.request.timeout) ? req.timeout : config.request.timeout,',
'            pool : {',
'                maxSockets : 200',
'            }',
'        };',
'',
'        options.headers.HTTP_X_FORWARDED_FOR = req.ip;',
'',
'        config.logger.info("[processor] Requesting URL: " + options.url + ", headers: " + options.headers + ", method: " + options.method + ", body(when POST method): " + options.body + ", timeout: "  + options.timeout);',
'',
'        // request to the API host for every job',
'        request(options, function(error, response, body) {',
'              _process(req, error, response, body, cb);',
'        });',
'    };',
'}',
'',
'exports.configure = function (cfg) {',
'    config = commons.helper.configure(cfg);',
'    return config;',
'};',
'',
'exports.run = function (job, cb) {',
'',
'    config.logger.info("[processor] running processor ...");',
'    var reqs = {};',
'',
'    // creates the collection of \'requests\' (holds a collection of getReq methods)',
'    for (var i=0; i< job.length; i++) {',
'        var cReq = job[i];',
'        reqs[cReq.name] =_getReq(cReq);',
'    }',
'',
'    async.parallelLimit(reqs, config.maxConcurrentJobs, function (err, results) {',
'        if (err) {',
'            config.logger.error("[processor] Error in running the job, err: " + err);',
'            cb(err);',
'        }',
'        else {',
'            cb(null, results);',
'        }',
'    });',
'',
'};'];
_$jscoverage['lib/processor.js'][42]=0;
_$jscoverage['lib/processor.js'][2]=0;
_$jscoverage['lib/processor.js'][53]=0;
_$jscoverage['lib/processor.js'][4]=0;
_$jscoverage['lib/processor.js'][3]=0;
_$jscoverage['lib/processor.js'][59]=0;
_$jscoverage['lib/processor.js'][7]=0;
_$jscoverage['lib/processor.js'][5]=0;
_$jscoverage['lib/processor.js'][6]=0;
_$jscoverage['lib/processor.js'][41]=0;
_$jscoverage['lib/processor.js'][19]=0;
_$jscoverage['lib/processor.js'][11]=0;
_$jscoverage['lib/processor.js'][14]=0;
_$jscoverage['lib/processor.js'][18]=0;
_$jscoverage['lib/processor.js'][17]=0;
_$jscoverage['lib/processor.js'][9]=0;
_$jscoverage['lib/processor.js'][13]=0;
_$jscoverage['lib/processor.js'][64]=0;
_$jscoverage['lib/processor.js'][31]=0;
_$jscoverage['lib/processor.js'][30]=0;
_$jscoverage['lib/processor.js'][21]=0;
_$jscoverage['lib/processor.js'][25]=0;
_$jscoverage['lib/processor.js'][22]=0;
_$jscoverage['lib/processor.js'][24]=0;
_$jscoverage['lib/processor.js'][76]=0;
_$jscoverage['lib/processor.js'][58]=0;
_$jscoverage['lib/processor.js'][40]=0;
_$jscoverage['lib/processor.js'][55]=0;
_$jscoverage['lib/processor.js'][37]=0;
_$jscoverage['lib/processor.js'][82]=0;
_$jscoverage['lib/processor.js'][66]=0;
_$jscoverage['lib/processor.js'][65]=0;
_$jscoverage['lib/processor.js'][69]=0;
_$jscoverage['lib/processor.js'][71]=0;
_$jscoverage['lib/processor.js'][72]=0;
_$jscoverage['lib/processor.js'][75]=0;
_$jscoverage['lib/processor.js'][77]=0;
_$jscoverage['lib/processor.js'][80]=0;
_$jscoverage['lib/processor.js'][81]=0;
_$jscoverage['lib/processor.js'][83]=0;
_$jscoverage['lib/processor.js'][86]=0;
}/*jslint node: true */
_$jscoverage['lib/processor.js'][2]++;
'use strict';
_$jscoverage['lib/processor.js'][3]++;
var async   = require("async");
_$jscoverage['lib/processor.js'][4]++;
var request = require("request");
_$jscoverage['lib/processor.js'][5]++;
var utils   = require("./../utils");
_$jscoverage['lib/processor.js'][6]++;
var commons = require("./../commons");
_$jscoverage['lib/processor.js'][7]++;
var config;

_$jscoverage['lib/processor.js'][9]++;
function _process(req, error, response, body, callback) {

    _$jscoverage['lib/processor.js'][11]++;
var result = {};

    _$jscoverage['lib/processor.js'][13]++;
if (!response) {
        _$jscoverage['lib/processor.js'][14]++;
result = utils.builder.buildResponse(error.code || commons.CONST.RESPONSE_TYPE.ERROR_API_URL);
    }
    else {
        _$jscoverage['lib/processor.js'][17]++;
if (error) {
            _$jscoverage['lib/processor.js'][18]++;
config.logger.error(commons.CONST.BODY_RESPONSE.ERROR_API_URL + " " + req.url +  " Error Code: " + error.code + ", IP: " + req.ip);
            _$jscoverage['lib/processor.js'][19]++;
result = utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.ERROR_API_URL);
        } else {
            _$jscoverage['lib/processor.js'][21]++;
try {
                _$jscoverage['lib/processor.js'][22]++;
result.body = JSON.parse(body);
            } catch (err) {
                _$jscoverage['lib/processor.js'][24]++;
config.logger.error(commons.CONST.BODY_RESPONSE.NO_JSON_OBJECT + ", IP: " + req.ip);
                _$jscoverage['lib/processor.js'][25]++;
result = utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.NO_JSON_OBJECT);
            }
        }

        // set the headers/status in the result object
        _$jscoverage['lib/processor.js'][30]++;
result.headers = response.headers;
        _$jscoverage['lib/processor.js'][31]++;
result.statusCode = response.statusCode;

    }

    // callback of the async.parallel method (async.parallel(reqs, function (err, results) {...))
    // in the callback expects two parameters - error and results
    _$jscoverage['lib/processor.js'][37]++;
callback(null, result);
}

_$jscoverage['lib/processor.js'][40]++;
function _getReq(req) {
    _$jscoverage['lib/processor.js'][41]++;
return function (cb) {
        _$jscoverage['lib/processor.js'][42]++;
var options = {
            url: req.url,
            headers: req.headers,
            method: req.method,
            body: req.body,
            timeout: (req.timeout <= config.request.timeout) ? req.timeout : config.request.timeout,
            pool : {
                maxSockets : 200
            }
        };

        _$jscoverage['lib/processor.js'][53]++;
options.headers.HTTP_X_FORWARDED_FOR = req.ip;

        _$jscoverage['lib/processor.js'][55]++;
config.logger.info("[processor] Requesting URL: " + options.url + ", headers: " + options.headers + ", method: " + options.method + ", body(when POST method): " + options.body + ", timeout: "  + options.timeout);

        // request to the API host for every job
        _$jscoverage['lib/processor.js'][58]++;
request(options, function(error, response, body) {
              _$jscoverage['lib/processor.js'][59]++;
_process(req, error, response, body, cb);
        });
    };
}

_$jscoverage['lib/processor.js'][64]++;
exports.configure = function (cfg) {
    _$jscoverage['lib/processor.js'][65]++;
config = commons.helper.configure(cfg);
    _$jscoverage['lib/processor.js'][66]++;
return config;
};

_$jscoverage['lib/processor.js'][69]++;
exports.run = function (job, cb) {

    _$jscoverage['lib/processor.js'][71]++;
config.logger.info("[processor] running processor ...");
    _$jscoverage['lib/processor.js'][72]++;
var reqs = {};

    // creates the collection of 'requests' (holds a collection of getReq methods)
    _$jscoverage['lib/processor.js'][75]++;
for (var i=0; i< job.length; i++) {
        _$jscoverage['lib/processor.js'][76]++;
var cReq = job[i];
        _$jscoverage['lib/processor.js'][77]++;
reqs[cReq.name] =_getReq(cReq);
    }

    _$jscoverage['lib/processor.js'][80]++;
async.parallelLimit(reqs, config.maxConcurrentJobs, function (err, results) {
        _$jscoverage['lib/processor.js'][81]++;
if (err) {
            _$jscoverage['lib/processor.js'][82]++;
config.logger.error("[processor] Error in running the job, err: " + err);
            _$jscoverage['lib/processor.js'][83]++;
cb(err);
        }
        else {
            _$jscoverage['lib/processor.js'][86]++;
cb(null, results);
        }
    });

};