if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['utils/utils.js'] === 'undefined'){_$jscoverage['utils/utils.js']=[];
_$jscoverage['utils/utils.js'].source=['var utils = {',
'    jobHolder : require(\'./jobHolder\'),',
'    validator : require(\'./validator\'),',
'    builder   : require(\'./builder\')',
'};',
'exports.configure = function (cfg) {',
'    for (var cur in utils) {',
'        if (typeof utils[cur].configure === "function") {',
'            utils[cur].configure(cfg);',
'        }',
'        exports[cur]  = utils[cur];',
'    }',
'};'];
_$jscoverage['utils/utils.js'][1]=0;
_$jscoverage['utils/utils.js'][6]=0;
_$jscoverage['utils/utils.js'][7]=0;
_$jscoverage['utils/utils.js'][8]=0;
_$jscoverage['utils/utils.js'][9]=0;
_$jscoverage['utils/utils.js'][11]=0;
}_$jscoverage['utils/utils.js'][1]++;
var utils = {
    jobHolder : require('./jobHolder'),
    validator : require('./validator'),
    builder   : require('./builder')
};
_$jscoverage['utils/utils.js'][6]++;
exports.configure = function (cfg) {
    _$jscoverage['utils/utils.js'][7]++;
for (var cur in utils) {
        _$jscoverage['utils/utils.js'][8]++;
if (typeof utils[cur].configure === "function") {
            _$jscoverage['utils/utils.js'][9]++;
utils[cur].configure(cfg);
        }
        _$jscoverage['utils/utils.js'][11]++;
exports[cur]  = utils[cur];
    }
};