/*jslint node: true */
"use strict";
(function() {
    function Eterator (array) {
        this.state          = null;
        this.array          = array ? array.slice(0) : [];
        this.processing     = false;
        this.useImmediate   = true;
    }

    var proto = Eterator.prototype;

    proto.start = function (index, endless, callback, complete, useImmediate) {

        this.useImmediate = useImmediate || true;

        if (this.processing) {
            return;
        }

        this.processing = true;
        this.state = _buildStateObj(index, endless, callback, complete);
        if (0 < this.array.length) {
            this._setImmediate(_iterate, index < this.array.length ? index : 0, this.array, endless, callback, complete);
        }

        return true;
    };

    proto.stop = function () {
        this.processing = false;
    };

    proto.resume = function () {
        if (!this.state) {
            return false;
        }

        return this.start(++this.state.index, this.state.endless, this.state.callback, this.state.complete);
    };

    proto.getProperties = function () {
        return {
            processing: this.processing,
            array: this.array.slice(0)
        };
    };

    proto.removeItem = function (item) {
        var index = this.array.indexOf(item);

        if (index < this.array.length) {
            this.stop();
            this.array.splice(index, 1);
            this.resume();
        }
    };

    proto.addItem = function (item) {
        /*jshint validthis:true */
        if (this.processing) {
            this.stop();
            this.array.push(item);
            if (1 === this.array.length) {
                this.start(0, this.state.endless, this.state.callback, this.state.complete);
            }
            else {
                this.resume();
            }
        }
        else {
            this.array.push(item);
        }
    };

    proto.addItems = function (items) {

        if (items.constructor === Array) {
            if (this.processing) {
                this.stop();
                _addItems.call(this, items);
                this.resume();

            }
            else {
                /*jshint validthis:true */
                _addItems.call(this, items);
            }
        }
    };

    proto._setImmediate = function (func, index, array, endless, callback, complete) {

        if (this.useImmediate) {
            setImmediate(func.bind(this, index, array, endless, callback, complete));
        }
        else {
            setTimeout(function () {
                func.bind(this, index, array, endless, callback, complete);
            }.bind(this), 0);
        }

    };

    function _addItems(items) {
        /*jshint validthis:true */
        for (var i = 0; i < items.length; i++) {
            this.addItem(items[i]);
        }
    }

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
        if (this.processing) {
            this._setImmediate(_iterate, index, array, endless, callback, complete);
        }
    }

    function _iterate (index, array, endless, callback, complete) {
        if (isNaN(index) || 0 > parseInt(index, 10)) {
            runCallBack(callback, null, new Error("Invalid Index"));
            return;
        }

        /*jshint validthis:true */
        this.state = _buildStateObj(index, endless, callback, complete);

        if (index >= array.length) {
            this.stop();
            if (complete) {
                runCallBack(complete);
            }
            if (endless) {
                this._setImmediate(this.start, 0, endless, callback, complete);
            }
            return;
        }

        runCallBack(callback, array[index]);
        _invoker.call(this, ++index, array, endless, callback, complete);
    }

    function runCallBack(func, data, error) {
        error = error || null;
        data = data || null;
        if (func && typeof func === 'function') {
            try {
                func(error, data);
            } catch (err) {
            }
        }
    }

    module.exports = Eterator;
})();
