//var job ={
//    jobId: "",
//    isPers: true,
//    reqs: []  or {}
//};

var persistentJob = [
    {
        name: "req_with_callback_10000",
        url: "http://localhost:3000/api/json/user/1",
//        url: "https://jsonresponser.herokuapp.com/api/json/users",
        method: "GET",
        headers: {},
        body: "body",
        timeout: 10000,
        persistent: true,
        persistentDelay: 5000,
        alwaysPersistent: true,
        callback: function (err, result) {
//            ws.send(result)
            console.error("\nreq_with_callback_10000 err: " + err + " result: " + JSON.stringify(result));
        }
    },
    {
        name: "req_with_callback_5000",
        url: "https://jsonresponser.herokuapp.com/api/json/user/1",
        method: "GET",
        headers: {},
        body: "body",
        timeout: 10000,
        persistent: true,
        persistentDelay: 5000,
        callback: function (err, result) {
            console.error("\nreq_with_callback_5000 req_with_callback_1000 err: " + err + " result: " + JSON.stringify(result));
        }
    },
    {
        name: "req_no_callback_15000",
        url: "https://jsonresponser.herokuapp.com/api/json/user/2",
        method: "GET",
        headers: {},
        body: "body",
        timeout: 10000,
        persistent: true,
        persistentDelay: 5000,
        callback: function (err, result) {
            console.log("\nreq_no_callback_15000 err: " + err + " result: " + JSON.stringify(result));
        }
    },
    {
        name: "req_not_valid",
        url: "https://jsonresponser.herokuapp.com/api/json/users",
        method: "GET",
        headers: {},
        body: "body",
        timeout: 10000,
        persistentDelay: 5000
    }
];

var localLogger =  {
    debug: function () {
    },
    info: function () {
    },
    warn: function () {
    },
    error: function () {
    }
};
var config = require('./config/config.json');
config.logger = localLogger;
//config.logger = console;

// -------------------------------------------------------------------------------------------
//var batchelor = require('./index').batchelor;
//batchelor.configure(config);
// -------------------------------------------------------------------------------------------
var batchelorPersistent = require('./index').persistent;
batchelorPersistent.configure(config);
// -------------------------------------------------------------------------------------------


//var persistentJobId = batchelorPersistent.execute(persistentJob,
//    function (err, results) {
//        console.error("\n**********************RESULT**********************");
//        console.error("\nCallbackSingle Response_PERSISTENT: "+ JSON.stringify(results));
//        console.error("\n**********************END RESULT*******************");
//    }
//);


var persistentJobId = batchelorPersistent.execute(
    [
        {
            name: "req_with_callback_0000",
            url: "https://jsonresponser.herokuapp.com/api/json/user/1",
            method: "GET",
            headers: {},
            body: "body",
            timeout: 10000
        },
    {
        name: "req_with_callback_10000",
        url: "https://jsonresponser.herokuapp.com/api/json/user/1",
        method: "GET",
        headers: {},
        body: "body",
        timeout: 10000,
        persistent: true,
        persistentDelay: 10000,
        ignoreResponse: true,
        callback: function (err, result) {
            console.log(JSON.stringify(result));
        }
    },
        {
            name: "req_with_callback_5000",
            url: "https://jsonresponser.herokuapp.com/api/json/user/1",
            method: "GET",
            headers: {},
            body: "body",
            timeout: 10000,
            persistent: true,
            persistentDelay: 5000,
            callback: function (err, result) {
                console.log(JSON.stringify(result));
            }
}], function (err, result) {
        console.log("\nCALLBACK GENERAL" + JSON.stringify(result));
//                    result["INVALID_TASK"].body.should.equal(utils.builder.buildResponse(commons.CONST.RESPONSE_TYPE.INVALID_TASK).body);
    });


console.error("\n***************PERSITENT JOB MAP****************");
console.error("\nPERSITENT JOB MAP: " + JSON.stringify(persistentJobId));
console.error("\n***************END PERSITENT JOB MAP************");


setTimeout(function () {
    console.log("*********************STOPPING QUEUE*******************")
//    batchelorPersistent.stop(persistentJobMap["req_with_callback_1000"]);
    batchelorPersistent.stop(persistentJobId, "req_with_callback_5000");
    console.log("*********************END STOPPING QUEUE***************")
}, 10000);



/**
 * WORKING !!!!!!!!
 */
//var runner = require("./commons/runner");
//function _polling (arr) {
//
//    var Runner = new runner(arr);
//
//    function process(err, item) {
//        console.log("Date: " + Date.now() + " item: " + item);
//    }
//
//    function restart() {
//        console.log("restart");
//
//        setImmediate(Runner.start(0, false, process, function () {
//            console.log("Complete");
//            setTimeout(function () {restart();}, 0);
//        }));
//
//        return;
//    }
//
//    restart();
//    return;
//}
//_polling([1,2, 3, 4, 5]);
/**
 * WORKING !!!!!!!!
 */

