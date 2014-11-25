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

var reqSingle =
{
    name: "INVALID_TASK",
    url: "htp://www.kojo.com",
    encoding: "UTF8",
    method: "GET",
    retries: 3,
    headers: {},
    doNotMergeHeaders: false,
    query: "/user1",
    mimeType: "application/json",
    body: "body",
    timeout: 10000
};

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



var config = require('./config/config.json');
config.logger = console;
var batchelor = require('./batchelor');
batchelor.configure(config);
//
//var jobId = batchelor.execute(req, function (err, results) {
////    console.log("Last Callback: "+ results);
//    console.log("---->>>>Last Callback1111: "+ JSON.stringify(results));
//});

function repeat () {
    var jobId2 = batchelor.execute(reqSingle, function (err, results) {
//    console.log("Last Callback: "+ results);
        console.log("CallbackSingle Response: "+ JSON.stringify(results));
    });
}


var jobId2 = batchelor.execute(reqSingle, function (err, results) {
//    console.log("Last Callback: "+ results);
    console.log("CallbackSingle Response: "+ JSON.stringify(results));
});

setInterval(function () {
    repeat();
}, 5000);

//console.log("JOBID1: " + jobId);
//console.log("JOBID2: " + jobId2);

