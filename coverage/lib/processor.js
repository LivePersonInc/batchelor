if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['lib/processor.js'] === 'undefined'){_$jscoverage['lib/processor.js']=[];
_$jscoverage['lib/processor.js'].source=['var async   = require(\'async\');',
'var request = require(\'request\');',
'var utils   = require(\'./../utils/utils\');',
'var commons = require(\'./../commons/commons\');',
'var config;',
'',
'function _process(task, error, response, body, callback) {',
'',
'    var result = {};',
'',
'    if (!response) {',
'        result = utils.builder.buildResponse(error.code || commons.CONST.RESPONSE_TYPE.ERROR_API_URL);',
'    }',
'    else {',
'        if (error) {',
'            config.logger.error(commons.CONST.BODY_RESPONSE.ERROR_API_URL + " " + task.url +  " Error Code: " + error.code + ", IP: " + task.ip);',
'            result = utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.ERROR_API_URL);',
'        } else {',
'            try {',
'                result.body = JSON.parse(body);',
'            } catch (err) {',
'                config.logger.error(commons.CONST.BODY_RESPONSE.NO_JSON_OBJECT + ", IP: " + task.ip);',
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
'    // callback of the async.parallel method (async.parallel(tasks, function (err, results) {...))',
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
'        config.logger.info("Requesting URL: " + options.url + ", headers: " + options.headers + ", method: " + options.method + ", body(when POST method): " + options.body + ", timeout: "  + options.timeout);',
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
'    config.logger.info("running processor ...");',
'    var reqs = {};',
'',
'    // creates the collection of \'requests\' (holds a collection of getReq methods)',
'    for (var i=0; i< job.length; i++) {',
'        var cReq = job[i];',
'        reqs[cReq.name] =_getReq(cReq);',
'    }',
'',
'    async.parallelLimit(reqs, config.maxConcurrentJobs, function (err, results) {',
'',
'        if (err) {',
'            config.logger.error("Error in running the job, err: " + err);',
'            cb(err);',
'        }',
'        else {',
'            cb(null, results);',
'        }',
'    });',
'',
'};'];
_$jscoverage['lib/processor.js'][51]=0;
_$jscoverage['lib/processor.js'][1]=0;
_$jscoverage['lib/processor.js'][53]=0;
_$jscoverage['lib/processor.js'][3]=0;
_$jscoverage['lib/processor.js'][2]=0;
_$jscoverage['lib/processor.js'][57]=0;
_$jscoverage['lib/processor.js'][9]=0;
_$jscoverage['lib/processor.js'][4]=0;
_$jscoverage['lib/processor.js'][5]=0;
_$jscoverage['lib/processor.js'][7]=0;
_$jscoverage['lib/processor.js'][38]=0;
_$jscoverage['lib/processor.js'][22]=0;
_$jscoverage['lib/processor.js'][19]=0;
_$jscoverage['lib/processor.js'][15]=0;
_$jscoverage['lib/processor.js'][12]=0;
_$jscoverage['lib/processor.js'][16]=0;
_$jscoverage['lib/processor.js'][11]=0;
_$jscoverage['lib/processor.js'][17]=0;
_$jscoverage['lib/processor.js'][20]=0;
_$jscoverage['lib/processor.js'][68]=0;
_$jscoverage['lib/processor.js'][40]=0;
_$jscoverage['lib/processor.js'][29]=0;
_$jscoverage['lib/processor.js'][28]=0;
_$jscoverage['lib/processor.js'][35]=0;
_$jscoverage['lib/processor.js'][39]=0;
_$jscoverage['lib/processor.js'][23]=0;
_$jscoverage['lib/processor.js'][72]=0;
_$jscoverage['lib/processor.js'][63]=0;
_$jscoverage['lib/processor.js'][62]=0;
_$jscoverage['lib/processor.js'][56]=0;
_$jscoverage['lib/processor.js'][64]=0;
_$jscoverage['lib/processor.js'][67]=0;
_$jscoverage['lib/processor.js'][69]=0;
_$jscoverage['lib/processor.js'][73]=0;
_$jscoverage['lib/processor.js'][74]=0;
_$jscoverage['lib/processor.js'][77]=0;
_$jscoverage['lib/processor.js'][79]=0;
_$jscoverage['lib/processor.js'][80]=0;
_$jscoverage['lib/processor.js'][81]=0;
_$jscoverage['lib/processor.js'][84]=0;
}_$jscoverage['lib/processor.js'][1]++;
var async   = require('async');
_$jscoverage['lib/processor.js'][2]++;
var request = require('request');
_$jscoverage['lib/processor.js'][3]++;
var utils   = require('./../utils/utils');
_$jscoverage['lib/processor.js'][4]++;
var commons = require('./../commons/commons');
_$jscoverage['lib/processor.js'][5]++;
var config;

