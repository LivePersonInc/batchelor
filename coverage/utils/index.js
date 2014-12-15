if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['utils/index.js'] === 'undefined'){_$jscoverage['utils/index.js']=[];
_$jscoverage['utils/index.js'].source=['/*jslint node: true */',
'\'use strict\';',
'var utils = {',
'    jobHolder : require("./jobHolder"),',
'    validator : require("./validator"),',
'    builder   : require("./builder")',
'};',
'exports.configure = function (cfg) {',
'    for (var cur in utils) {',
'        if (typeof utils[cur].configure === "function") {',
'            utils[cur].configure(cfg);',
'        }',
'        exports[cur]  = utils[cur];',
'    }',
'};'];
_$jscoverage['utils/index.js'][2]=0;
_$jscoverage['utils/index.js'][3]=0;
_$jscoverage['utils/index.js'][8]=0;
_$jscoverage['utils/index.js'][9]=0;
_$jscoverage['utils/index.js'][10]=0;
_$jscoverage['utils/index.js'][11]=0;
_$jscoverage['utils/index.js'][13]=0;
}/*jslint node: true */
_$jscoverage['utils/index.js'][2]++;
'use strict';
_$jscoverage['utils/index.js'][3]++;
var utils = {
    jobHolder : require("./jobHolder"),
    validator : require("./validator"),
    builder   : require("./builder")
};
_$jscoverage['utils/index.js'][8]++;
exports.configure = function (cfg) {
    _$jscoverage['utils/index.js'][9]++;
for (var cur in utils) {
        _$jscoverage['utils/index.js'][10]++;
if (typeof utils[cur].configure === "function") {
            _$jscoverage['utils/index.js'][11]++;
utils[cur].configure(cfg);
        }
        _$jscoverage['utils/index.js'][13]++;
exports[cur]  = utils[cur];
    }
};