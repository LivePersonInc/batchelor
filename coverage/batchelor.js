if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['batchelor/batchelor.js'] === 'undefined'){_$jscoverage['batchelor/batchelor.js']=[];
_$jscoverage['batchelor/batchelor.js'].source=['/*jslint node: true */',
'"use strict";',
'var negotiator      = require("./lib/negotiator")',
'    , persistent    = require("./adaptors/persistent");',
'',
'function batchelor () {',
'    batchelor.persistent = function () {',
'    };',
'}',
'',
'// Exports',
'exports.configure   = negotiator.configure;',
'exports.execute     = negotiator.execute;',
'exports.persistent  = persistent;',
''];
_$jscoverage['batchelor/batchelor.js'][2]=0;
_$jscoverage['batchelor/batchelor.js'][3]=0;
_$jscoverage['batchelor/batchelor.js'][6]=0;
_$jscoverage['batchelor/batchelor.js'][7]=0;
_$jscoverage['batchelor/batchelor.js'][12]=0;
_$jscoverage['batchelor/batchelor.js'][13]=0;
_$jscoverage['batchelor/batchelor.js'][14]=0;
}/*jslint node: true */
_$jscoverage['batchelor/batchelor.js'][2]++;
"use strict";
_$jscoverage['batchelor/batchelor.js'][3]++;
var negotiator      = require("./lib/negotiator")
    , persistent    = require("./adaptors/persistent");

_$jscoverage['batchelor/batchelor.js'][6]++;
function batchelor () {
    _$jscoverage['batchelor/batchelor.js'][7]++;
batchelor.persistent = function () {
    };
}

// Exports
_$jscoverage['batchelor/batchelor.js'][12]++;
exports.configure   = negotiator.configure;
_$jscoverage['batchelor/batchelor.js'][13]++;
exports.execute     = negotiator.execute;
_$jscoverage['batchelor/batchelor.js'][14]++;
exports.persistent  = persistent;
