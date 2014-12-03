if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['utils/validator.js'] === 'undefined'){_$jscoverage['utils/validator.js']=[];
_$jscoverage['utils/validator.js'].source=['var commons = require(\'./../commons/commons\');',
'var config;',
'',
'exports.configure = function (cfg) {',
'    config = commons.helper.configure(cfg);',
'    return config;',
'};',
'',
'exports.isValidRequest = function (task) {',
'    task = task || {};',
'    var validTask = false;',
'    if ((task.name && typeof task.name === "string") &&',
'        (task.url && typeof task.url === "string") &&',
'        (task.method && typeof task.method === "string")) {',
'        validTask = true;',
'    }',
'    config.logger.info("isValidTask: " + validTask)',
'    return validTask',
'};',
'exports.cleanRequest = function (task) {',
'    task = task || {};',
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
'        if (task.headers && task.headers[currentHeader]) {',
'            delete task.headers[currentHeader];',
'        }',
'    }',
'    return task;',
'};',
'',
''];
_$jscoverage['utils/validator.js'][17]=0;
_$jscoverage['utils/validator.js'][1]=0;
_$jscoverage['utils/validator.js'][18]=0;
_$jscoverage['utils/validator.js'][5]=0;
_$jscoverage['utils/validator.js'][4]=0;
_$jscoverage['utils/validator.js'][2]=0;
_$jscoverage['utils/validator.js'][21]=0;
_$jscoverage['utils/validator.js'][11]=0;
_$jscoverage['utils/validator.js'][9]=0;
_$jscoverage['utils/validator.js'][10]=0;
_$jscoverage['utils/validator.js'][6]=0;
_$jscoverage['utils/validator.js'][12]=0;
_$jscoverage['utils/validator.js'][15]=0;
_$jscoverage['utils/validator.js'][20]=0;
_$jscoverage['utils/validator.js'][29]=0;
_$jscoverage['utils/validator.js'][30]=0;
_$jscoverage['utils/validator.js'][32]=0;
_$jscoverage['utils/validator.js'][33]=0;
_$jscoverage['utils/validator.js'][36]=0;
}_$jscoverage['utils/validator.js'][1]++;
var commons = require('./../commons/commons');
_$jscoverage['utils/validator.js'][2]++;
var config;

_$jscoverage['utils/validator.js'][4]++;
exports.configure = function (cfg) {
    _$jscoverage['utils/validator.js'][5]++;
config = commons.helper.configure(cfg);
    _$jscoverage['utils/validator.js'][6]++;
return config;
};

_$jscoverage['utils/validator.js'][9]++;
exports.isValidRequest = function (task) {
    _$jscoverage['utils/validator.js'][10]++;
task = task || {};
    _$jscoverage['utils/validator.js'][11]++;
var validTask = false;
    _$jscoverage['utils/validator.js'][12]++;
if ((task.name && typeof task.name === "string") &&
        (task.url && typeof task.url === "string") &&
        (task.method && typeof task.method === "string")) {
        _$jscoverage['utils/validator.js'][15]++;
validTask = true;
    }
    _$jscoverage['utils/validator.js'][17]++;
config.logger.info("isValidTask: " + validTask)
    _$jscoverage['utils/validator.js'][18]++;
return validTask
};
_$jscoverage['utils/validator.js'][20]++;
exports.cleanRequest = function (task) {
    _$jscoverage['utils/validator.js'][21]++;
task = task || {};
    /**
     * we are deleting the headers:
     * 1. content-length - don't limit the size of the content
     * 2. accept-encoding - currently we don't accept encoding gzip
     * 3. connection - deleted when requesting https
     * 4. host - deleted when requesting https
     */
    _$jscoverage['utils/validator.js'][29]++;
for (var header in commons.CONST.INVALID_HEADERS) {
        _$jscoverage['utils/validator.js'][30]++;
var currentHeader = commons.CONST.INVALID_HEADERS[header];
        // try to delete it only if were passed
        _$jscoverage['utils/validator.js'][32]++;
if (task.headers && task.headers[currentHeader]) {
            _$jscoverage['utils/validator.js'][33]++;
delete task.headers[currentHeader];
        }
    }
    _$jscoverage['utils/validator.js'][36]++;
return task;
};

