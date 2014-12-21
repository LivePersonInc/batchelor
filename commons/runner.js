/*jslint node: true */
"use strict";
(function() {
    function Runner (array) {
        this.array      = array;
        this.processing = false;
        this.state      = {};
    }

    var proto = Runner.prototype;

    proto.start = function (index, endless, callback, complete) {
        this.processing = true;
        setImmediate(_iterate.call(this, index < this.array.length ? index : 0, this.array, endless, callback, complete));
    };

    proto.stop = function () {
        this.processing = false;
    };

    proto.resume = function () {
        this.processing = true;
        this.start(this.state.index, this.state.endless, this.state.callback, this.state.complete);
    };

    proto.getProperties = function () {
        return {
            processing: this.processing,
            array: this.array
        };
    };

    proto.removeItem = function (index) {
        if (index < this.array.length) {
            this.stop();
            this.array.splice(index, 1);
        }
    };

    function _buildStateObj(index, endless, callback, complete) {
        return {
            index: index,
            endless: endless,
            callback: callback,
            complete: complete
        };
    }

    function _invoker(index, array, endless, callback, complete) {

        /*jshint validthis:true */
        this.state = _buildStateObj(index, endless, callback, complete);

        if (this.processing) {
            setImmediate(_iterate.call(this, index, array, endless, callback, complete));
            return;
        }
//        else if (complete) {
//            complete();
//            return;
//        }
    }

    function _iterate (index, array, endless, callback, complete) {

        /*jshint validthis:true */
        if (isNaN(index) || 0 > parseInt(index, 10)) {
            callback(new Error("Invalid Index"), null);
            return;
        }

        if (index >= array.length) {
            if (endless) {
                _invoker.call(this, 0, array, endless, callback, complete);
            }
            else if (complete) {
                complete();
            }
            return;
        }

        callback(null, array[index]);

        _invoker.call(this, ++index, array, endless, callback, complete);
        return;
    }

    module.exports = Runner;
})();