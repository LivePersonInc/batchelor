'use strict';
var utils = {
    jobHolder : require("./jobHolder"),
    validator : require("./validator"),
    builder   : require("./builder")
};
exports.configure = function (cfg) {
    for (var cur in utils) {
        if (typeof utils[cur].configure === "function") {
            utils[cur].configure(cfg);
        }
        exports[cur]  = utils[cur];
    }
};