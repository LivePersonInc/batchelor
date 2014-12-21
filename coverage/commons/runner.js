if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['commons/runner.js'] === 'undefined'){_$jscoverage['commons/runner.js']=[];
_$jscoverage['commons/runner.js'].source=['/*jslint node: true */',
'"use strict";',
'(function() {',
'    function Runner (array) {',
'        this.array      = array;',
'        this.processing = false;',
'        this.state      = {};',
'    }',
'',
'    var proto = Runner.prototype;',
'',
'    proto.start = function (index, endless, callback, complete) {',
'        this.processing = true;',
'        setImmediate(_iterate.call(this, index < this.array.length ? index : 0, this.array, endless, callback, complete));',
'    };',
'',
'    proto.stop = function () {',
'        this.processing = false;',
'    };',
'',
'    proto.resume = function () {',
'        this.processing = true;',
'        this.start(this.state.index, this.state.endless, this.state.callback, this.state.complete);',
'    };',
'',
'    proto.getProperties = function () {',
'        return {',
'            processing: this.processing,',
'            array: this.array',
'        };',
'    };',
'',
'    proto.removeItem = function (index) {',
'        if (index < this.array.length) {',
'            this.stop();',
'            this.array.splice(index, 1);',
'        }',
'    };',
'',
'    function _buildStateObj(index, endless, callback, complete) {',
'        return {',
'            index: index,',
'            endless: endless,',
'            callback: callback,',
'            complete: complete',
'        };',
'    }',
'',
'    function _invoker(index, array, endless, callback, complete) {',
'',
'        /*jshint validthis:true */',
'        this.state = _buildStateObj(index, endless, callback, complete);',
'',
'        if (this.processing) {',
'            setImmediate(_iterate.call(this, index, array, endless, callback, complete));',
'            return;',
'        }',
'//        else if (complete) {',
'//            complete();',
'//            return;',
'//        }',
'    }',
'',
'    function _iterate (index, array, endless, callback, complete) {',
'',
'        /*jshint validthis:true */',
'        if (isNaN(index) || 0 > parseInt(index, 10)) {',
'            callback(new Error("Invalid Index"), null);',
'            return;',
'        }',
'',
'        if (index >= array.length) {',
'            if (endless) {',
'                _invoker.call(this, 0, array, endless, callback, complete);',
'            }',
'            else if (complete) {',
'                complete();',
'            }',
'            return;',
'        }',
'',
'        callback(null, array[index]);',
'',
'        _invoker.call(this, ++index, array, endless, callback, complete);',
'        return;',
'    }',
'',
'    module.exports = Runner;',
'})();'];
_$jscoverage['commons/runner.js'][40]=0;
_$jscoverage['commons/runner.js'][2]=0;
_$jscoverage['commons/runner.js'][52]=0;
_$jscoverage['commons/runner.js'][3]=0;
_$jscoverage['commons/runner.js'][55]=0;
_$jscoverage['commons/runner.js'][4]=0;
_$jscoverage['commons/runner.js'][56]=0;
_$jscoverage['commons/runner.js'][6]=0;
_$jscoverage['commons/runner.js'][5]=0;
_$jscoverage['commons/runner.js'][54]=0;
_$jscoverage['commons/runner.js'][13]=0;
_$jscoverage['commons/runner.js'][10]=0;
_$jscoverage['commons/runner.js'][7]=0;
_$jscoverage['commons/runner.js'][12]=0;
_$jscoverage['commons/runner.js'][69]=0;
_$jscoverage['commons/runner.js'][18]=0;
_$jscoverage['commons/runner.js'][17]=0;
_$jscoverage['commons/runner.js'][14]=0;
_$jscoverage['commons/runner.js'][74]=0;
_$jscoverage['commons/runner.js'][27]=0;
_$jscoverage['commons/runner.js'][26]=0;
_$jscoverage['commons/runner.js'][21]=0;
_$jscoverage['commons/runner.js'][23]=0;
_$jscoverage['commons/runner.js'][22]=0;
_$jscoverage['commons/runner.js'][73]=0;
_$jscoverage['commons/runner.js'][34]=0;
_$jscoverage['commons/runner.js'][33]=0;
_$jscoverage['commons/runner.js'][79]=0;
_$jscoverage['commons/runner.js'][36]=0;
_$jscoverage['commons/runner.js'][35]=0;
_$jscoverage['commons/runner.js'][82]=0;
_$jscoverage['commons/runner.js'][49]=0;
_$jscoverage['commons/runner.js'][41]=0;
_$jscoverage['commons/runner.js'][64]=0;
_$jscoverage['commons/runner.js'][67]=0;
_$jscoverage['commons/runner.js'][68]=0;
_$jscoverage['commons/runner.js'][72]=0;
_$jscoverage['commons/runner.js'][76]=0;
_$jscoverage['commons/runner.js'][77]=0;
_$jscoverage['commons/runner.js'][84]=0;
_$jscoverage['commons/runner.js'][85]=0;
_$jscoverage['commons/runner.js'][88]=0;
}/*jslint node: true */
_$jscoverage['commons/runner.js'][2]++;
"use strict";
_$jscoverage['commons/runner.js'][3]++;
(function() {
    _$jscoverage['commons/runner.js'][4]++;
function Runner (array) {
        _$jscoverage['commons/runner.js'][5]++;
this.array      = array;
        _$jscoverage['commons/runner.js'][6]++;
this.processing = false;
        _$jscoverage['commons/runner.js'][7]++;
this.state      = {};
    }

    _$jscoverage['commons/runner.js'][10]++;
var proto = Runner.prototype;

    _$jscoverage['commons/runner.js'][12]++;
proto.start = function (index, endless, callback, complete) {
        _$jscoverage['commons/runner.js'][13]++;
this.processing = true;
        _$jscoverage['commons/runner.js'][14]++;
setImmediate(_iterate.call(this, index < this.array.length ? index : 0, this.array, endless, callback, complete));
    };

    _$jscoverage['commons/runner.js'][17]++;
proto.stop = function () {
        _$jscoverage['commons/runner.js'][18]++;
this.processing = false;
    };

    _$jscoverage['commons/runner.js'][21]++;
proto.resume = function () {
        _$jscoverage['commons/runner.js'][22]++;
this.processing = true;
        _$jscoverage['commons/runner.js'][23]++;
this.start(this.state.index, this.state.endless, this.state.callback, this.state.complete);
    };

    _$jscoverage['commons/runner.js'][26]++;
proto.getProperties = function () {
        _$jscoverage['commons/runner.js'][27]++;
return {
            processing: this.processing,
            array: this.array
        };
    };

    _$jscoverage['commons/runner.js'][33]++;
proto.removeItem = function (index) {
        _$jscoverage['commons/runner.js'][34]++;
if (index < this.array.length) {
            _$jscoverage['commons/runner.js'][35]++;
this.stop();
            _$jscoverage['commons/runner.js'][36]++;
this.array.splice(index, 1);
        }
    };

    _$jscoverage['commons/runner.js'][40]++;
function _buildStateObj(index, endless, callback, complete) {
        _$jscoverage['commons/runner.js'][41]++;
return {
            index: index,
            endless: endless,
            callback: callback,
            complete: complete
        };
    }

    _$jscoverage['commons/runner.js'][49]++;
function _invoker(index, array, endless, callback, complete) {

        /*jshint validthis:true */
        _$jscoverage['commons/runner.js'][52]++;
this.state = _buildStateObj(index, endless, callback, complete);

        _$jscoverage['commons/runner.js'][54]++;
if (this.processing) {
            _$jscoverage['commons/runner.js'][55]++;
setImmediate(_iterate.call(this, index, array, endless, callback, complete));
            _$jscoverage['commons/runner.js'][56]++;
return;
        }
//        else if (complete) {
//            complete();
//            return;
//        }
    }

    _$jscoverage['commons/runner.js'][64]++;
function _iterate (index, array, endless, callback, complete) {

        /*jshint validthis:true */
        _$jscoverage['commons/runner.js'][67]++;
if (isNaN(index) || 0 > parseInt(index, 10)) {
            _$jscoverage['commons/runner.js'][68]++;
callback(new Error("Invalid Index"), null);
            _$jscoverage['commons/runner.js'][69]++;
return;
        }

        _$jscoverage['commons/runner.js'][72]++;
if (index >= array.length) {
            _$jscoverage['commons/runner.js'][73]++;
if (endless) {
                _$jscoverage['commons/runner.js'][74]++;
_invoker.call(this, 0, array, endless, callback, complete);
            }
            else {
_$jscoverage['commons/runner.js'][76]++;
if (complete) {
                _$jscoverage['commons/runner.js'][77]++;
complete();
            }}

            _$jscoverage['commons/runner.js'][79]++;
return;
        }

        _$jscoverage['commons/runner.js'][82]++;
callback(null, array[index]);

        _$jscoverage['commons/runner.js'][84]++;
_invoker.call(this, ++index, array, endless, callback, complete);
        _$jscoverage['commons/runner.js'][85]++;
return;
    }

    _$jscoverage['commons/runner.js'][88]++;
module.exports = Runner;
})();