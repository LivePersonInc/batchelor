if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['commons/eterator.js'] === 'undefined'){_$jscoverage['commons/eterator.js']=[];
_$jscoverage['commons/eterator.js'].source=['/*jslint node: true */',
'"use strict";',
'(function() {',
'    function Eterator (array) {',
'        this.state      = null;',
'        this.array      = array ? array.slice(0) : [];',
'        this.processing = false;',
'    }',
'',
'    var proto = Eterator.prototype;',
'',
'    proto.start = function (index, endless, callback, complete) {',
'        if (this.processing) {',
'            return;',
'        }',
'',
'        this.processing = true;',
'        this.state = _buildStateObj(index, endless, callback, complete);',
'        if (0 < this.array.length) {',
'            setImmediate(_iterate.bind(this, index < this.array.length ? index : 0, this.array, endless, callback, complete));',
'        }',
'',
'        return true;',
'    };',
'',
'    proto.stop = function () {',
'        this.processing = false;',
'    };',
'',
'    proto.resume = function () {',
'        if (!this.state) {',
'            return false;',
'        }',
'',
'        return this.start(++this.state.index, this.state.endless, this.state.callback, this.state.complete);',
'    };',
'',
'    proto.getProperties = function () {',
'        return {',
'            processing: this.processing,',
'            array: this.array.slice(0)',
'        };',
'    };',
'',
'    proto.removeItem = function (item) {',
'        var index = this.array.indexOf(item);',
'',
'        if (index < this.array.length) {',
'            this.stop();',
'            this.array.splice(index, 1);',
'            this.resume();',
'        }',
'    };',
'',
'    proto.addItem = function (item) {',
'        /*jshint validthis:true */',
'        if (this.processing) {',
'            this.stop();',
'            this.array.push(item);',
'            if (1 === this.array.length) {',
'                this.start(0, this.state.endless, this.state.callback, this.state.complete);',
'            }',
'            else {',
'                this.resume();',
'            }',
'        }',
'        else {',
'            this.array.push(item);',
'        }',
'    };',
'',
'    proto.addItems = function (items) {',
'',
'        if (items.constructor === Array) {',
'            if (this.processing) {',
'                this.stop();',
'                _addItems.call(this, items);',
'                this.resume();',
'',
'            }',
'            else {',
'                /*jshint validthis:true */',
'                _addItems.call(this, items);',
'            }',
'        }',
'    };',
'',
'    function _addItems(items) {',
'        /*jshint validthis:true */',
'        for (var i = 0; i < items.length; i++) {',
'            this.addItem(items[i]);',
'        }',
'    }',
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
'        if (this.processing) {',
'            setImmediate(_iterate.bind(this, index, array, endless, callback, complete));',
'        }',
'    }',
'',
'    function _iterate (index, array, endless, callback, complete) {',
'        if (isNaN(index) || 0 > parseInt(index, 10)) {',
'            runCallBack(callback, null, new Error("Invalid Index"));',
'            return;',
'        }',
'',
'        /*jshint validthis:true */',
'        this.state = _buildStateObj(index, endless, callback, complete);',
'',
'        if (index >= array.length) {',
'            this.stop();',
'            if (complete) {',
'                runCallBack(complete);',
'            }',
'            if (endless) {',
'                setImmediate(this.start.bind(this, 0, endless, callback, complete));',
'            }',
'            return;',
'        }',
'',
'        runCallBack(callback, array[index]);',
'        _invoker.call(this, ++index, array, endless, callback, complete);',
'    }',
'',
'    function runCallBack(func, data, error) {',
'        error = error || null;',
'        data = data || null;',
'        if (func && typeof func === \'function\') {',
'            try {',
'                func(error, data);',
'            } catch (err) {',
'            }',
'        }',
'    }',
'',
'    module.exports = Eterator;',
'})();'];
_$jscoverage['commons/eterator.js'][76]=0;
_$jscoverage['commons/eterator.js'][2]=0;
_$jscoverage['commons/eterator.js'][77]=0;
_$jscoverage['commons/eterator.js'][3]=0;
_$jscoverage['commons/eterator.js'][78]=0;
_$jscoverage['commons/eterator.js'][4]=0;
_$jscoverage['commons/eterator.js'][83]=0;
_$jscoverage['commons/eterator.js'][6]=0;
_$jscoverage['commons/eterator.js'][5]=0;
_$jscoverage['commons/eterator.js'][74]=0;
_$jscoverage['commons/eterator.js'][14]=0;
_$jscoverage['commons/eterator.js'][13]=0;
_$jscoverage['commons/eterator.js'][10]=0;
_$jscoverage['commons/eterator.js'][12]=0;
_$jscoverage['commons/eterator.js'][7]=0;
_$jscoverage['commons/eterator.js'][90]=0;
_$jscoverage['commons/eterator.js'][18]=0;
_$jscoverage['commons/eterator.js'][17]=0;
_$jscoverage['commons/eterator.js'][88]=0;
_$jscoverage['commons/eterator.js'][26]=0;
_$jscoverage['commons/eterator.js'][20]=0;
_$jscoverage['commons/eterator.js'][19]=0;
_$jscoverage['commons/eterator.js'][23]=0;
_$jscoverage['commons/eterator.js'][108]=0;
_$jscoverage['commons/eterator.js'][35]=0;
_$jscoverage['commons/eterator.js'][30]=0;
_$jscoverage['commons/eterator.js'][32]=0;
_$jscoverage['commons/eterator.js'][27]=0;
_$jscoverage['commons/eterator.js'][31]=0;
_$jscoverage['commons/eterator.js'][114]=0;
_$jscoverage['commons/eterator.js'][49]=0;
_$jscoverage['commons/eterator.js'][48]=0;
_$jscoverage['commons/eterator.js'][39]=0;
_$jscoverage['commons/eterator.js'][38]=0;
_$jscoverage['commons/eterator.js'][46]=0;
_$jscoverage['commons/eterator.js'][45]=0;
_$jscoverage['commons/eterator.js'][119]=0;
_$jscoverage['commons/eterator.js'][58]=0;
_$jscoverage['commons/eterator.js'][57]=0;
_$jscoverage['commons/eterator.js'][55]=0;
_$jscoverage['commons/eterator.js'][50]=0;
_$jscoverage['commons/eterator.js'][51]=0;
_$jscoverage['commons/eterator.js'][123]=0;
_$jscoverage['commons/eterator.js'][59]=0;
_$jscoverage['commons/eterator.js'][127]=0;
_$jscoverage['commons/eterator.js'][64]=0;
_$jscoverage['commons/eterator.js'][60]=0;
_$jscoverage['commons/eterator.js'][61]=0;
_$jscoverage['commons/eterator.js'][129]=0;
_$jscoverage['commons/eterator.js'][72]=0;
_$jscoverage['commons/eterator.js'][68]=0;
_$jscoverage['commons/eterator.js'][132]=0;
_$jscoverage['commons/eterator.js'][75]=0;
_$jscoverage['commons/eterator.js'][133]=0;
_$jscoverage['commons/eterator.js'][95]=0;
_$jscoverage['commons/eterator.js'][91]=0;
_$jscoverage['commons/eterator.js'][112]=0;
_$jscoverage['commons/eterator.js'][113]=0;
_$jscoverage['commons/eterator.js'][96]=0;
_$jscoverage['commons/eterator.js'][104]=0;
_$jscoverage['commons/eterator.js'][107]=0;
_$jscoverage['commons/eterator.js'][141]=0;
_$jscoverage['commons/eterator.js'][121]=0;
_$jscoverage['commons/eterator.js'][115]=0;
_$jscoverage['commons/eterator.js'][122]=0;
_$jscoverage['commons/eterator.js'][124]=0;
_$jscoverage['commons/eterator.js'][126]=0;
_$jscoverage['commons/eterator.js'][136]=0;
_$jscoverage['commons/eterator.js'][137]=0;
_$jscoverage['commons/eterator.js'][138]=0;
_$jscoverage['commons/eterator.js'][139]=0;
_$jscoverage['commons/eterator.js'][140]=0;
_$jscoverage['commons/eterator.js'][147]=0;
}/*jslint node: true */
_$jscoverage['commons/eterator.js'][2]++;
"use strict";
_$jscoverage['commons/eterator.js'][3]++;
(function() {
    _$jscoverage['commons/eterator.js'][4]++;
function Eterator (array) {
        _$jscoverage['commons/eterator.js'][5]++;
this.state      = null;
        _$jscoverage['commons/eterator.js'][6]++;
this.array      = array ? array.slice(0) : [];
        _$jscoverage['commons/eterator.js'][7]++;
this.processing = false;
    }

    _$jscoverage['commons/eterator.js'][10]++;
var proto = Eterator.prototype;

    _$jscoverage['commons/eterator.js'][12]++;
proto.start = function (index, endless, callback, complete) {
        _$jscoverage['commons/eterator.js'][13]++;
if (this.processing) {
            _$jscoverage['commons/eterator.js'][14]++;
return;
        }

        _$jscoverage['commons/eterator.js'][17]++;
this.processing = true;
        _$jscoverage['commons/eterator.js'][18]++;
this.state = _buildStateObj(index, endless, callback, complete);
        _$jscoverage['commons/eterator.js'][19]++;
if (0 < this.array.length) {
            _$jscoverage['commons/eterator.js'][20]++;
setImmediate(_iterate.bind(this, index < this.array.length ? index : 0, this.array, endless, callback, complete));
        }

        _$jscoverage['commons/eterator.js'][23]++;
return true;
    };

    _$jscoverage['commons/eterator.js'][26]++;
proto.stop = function () {
        _$jscoverage['commons/eterator.js'][27]++;
this.processing = false;
    };

    _$jscoverage['commons/eterator.js'][30]++;
proto.resume = function () {
        _$jscoverage['commons/eterator.js'][31]++;
if (!this.state) {
            _$jscoverage['commons/eterator.js'][32]++;
return false;
        }

        _$jscoverage['commons/eterator.js'][35]++;
return this.start(++this.state.index, this.state.endless, this.state.callback, this.state.complete);
    };

    _$jscoverage['commons/eterator.js'][38]++;
proto.getProperties = function () {
        _$jscoverage['commons/eterator.js'][39]++;
return {
            processing: this.processing,
            array: this.array.slice(0)
        };
    };

    _$jscoverage['commons/eterator.js'][45]++;
proto.removeItem = function (item) {
        _$jscoverage['commons/eterator.js'][46]++;
var index = this.array.indexOf(item);

        _$jscoverage['commons/eterator.js'][48]++;
if (index < this.array.length) {
            _$jscoverage['commons/eterator.js'][49]++;
this.stop();
            _$jscoverage['commons/eterator.js'][50]++;
this.array.splice(index, 1);
            _$jscoverage['commons/eterator.js'][51]++;
this.resume();
        }
    };

    _$jscoverage['commons/eterator.js'][55]++;
proto.addItem = function (item) {
        /*jshint validthis:true */
        _$jscoverage['commons/eterator.js'][57]++;
if (this.processing) {
            _$jscoverage['commons/eterator.js'][58]++;
this.stop();
            _$jscoverage['commons/eterator.js'][59]++;
this.array.push(item);
            _$jscoverage['commons/eterator.js'][60]++;
if (1 === this.array.length) {
                _$jscoverage['commons/eterator.js'][61]++;
this.start(0, this.state.endless, this.state.callback, this.state.complete);
            }
            else {
                _$jscoverage['commons/eterator.js'][64]++;
this.resume();
            }
        }
        else {
            _$jscoverage['commons/eterator.js'][68]++;
this.array.push(item);
        }
    };

    _$jscoverage['commons/eterator.js'][72]++;
proto.addItems = function (items) {

        _$jscoverage['commons/eterator.js'][74]++;
if (items.constructor === Array) {
            _$jscoverage['commons/eterator.js'][75]++;
if (this.processing) {
                _$jscoverage['commons/eterator.js'][76]++;
this.stop();
                _$jscoverage['commons/eterator.js'][77]++;
_addItems.call(this, items);
                _$jscoverage['commons/eterator.js'][78]++;
this.resume();

            }
            else {
                /*jshint validthis:true */
                _$jscoverage['commons/eterator.js'][83]++;
_addItems.call(this, items);
            }
        }
    };

    _$jscoverage['commons/eterator.js'][88]++;
function _addItems(items) {
        /*jshint validthis:true */
        _$jscoverage['commons/eterator.js'][90]++;
for (var i = 0; i < items.length; i++) {
            _$jscoverage['commons/eterator.js'][91]++;
this.addItem(items[i]);
        }
    }

    _$jscoverage['commons/eterator.js'][95]++;
function _buildStateObj(index, endless, callback, complete) {
        _$jscoverage['commons/eterator.js'][96]++;
return {
            index: index,
            endless: endless,
            callback: callback,
            complete: complete
        };
    }

    _$jscoverage['commons/eterator.js'][104]++;
function _invoker(index, array, endless, callback, complete) {

        /*jshint validthis:true */
        _$jscoverage['commons/eterator.js'][107]++;
if (this.processing) {
            _$jscoverage['commons/eterator.js'][108]++;
setImmediate(_iterate.bind(this, index, array, endless, callback, complete));
        }
    }

    _$jscoverage['commons/eterator.js'][112]++;
function _iterate (index, array, endless, callback, complete) {
        _$jscoverage['commons/eterator.js'][113]++;
if (isNaN(index) || 0 > parseInt(index, 10)) {
            _$jscoverage['commons/eterator.js'][114]++;
runCallBack(callback, null, new Error("Invalid Index"));
            _$jscoverage['commons/eterator.js'][115]++;
return;
        }

        /*jshint validthis:true */
        _$jscoverage['commons/eterator.js'][119]++;
this.state = _buildStateObj(index, endless, callback, complete);

        _$jscoverage['commons/eterator.js'][121]++;
if (index >= array.length) {
            _$jscoverage['commons/eterator.js'][122]++;
this.stop();
            _$jscoverage['commons/eterator.js'][123]++;
if (complete) {
                _$jscoverage['commons/eterator.js'][124]++;
runCallBack(complete);
            }
            _$jscoverage['commons/eterator.js'][126]++;
if (endless) {
                _$jscoverage['commons/eterator.js'][127]++;
setImmediate(this.start.bind(this, 0, endless, callback, complete));
            }
            _$jscoverage['commons/eterator.js'][129]++;
return;
        }

        _$jscoverage['commons/eterator.js'][132]++;
runCallBack(callback, array[index]);
        _$jscoverage['commons/eterator.js'][133]++;
_invoker.call(this, ++index, array, endless, callback, complete);
    }

    _$jscoverage['commons/eterator.js'][136]++;
function runCallBack(func, data, error) {
        _$jscoverage['commons/eterator.js'][137]++;
error = error || null;
        _$jscoverage['commons/eterator.js'][138]++;
data = data || null;
        _$jscoverage['commons/eterator.js'][139]++;
if (func && typeof func === 'function') {
            _$jscoverage['commons/eterator.js'][140]++;
try {
                _$jscoverage['commons/eterator.js'][141]++;
func(error, data);
            } catch (err) {
            }
        }
    }

    _$jscoverage['commons/eterator.js'][147]++;
module.exports = Eterator;
})();