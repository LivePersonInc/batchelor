/**
 * Created with IntelliJ IDEA.
 * User: omerh
 * Date: 11/18/14
 * Time: 14:17
 * To change this template use File | Settings | File Templates.
 */
var util = require('./util');
var config;
var CONST = require('./const');

var RESPONSE_TYPE = {
    INVALID_TASK: {
        body: CONST.BODY_RESPONSE.INVALID_TASK,
        statusCode: CONST.HTTP_STATUS.BAD_REQUEST
    }
};

exports.configure = function (cfg) {
    config = util.configure(cfg);
};


exports.buildResponse = function (type) {
    return RESPONSE_TYPE[type];
};