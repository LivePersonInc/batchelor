if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['commons/helper.js'] === 'undefined'){_$jscoverage['commons/helper.js']=[];
_$jscoverage['commons/helper.js'].source=['exports.configure = function (cfg) {',
'    var config = {};',
'    for (var key in cfg) {',
'        config[key] = cfg[key];',
'    }',
'    return config;',
'};',
'',
'exports.merge = function (source, target) {',
'    for (var cur in source) {',
'        target[cur] = source[cur];',
'    }',
'',
'    return target;',
'};',
'',
'exports.setAdditionalProps = function (source, target) {',
'    for(var key in source) {',
'        if (!target.hasOwnProperty(key)) {',
'            target[key] = source[key];',
'        }',
'    }',
'    return target;',
'};',
'',
'exports.convert2Array = function(obj) {',
'    var arr = [];',
'    if (obj.constructor === Array) {',
'        arr = obj.slice(0);',
'    }',
'    else {',
'        arr.push(obj);',
'    }',
'',
'    return arr;',
'};'];
_$jscoverage['commons/helper.js'][19]=0;
_$jscoverage['commons/helper.js'][2]=0;
_$jscoverage['commons/helper.js'][1]=0;
_$jscoverage['commons/helper.js'][18]=0;
_$jscoverage['commons/helper.js'][6]=0;
_$jscoverage['commons/helper.js'][3]=0;
_$jscoverage['commons/helper.js'][4]=0;
_$jscoverage['commons/helper.js'][17]=0;
_$jscoverage['commons/helper.js'][14]=0;
_$jscoverage['commons/helper.js'][9]=0;
_$jscoverage['commons/helper.js'][10]=0;
_$jscoverage['commons/helper.js'][11]=0;
_$jscoverage['commons/helper.js'][20]=0;
_$jscoverage['commons/helper.js'][23]=0;
_$jscoverage['commons/helper.js'][26]=0;
_$jscoverage['commons/helper.js'][27]=0;
_$jscoverage['commons/helper.js'][28]=0;
_$jscoverage['commons/helper.js'][29]=0;
_$jscoverage['commons/helper.js'][32]=0;
_$jscoverage['commons/helper.js'][35]=0;
}_$jscoverage['commons/helper.js'][1]++;
exports.configure = function (cfg) {
    _$jscoverage['commons/helper.js'][2]++;
var config = {};
    _$jscoverage['commons/helper.js'][3]++;
for (var key in cfg) {
        _$jscoverage['commons/helper.js'][4]++;
config[key] = cfg[key];
    }
    _$jscoverage['commons/helper.js'][6]++;
return config;
};

_$jscoverage['commons/helper.js'][9]++;
exports.merge = function (source, target) {
    _$jscoverage['commons/helper.js'][10]++;
for (var cur in source) {
        _$jscoverage['commons/helper.js'][11]++;
target[cur] = source[cur];
    }

    _$jscoverage['commons/helper.js'][14]++;
return target;
};

_$jscoverage['commons/helper.js'][17]++;
exports.setAdditionalProps = function (source, target) {
    _$jscoverage['commons/helper.js'][18]++;
for(var key in source) {
        _$jscoverage['commons/helper.js'][19]++;
if (!target.hasOwnProperty(key)) {
            _$jscoverage['commons/helper.js'][20]++;
target[key] = source[key];
        }
    }
    _$jscoverage['commons/helper.js'][23]++;
return target;
};

_$jscoverage['commons/helper.js'][26]++;
exports.convert2Array = function(obj) {
    _$jscoverage['commons/helper.js'][27]++;
var arr = [];
    _$jscoverage['commons/helper.js'][28]++;
if (obj.constructor === Array) {
        _$jscoverage['commons/helper.js'][29]++;
arr = obj.slice(0);
    }
    else {
        _$jscoverage['commons/helper.js'][32]++;
arr.push(obj);
    }

    _$jscoverage['commons/helper.js'][35]++;
return arr;
};