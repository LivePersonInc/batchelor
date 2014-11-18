/**
 * Created with IntelliJ IDEA.
 * User: omerh
 * Date: 11/18/14
 * Time: 10:18
 * To change this template use File | Settings | File Templates.
 */
var req = [
        {
            name: "batch1",
            url: "https://jsonresponser.herokuapp.com/api/json/users",
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
            url: "https://jsonresponser.herokuapp.com/api/json/user/1",
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
            name: "batch3",
            url: "https://jsonresponser.herokuapp.com/api/json/user/2",
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
            url: "https://jsonresponser.herokuapp.com/api/json/users",
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
            url: "https://jsonresponser.herokuapp.com/api/json/user/1",
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
            name: "batch6",
            url: "https://jsonresponser.herokuapp.com/api/json/user/2",
            method: "GET",
            encoding: "UTF8",
            retries: 3,
            headers: {},
            doNotMergeHeaders: false,
            query: "/user1",
            mimeType: "application/json",
            body: "body",
            timeout: 10000
        }

    ]
    ;

var reqSingle = [{
//    name: "single",
    url: "https://jsonresponser.herokuapp.com/api/json/users",
    method: "GET",
    encoding: "UTF8",
    retries: 3,
    headers: {},
    doNotMergeHeaders: false,
    query: "/user1",
    mimeType: "application/json",
    body: "body",
    timeout: 10000
}];

var config = require('./config/config.json');
config.logger = console;
var batchelor = require('./batchelor');
batchelor.configure(config);

//var jobId = batchelor.process(req, function (err, results) {
////    console.log("Last Callback: "+ results);
//    console.log("---->>>>Last Callback1111: "+ JSON.stringify(results));
//});

var jobId2 = batchelor.process(reqSingle, function (err, results) {
//    console.log("Last Callback: "+ results);
    console.log("CallbackSingle Response: "+ JSON.stringify(results));
});

//console.log("JOBID1: " + jobId);
//console.log("JOBID2: " + jobId2);