_$jscoverage['lib/processor.js'][7]++;
function _process(task, error, response, body, callback) {

    _$jscoverage['lib/processor.js'][9]++;
var result = {};

    _$jscoverage['lib/processor.js'][11]++;
if (!response) {
        _$jscoverage['lib/processor.js'][12]++;
result = utils.builder.buildResponse(error.code || commons.CONST.RESPONSE_TYPE.ERROR_API_URL);
    }
    else {
        _$jscoverage['lib/processor.js'][15]++;
if (error) {
            _$jscoverage['lib/processor.js'][16]++;
config.logger.error(commons.CONST.BODY_RESPONSE.ERROR_API_URL + " " + task.url +  " Error Code: " + error.code + ", IP: " + task.ip);
            _$jscoverage['lib/processor.js'][17]++;
result = utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.ERROR_API_URL);
        } else {
            _$jscoverage['lib/processor.js'][19]++;
try {
                _$jscoverage['lib/processor.js'][20]++;
result.body = JSON.parse(body);
            } catch (err) {
                _$jscoverage['lib/processor.js'][22]++;
config.logger.error(commons.CONST.BODY_RESPONSE.NO_JSON_OBJECT + ", IP: " + task.ip);
                _$jscoverage['lib/processor.js'][23]++;
result = utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.NO_JSON_OBJECT);
            }
        }

        // set the headers/status in the result object
        _$jscoverage['lib/processor.js'][28]++;
result.headers = response.headers;
        _$jscoverage['lib/processor.js'][29]++;
result.statusCode = response.statusCode;

    }

    // callback of the async.parallel method (async.parallel(tasks, function (err, results) {...))
    // in the callback expects two parameters - error and results
    _$jscoverage['lib/processor.js'][35]++;
callback(null, result);
}

_$jscoverage['lib/processor.js'][38]++;
function _getReq(req) {
    _$jscoverage['lib/processor.js'][39]++;
return function (cb) {
        _$jscoverage['lib/processor.js'][40]++;
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

        _$jscoverage['lib/processor.js'][51]++;
options.headers.HTTP_X_FORWARDED_FOR = req.ip;

        _$jscoverage['lib/processor.js'][53]++;
config.logger.info("Requesting URL: " + options.url + ", headers: " + options.headers + ", method: " + options.method + ", body(when POST method): " + options.body + ", timeout: "  + options.timeout);

        // request to the API host for every job
        _$jscoverage['lib/processor.js'][56]++;
request(options, function(error, response, body) {
              _$jscoverage['lib/processor.js'][57]++;
_process(req, error, response, body, cb);
        });
    };
}

_$jscoverage['lib/processor.js'][62]++;
exports.configure = function (cfg) {
    _$jscoverage['lib/processor.js'][63]++;
config = commons.helper.configure(cfg);
    _$jscoverage['lib/processor.js'][64]++;
return config;
};

_$jscoverage['lib/processor.js'][67]++;
exports.run = function (job, cb) {
    _$jscoverage['lib/processor.js'][68]++;
config.logger.info("running processor ...");
    _$jscoverage['lib/processor.js'][69]++;
var reqs = {};

    // creates the collection of 'requests' (holds a collection of getReq methods)
    _$jscoverage['lib/processor.js'][72]++;
for (var i=0; i< job.length; i++) {
        _$jscoverage['lib/processor.js'][73]++;
var cReq = job[i];
        _$jscoverage['lib/processor.js'][74]++;
reqs[cReq.name] =_getReq(cReq);
    }

    _$jscoverage['lib/processor.js'][77]++;
async.parallelLimit(reqs, config.maxConcurrentJobs, function (err, results) {

        _$jscoverage['lib/processor.js'][79]++;
if (err) {
            _$jscoverage['lib/processor.js'][80]++;
config.logger.error("Error in running the job, err: " + err);
            _$jscoverage['lib/processor.js'][81]++;
cb(err);
        }
        else {
            _$jscoverage['lib/processor.js'][84]++;
cb(null, results);
        }
    });

};