"use strict";

var _ = require("lodash");
var defaults = require("./../../config/defaults.json");
var config = _.cloneDeep(defaults);

function getConf() {
    return config;
}

function setConf(cfg) {
    _.merge(config, cfg || {});
}

module.exports = {
    getConf: getConf,
    setConf: setConf
};
