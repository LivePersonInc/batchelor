//var persistentJob = [
//    {
//        name: "req_with_callback_10000",
//        url: "http://localhost:3000/api/json/user/1",
////        url: "https://jsonresponser.herokuapp.com/api/json/users",
//        method: "GET",
//        headers: {},
//        body: "body",
//        timeout: 10000,
//        persistent: true,
//        persistentDelay: 5000,
//        alwaysPersistent: true,
//        callback: function (err, result) {
////            ws.send(result)
//            console.error("\nreq_with_callback_10000 err: " + err + " result: " + JSON.stringify(result));
//        }
//    },
//    {
//        name: "req_with_callback_5000",
//        url: "https://jsonresponser.herokuapp.com/api/json/user/1",
//        method: "GET",
//        headers: {},
//        body: "body",
//        timeout: 10000,
//        persistent: true,
//        persistentDelay: 10000,
//        callback: function (err, result) {
//            console.error("\nreq_with_callback_5000 req_with_callback_1000 err: " + err + " result: " + JSON.stringify(result));
//        }
//    },
//    {
//        name: "req_no_callback_15000",
//        url: "https://jsonresponser.herokuapp.com/api/json/user/2",
//        method: "GET",
//        headers: {},
//        body: "body",
//        timeout: 10000,
//        persistent: true,
//        persistentDelay: 15000,
//        callback: function (err, result) {
//            console.log("\nreq_no_callback_15000 err: " + err + " result: " + JSON.stringify(result));
//        }
//    },
//    {
//        name: "req_not_valid",
//        url: "https://jsonresponser.herokuapp.com/api/json/users",
//        method: "GET",
//        headers: {},
//        body: "body",
//        timeout: 10000,
//        persistentDelay: 5000
//    }
//];

var utils     = require("./utils")
    , request = require("request")
//    , winston = require('winston')
    , memory_logger = require('memory-usage-logger');


memory_logger.run(1000, "./memoryResults");

var memwatch = require('memwatch');
memwatch.on('leak', function(info) {
    console.log(JSON.stringify(info));
});

//var logger = new (winston.Logger)({
//    transports: [
//        new (winston.transports.File)({ filename: './memoryResults.log' })
//    ]
//});

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
var batchelor = require('./batchelor');
batchelor.configure(config);
//batchelor.persistent.configure(config);

var cnt = 0
    , forever = true

delayReq();

function delayReq() {
    issueReq();
    cnt= cnt+3;
    if (forever || cnt<100000) {
        setTimeout(delayReq, 3);
    }
    else {
        setTimeout(function() {
            console.dir(utils.jobHolder.getActiveJobs());
            console.dir(utils.jobHolder.getAllJobs());
        }, 1000);
    }
    var di = cnt/900;
    if ( parseInt(di) == di) {
        console.dir(utils.jobHolder.getActiveJobs());
        console.log(cnt);
//        if (cnt >= 100000) {
////            memory_logger.stop();
////            memory_logger.run(1000, "./memoryResults");
//        }
    }
}

function issueReq() {
    var options = {
        url: "http://localhost:7777?id=1",
        headers: {},
        method: "GET",
        timeout: 10000,
        pool : {
            maxSockets : 200
        }
    };
//    request(options, function(error, response, body) {
//    });
    var persistentJobId = batchelor.execute(
        [
            {
                name: "req_with_callback_0000_persistent",
                url: "http://localhost:7777?id=1",
                method: "GET",
                headers: {},
                timeout: 10000
            },
            {
                name: "req_with_callback_10000_persistent",
                url: "http://localhost:7777?id=2",
                method: "GET",
                headers: {},
                timeout: 10000,
                callback: function (err, result) {
                    //console.log("1. req_with_callback_10000_persistent: " + JSON.stringify(result));
                }
            },
            {
                name: "req_with_callback_5000_persistent",
                url: "http://localhost:7777?id=3",
                method: "GET",
                headers: {},
                timeout: 10000,
                callback: function (err, result) {
                    //console.log("2. req_with_callback_5000_persistent: " + JSON.stringify(result));
                }
            }], function (err, result) {
            //console.log("\n3. CALLBACK GENERAL BATCHELOR PERSISTENT: " + JSON.stringify(result));
    });
}
//var persistentJobId2 = batchelor.persistent.execute(
//    [
//        {
//            name: "req_with_callback_500000_persistent",
//            url: "https://jsonresponser.herokuapp.com/api/json/user/1",
//            method: "POST",
//            headers: {},
//            body: "body",
//            timeout: 10000,
//            isPersistentRequest: true,
//            persistentDelay: 5000,
//            ignoreResponse: true,
//            callback: function (err, result) {
//                console.log("4. req_with_callback_500000_persistent: " + JSON.stringify(result));
//            }
//        }], function (err, result) {
//        console.log("\n5.CALLBACK GENERAL BATCHELOR PERSISTENT: " + JSON.stringify(result));
//    });


// -------------------------------------------------------------------------------------------
//var batchelorPersistent = require('./index').persistent;
//batchelorPersistent.configure(config);
// -------------------------------------------------------------------------------------------


//var persistentJobId = batchelorPersistent.execute(persistentJob,
//    function (err, results) {
//        console.error("\n**********************RESULT**********************");
//        console.error("\nCallbackSingle Response_PERSISTENT: "+ JSON.stringify(results));
//        console.error("\n**********************END RESULT*******************");
//    }
//);


//var batchelorIDJob = batchelor.execute(
//    [
//        {
//            name: "req_with_callback_0000",
//            url: "https://jsonresponser.herokuapp.com/api/json/user/1",
//            method: "GET",
//            headers: {},
//            body: "body",
//            timeout: 10000
//        },
//        {
//            name: "req_with_callback_10000",
//            url: "https://jsonresponser.herokuapp.com/api/json/user/2",
//            method: "GET",
//            headers: {},
//            body: "body",
//            timeout: 10000,
//            persistent: true,
//            persistentDelay: 10000,
//            ignoreResponse: true,
//            callback: function (err, result) {
//                console.log(JSON.stringify(result));
//            }
//        },
//        {
//            name: "req_with_callback_5000",
//            url: "https://jsonresponser.herokuapp.com/api/json/user/3",
//            method: "POST",
//            headers: {},
//            body: "body",
//            timeout: 10000,
//            persistent: true,
//            persistentDelay: 5000,
//            callback: function (err, result) {
//                console.log(JSON.stringify(result));
//            }
//}], function (err, result) {
//        console.log("\nCALLBACK GENERAL BATCHELOR: " + JSON.stringify(result));
//    });
//
//
//console.error("\n***************PERSITENT JOB MAP****************");
//console.error("\nPERSITENT JOB ID BATCHELOR:  " + batchelorIDJob);
//console.error("\nPERSITENT JOB ID PERSISTENT: " + persistentJobId);
//console.error("\n***************END PERSITENT JOB MAP************");


//setTimeout(function () {
//    console.log("*********************STOPPING QUEUE*******************")
////    batchelorPersistent.stop(per fstsistentJobMap["req_with_callback_1000"]);
//    batchelor.persistent.stop(persistentJobId, "req_with_callback_5000_persistent");
//    console.log("*********************END STOPPING QUEUE***************")
//}, 10000);