var arrayReqs =
    [
            {
                name: "batch1",
                url: "https://mono",
                method: "POST",
                encoding: "UTF8",
                retries: 3,
                headers: {},
                doNotMergeHeaders: false,
                query: "/user1",
                mimeType: "application/json",
                body: "body",
                timeout: 10000
            },
            {
                name: "batch2",
                url: "http://localhost:7777/?id=1",
                method: "GET",
                encoding: "UTF8",
                retries: 3,
                headers: {},
                doNotMergeHeaders: false,
                query: "/user1",
                mimeType: "application/json",
                body: "body",
                timeout: 1
            },
            {
                name: "batch3",
                url: "http://localhost:7777/?id=2",
                method: "GET",
                encoding: "UTF8",
                retries: 3,
                headers: {},
                doNotMergeHeaders: false,
                query: "/user1",
                mimeType: "application/json",
                body: "body",
                timeout: 10000
            },
            {
                name: "batch4",
                url: "http://localhost:7777/?id=3",
                method: "POST",
                encoding: "UTF8",
                retries: 3,
                headers: {},
                doNotMergeHeaders: false,
                query: "/user1",
                mimeType: "application/json",
                body: "body",
                timeout: 10000
            },
            {
                name: "batch5",
                url: "http://localhost:7777/?id=4",
                method: "GET",
                encoding: "UTF8",
                retries: 3,
                headers: {},
                doNotMergeHeaders: false,
                query: "/user1",
                mimeType: "application/json",
                body: "body",
                timeout: 10000
            },
            {
                // missing METHOD
                name: "missing METHOD",
                url: "http://localhost:7777/?id=5",
                encoding: "UTF8",
                retries: 3,
                headers: {},
                doNotMergeHeaders: false,
                query: "/user1",
                mimeType: "application/json",
                body: "body",
                timeout: 10000
            }
    ];

//var reqSingle = [{
//    name: "single",
//    url: "https://jsonresponser.herokuapp.com/api/json/users",
////    method: "GET",
//    encoding: "UTF8",
//    retries: 3,
//    headers: {},
//    doNotMergeHeaders: false,
//    query: "/user1",
//    mimeType: "application/json",
//    body: "body",
//    timeout: 10000
//}]




//];

//var req = [
//        {
//            name: "batch1",
//            url: "https://mono",
//            method: "POST",
//            encoding: "UTF8",
//            retries: 3,
//            headers: {},
//            doNotMergeHeaders: false,
//            query: "/user1",
//            mimeType: "application/json",
//            body: "body",
//            timeout: 10000
//        },
//        {
//            name: "batch2",
//            url: "https://jsonresponser.herokuapp.com/api/json/user/1",
//            method: "GET",
//            encoding: "UTF8",
//            retries: 3,
//            headers: {},
//            doNotMergeHeaders: false,
//            query: "/user1",
//            mimeType: "application/json",
//            body: "body",
//            timeout: 1
//        },
//        {
//            name: "batch3",
//            url: "https://jsonresponser.herokuapp.com/api/json/user/2",
//            method: "GET",
//            encoding: "UTF8",
//            retries: 3,
//            headers: {},
//            doNotMergeHeaders: false,
//            query: "/user1",
//            mimeType: "application/json",
//            body: "body",
//            timeout: 10000
//        },
//        {
//            name: "batch4",
//            url: "https://jsonresponser.herokuapp.com/api/json/users",
//            method: "POST",
//            encoding: "UTF8",
//            retries: 3,
//            headers: {},
//            doNotMergeHeaders: false,
//            query: "/user1",
//            mimeType: "application/json",
//            body: "body",
//            timeout: 10000
//        },
//        {
//            name: "batch5",
//            url: "https://jsonresponser.herokuapp.com/api/json/user/1",
//            method: "GET",
//            encoding: "UTF8",
//            retries: 3,
//            headers: {},
//            doNotMergeHeaders: false,
//            query: "/user1",
//            mimeType: "application/json",
//            body: "body",
//            timeout: 10000
//        },
//        {
//            // missing METHOD
//            name: "missing METHOD",
//            url: "https://jsonresponser.herokuapp.com/api/json/user/2",
//            encoding: "UTF8",
//            retries: 3,
//            headers: {},
//            doNotMergeHeaders: false,
//            query: "/user1",
//            mimeType: "application/json",
//            body: "body",
//            timeout: 10000
//        }
//
//    ]
//    ;

