
var utils     = require("./utils")
    , request = require("request")
    , memory_logger = require('memory-usage-logger');


// every 10 minute
//memory_logger.run(60000, "./memoryResults");
memory_logger.run(600000, "./memoryResults");

var memwatch = require('memwatch');
memwatch.on('leak', function(info) {
    console.log(JSON.stringify(info));
});

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

// -------------------------------------------------------------------------------------------
var batchelor = require('./batchelor');
batchelor.persistent.configure(config);

var cnt = 0
    , forever = true

delayReq();

function delayReq() {
    issueReq();
    cnt= cnt+3;
    if (forever || cnt<100000) {
        setTimeout(delayReq, 1000);
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
        // if (cnt >= 10000) {
        //     memory_logger.stop();
        // }
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

    var persistentJobId = batchelor.persistent.execute(
        [
            {
                name: "req_with_callback_0000_persistent",
                url: "http://127.0.0.1:7777?id=1",
                method: "GET",
                headers: {},
                timeout: 10000
            },
            {
                name: "req_with_callback_10000_persistent",
                url: "http://127.0.0.1:7777?id=2",
                method: "GET",
                headers: {},
                timeout: 10000,
                callback: function (err, result) {
                    //console.log("1. req_with_callback_10000_persistent: " + JSON.stringify(result));
                }
            },
            {
                name: "req_with_callback_5000_persistent",
                url: "http://127.0.0.1:7777?id=3",
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


process.on('SIGTERM', function () {
    memory_logger.stop();
    process.exit(0);
});
