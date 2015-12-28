function bind(object) {
    /*jshint validthis:true */
    var args;
    var fn;

    if ("function" !== typeof this) {
        // Closest thing possible to the ECMAScript 5
        // Internal IsCallable function
        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    args = Array.prototype.slice.call(arguments, 1);
    fn = this;

    function Empty() {}

    function bound() {
        return fn.apply(this instanceof Empty && object ? this : object,
            args.concat(Array.prototype.slice.call(arguments)));
    }

    Empty.prototype = this.prototype;
    bound.prototype = new Empty();

    return bound;
}

if (!Function.prototype.bind) {
    Function.prototype.bind = bind;
}
