if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['media/index.js'] === 'undefined'){_$jscoverage['media/index.js']=[];
_$jscoverage['media/index.js'].source=['/*jslint node: true */',
'\'use strict\';',
'var util        = require("util")',
'    , events    = require("events");',
'',
'(function () {',
'    function Media () {',
'        this.util   = util;',
'        this.events = events;',
'        events.EventEmitter.call(this);',
'    }',
'',
'    var proto = Media.prototype;',
'',
'    proto.emit = function (event, data) {',
'        this.emit(event, data);',
'    };',
'',
'    util.inherits(Media, events.EventEmitter);',
'    module.exports = new Media();',
'})();',
'',
'',
'//var stream = new MyStream();',
'//',
'//console.log(stream instanceof events.EventEmitter); // true',
'//console.log(MyStream.super_ === events.EventEmitter); // true',
'//',
'//stream.on("data", function(data) {',
'//    console.log(\'Received data: "\' + data + \'"\');',
'//})',
'//stream.write("It works!"); // Received data: "It works!"'];
_$jscoverage['media/index.js'][13]=0;
_$jscoverage['media/index.js'][2]=0;
_$jscoverage['media/index.js'][3]=0;
_$jscoverage['media/index.js'][6]=0;
_$jscoverage['media/index.js'][7]=0;
_$jscoverage['media/index.js'][8]=0;
_$jscoverage['media/index.js'][9]=0;
_$jscoverage['media/index.js'][10]=0;
_$jscoverage['media/index.js'][15]=0;
_$jscoverage['media/index.js'][16]=0;
_$jscoverage['media/index.js'][19]=0;
_$jscoverage['media/index.js'][20]=0;
}/*jslint node: true */
_$jscoverage['media/index.js'][2]++;
'use strict';
_$jscoverage['media/index.js'][3]++;
var util        = require("util")
    , events    = require("events");

_$jscoverage['media/index.js'][6]++;
(function () {
    _$jscoverage['media/index.js'][7]++;
function Media () {
        _$jscoverage['media/index.js'][8]++;
this.util   = util;
        _$jscoverage['media/index.js'][9]++;
this.events = events;
        _$jscoverage['media/index.js'][10]++;
events.EventEmitter.call(this);
    }

    _$jscoverage['media/index.js'][13]++;
var proto = Media.prototype;

    _$jscoverage['media/index.js'][15]++;
proto.emit = function (event, data) {
        _$jscoverage['media/index.js'][16]++;
this.emit(event, data);
    };

    _$jscoverage['media/index.js'][19]++;
util.inherits(Media, events.EventEmitter);
    _$jscoverage['media/index.js'][20]++;
module.exports = new Media();
})();


//var stream = new MyStream();
//
//console.log(stream instanceof events.EventEmitter); // true
//console.log(MyStream.super_ === events.EventEmitter); // true
//
//stream.on("data", function(data) {
//    console.log('Received data: "' + data + '"');
//})
//stream.write("It works!"); // Received data: "It works!"