var twoReqs = [
    {
        name: "REQ_1",
        url: "htp://www.kojo.com",
        encoding: "UTF8",
        method: "GET",
        retries: 3,
        headers: {},
        query: "/user1",
        mimeType: "application/json",
        body: "body",
        timeout: 10000
    },
    {
        name: "REQ_2",
        url: "https://jsonresponser.herokuapp.com/api/json/user/2",
        encoding: "UTF8",
        method: "GET",
        retries: 3,
        headers: {},
        query: "/user1",
        mimeType: "application/json",
        body: "body",
        timeout: 10000,
        persistent: true
    },
    {
        name: "REQ_3",
        url: "https://jsonresponser.herokuapp.com/api/json/users",
        encoding: "UTF8",
        method: "GET",
        retries: 3,
        headers: {},
        query: "/user1",
        mimeType: "application/json",
        body: "body",
        timeout: 10000,
        persistent: true
    }
];

var twoReqsPersistent = [
    {
        name: "REQ_4",
        url: "htp://www.kojo.com",
        encoding: "UTF8",
        method: "GET",
        retries: 3,
        headers: {},
        query: "/user1",
        mimeType: "application/json",
        body: "body",
        timeout: 10000
    },
    {
        name: "REQ_5",
        url: "http://localhost:3000/api/json/users",
//        url: "https://jsonresponser.herokuapp.com/api/json/user/2",
        encoding: "UTF8",
        method: "GET",
        retries: 3,
        headers: {},
        query: "/user1",
        mimeType: "application/json",
        body: "body",
        timeout: 10000,
        persistent: true
    },
    {
        name: "REQ_6",
        url: "https://jsonresponser.herokuapp.com/api/json/users",
        encoding: "UTF8",
        method: "GET",
        retries: 3,
        headers: {},
        query: "/user1",
        mimeType: "application/json",
        body: "body",
        timeout: 10000,
        persistent: true
    }
];

//
//var reqRepeat = [{
//    name: "single",
//    url: "http://localhost:7777/?id=1",
//    method: "GET",
//    encoding: "UTF8",
//    retries: 3,
//    headers: {},
//    doNotMergeHeaders: false,
//    query: "/user1",
//    mimeType: "application/json",
//    body: "body",
//    timeout: 10000
//}];


//var batch = require("persistentBatchelor").service;
//
//var adaptor = {
//    execute: function(requets, cb) {
//        if(requests[0].persist === true){
//            this.persist = {}
//        }
//    },
//    persist: function(requests, cb) {
//    }
//};



var config = require('./config/config.json');
config.logger = console;
// -------------------------------------------------------------------------------------------
//var batchelor = require('./batchelor');
//batchelor.configure(config);
// -------------------------------------------------------------------------------------------
var batchelor = require('./index').batchelor;
batchelor.configure(config);

var batchelorPersistent = require('./index').persistent;
batchelorPersistent.configure(config);
// -------------------------------------------------------------------------------------------

//var batchelorPersistent = require('./batchelor').Persistent;
//
//var jobId = batchelor.execute(req, function (err, results) {
////    console.log("Last Callback: "+ results);
//    console.log("---->>>>Last Callback1111: "+ JSON.stringify(results));
//});

//function repeat () {
//    var jobId2 = batchelor.execute(reqSingle, function (err, results) {
////    console.log("Last Callback: "+ results);
//        console.log("CallbackSingle Response: "+ JSON.stringify(results));
//    });
//}


//var jobId2 = batchelor.execute(twoReqs, function (err, results) {
////    console.log("Last Callback: "+ results);
//    console.log("\nCallbackSingle Response: "+ JSON.stringify(results) + "\n");
//});var jobId2 = batchelor.execute(twoReqs, function (err, results) {
////    console.log("Last Callback: "+ results);
//    console.log("\nCallbackSingle Response: "+ JSON.stringify(results) + "\n");
//});

var persistentJobId = batchelorPersistent.execute(twoReqsPersistent, function (err, results) {
//    console.log("Last Callback: "+ results);
    console.log("\nCallbackSingle Response_PERSISTENT: "+ JSON.stringify(results) + "\n");
});

console.log("--->>>>>>>>>>>>persistentJobId: " + persistentJobId);


setTimeout(function () {
    console.log("STOPPING QUEUE")
    batchelorPersistent.stop(persistentJobId);
}, 10000)

//setInterval(function () {
//    repeat();
//}, 5000);

//console.log("JOBID1: " + jobId);
//console.log("JOBID2: " + jobId2);

