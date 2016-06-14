
![Alt text](/img/batchelorJS.logo.jpg)

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![Build Status](https://travis-ci.org/LivePersonInc/batchelor.svg)](https://travis-ci.org/LivePersonInc/batchelor)
[![Test Coverage](https://codeclimate.com/github/LivePersonInc/batchelor/badges/coverage.svg)](https://codeclimate.com/github/LivePersonInc/batchelor/coverage)
[![Code Climate](https://codeclimate.com/github/LivePersonInc/batchelor/badges/gpa.svg)](https://codeclimate.com/github/LivePersonInc/batchelor)
[![npm version](https://badge.fury.io/js/batchelorjs.svg)](http://badge.fury.io/js/batchelorjs)
[![Dependency Status](https://david-dm.org/LivePersonInc/batchelor.svg?theme=shields.io)](https://david-dm.org/LivePersonInc/batchelor)
[![devDependency Status](https://david-dm.org/LivePersonInc/batchelor/dev-status.svg?theme=shields.io)](https://david-dm.org/LivePersonInc/batchelor#info=devDependencies)
[![npm downloads](https://img.shields.io/npm/dm/batchelorjs.svg)](https://img.shields.io/npm/dm/batchelorjs.svg)
[![NPM](https://nodei.co/npm/batchelorjs.png)](https://nodei.co/npm/batchelorjs/)

Proxy utility to bundle a batch of calls in one request.
Using the batchelor utility reduces HTTP overhead, network round-trip delay time and helps to keep your API design clean.


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Features](#features)
- [Installation](#installation)
- [API](#api)
  - [`configure(options)`](#configureoptions)
    - [options example:](#options-example)
  - [`execute(batch, callback)`](#executebatch-callback)
    - [batch](#batch)
      - [Batch with single request](#batch-with-single-request)
      - [Batch with array of requests](#batch-with-array-of-requests)
      - [request](#request)
  - [`stop(options)`](#stopoptions)
  - [`Events`](#events)
- [Examples](#examples)
  - [REST using ExpressJS Version 4.5.x](#rest-using-expressjs-version-45x)
  - [WebSocket - Server](#websocket---server)
  - [Request - WebSocket Client - sending 3 types of request regular, persisten, onclose](#request---websocket-client---sending-3-types-of-request-regular-persisten-onclose)
  - [Response from previous request](#response-from-previous-request)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


# Features

* Server side parallel request processing.
* Persistent request for Web Socket facade.


# Installation

    npm install batchelorjs --save


# API

* [`configure(options)`](#configureoptions)
* [`execute(batch, callback)`](#executebatch-callback)
* [`stop(options)`](#stopoptions)
* [`Events`](#events)


## `configure(options)`

configure the batchelor object.

* log - a logger object containing debug,info and error function (default: empty logger).
* transport - a transport object implementing issueCalls function (default: internal transport using async and request).
* maxConcurrentBatches - maximum concurrent batch requests (default:50)
* whiteList - an array containing a list of allowed hosts for processing the request (default: *, meaning allow all host/urls).
* request - Object containing the default values per request

### options example:
```
{
    maxConcurrentBatches: 100,
    logger: console,
    request: {
        "method": "GET",
        "timeout": 10000,
        "ip": "unknown",
        "headers": {},
        "strictSSL" : true,
        "pool": {
            "maxSockets": 200
        }
    }
    whiteList: ["*"]
}
```

## `execute(batch, callback)`

* `batch` - A single request object or array of single requests [required]
* `callback(err, results)` - callback function when finish processing batch [required]
- The callback argument gets 2 arguments:
- `err` - error object, if an error occur, null otherwise
- `results` - an JSON object containing the result/s of the batch


### batch

An object holding a single or array of requests, to be batch in the request

#### Batch with single request
```
{
	"name": "REQUEST_1",
	"method": "GET",
	"url": "jsonresponser.herokuapp.com/api/json/users",
	"timeout": 1000
}
```

#### Batch with array of requests
```
[
	{
		"name": "REQUEST_1",
		"method": "GET",
		"url": "jsonresponser.herokuapp.com/api/json/users",
		"timeout": 1000
	}
	, 
	{
		"name": "REQUEST_2",
		"method": "POST",
		"url": "jsonresponser.herokuapp.com/api/json/users",
		"timeout": 1000
	}
]
```


#### request

An object representing a single batch of request. The request must have the following

* `name` - identifier of the item, the name is used as reference. Names must be UNIQUE! [required]
* `url` - URL that calls the item. Possible GET parameters are also given here [required]
* `method` - possible values are `GET` or `POST` or whatever methods the called API supports [required]
* `encoding` - the encoding of the item (default:UTF8) [optional]
* `retries` - number of retries if the timeout is reach (default:2) [optional]
* `headers` - the headers that the item uses [optional]
* `body || data` - the parameters that the item uses when the method is POST are given here [optional]
* `timeout` - number of milliseconds to wait for a request from the API to respond before aborting the request, if this parameters is not provided we use timeout from the config.json file [optional]
* `isOnCloseRequest` - flag indicating if the item should be called when the connection is droped, used when using web socket facade (default:false) [optional]
* `persistent` - flag indicating if the item should be called in persistent way, used when using web socket facade(default:false) [optional]
* `persistentDelay` - number of delay between persistent items in milliseconds, used when using web socket facade (default:5000) [optional]


## `stop(options)`

* `options` - an object containing the ids to be stopped, the ids provided on persistent requests [required]
```
options = {
    ids: ["id1", "id2"] || "id1"
}
```
returns an array of the requests stopped (empty if not found).


## `Events`

EventEmitter API - will emit the following events:
- `processing` with batchId data 
- `complete` with batchId data 
- `persistent_processed` with uniqueId data 
- `persistent_stopped` with uniqueId data 


# Examples

## REST using ExpressJS Version 4.5.x

```
var exp_app = express();
var compression = require('compression');
var bodyParser = require('body-parser');
var exp_router = express.Router();
exp_app.use(compression());
exp_app.use(bodyParser());
var batchelor = require('batchelorjs');
var configuration = {
    "maxConcurrentBatches": 100,
    "logger": console,
    "request": {
        "method": "GET",
        "timeout": 10000,
        "ip": "unknown",
        "headers": {},
        "data": ""
    },
    "whiteList": ["*"]
};


batchelor.configure(configuration);
exp_router.post("/", function (req, res, next) {
    batchelor.execute(req.body, function (err, results) {
        if (err) {
            console.log("Error occur");
        }
        else {
            res.send(JSON.stringify(results));
        }
    });
});

exp_app.use("/", exp_router);
exp_app.listen(5050);
```

## WebSocket - Server

```
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 5050});
var batchelor = require('batchelorjs');
var configuration = {
    "maxConcurrentBatches": 100,
    "logger": console,
    "request": {
        "method": "GET",
        "timeout": 10000,
        "ip": "unknown",
        "headers": {},
        "data": ""
    },
    "whiteList": ["*"]
};

batchelor.persistent.configure(configuration);
ws.on("message", function (data) {
    batchelor.persistent.execute(data,
        function (err, results) {
            ws.send(JSON.stringify(results));
        });
});
```

## Request - WebSocket Client - sending 3 types of request regular, persisten, onclose

* The following requests example, will send the 3 requests
* batchelor will process the 3 request and will return the response when:
* regular request - its returned from given URL
* persistent requests - every `persistentDelay` milliseconds, if there is a cahnge in the response
* onClose request - once the connection is dropped from client 

```
var batch = [
	{
        name: "regular_request",
        url: "jsonresponser.herokuapp.com/api/json/users"
        method: "GET",
        timeout: 5000, 
    },
    {
        name: "persistent_request",
        url: "jsonresponser.herokuapp.com/api/json/users"
        method: "GET",
        timeout: 5000, 
        persistent: true
        persistentDelay: 5000
    },
    {
        name: "onclose_request",
        url: "https://www.domain.com/item/2"
        method: "POST",
        retries: 5,
        timeout: 5000,
        isOnCloseRequest: true
    }
];
var ws = new WebSocket("wss://yourdomain/path");
ws.onopen = function (ws) {
    document.getElementById("connectionStatus").innerHTML = "Connected";
    ws.send(JSON.stringify(batch));
};
ws.onmessage = function (event) {
    document.getElementById("responseFromServer").value = event.data;
};
```

## Response from previous request

```
    {
        regular_request:{
            data: {name: "myname1", id: 1},
            statusCode: 200,
            headers: {"content-type":"application/json"}
	},
	{
		persistentRequest:{
		data: "",
		headers:{"server":"Cowboy","connection":"keep-alive","x-powered-by":"Express","content-type":"application/json; charset=utf-8","content-length":"116","etag":"W/\"74-1635811801\"","date":"Mon, 12 Jan 2015 09:53:37 GMT","via":"1.1 vegur"
		},
		"statusCode":200,
		"cancelId":"jobName_37"
		}
		}
    }
```

Having in the response in the client `cancelId` we can send another request to the server and cancel the specific persistent request like:

```
var cancelMessage = {
	"cancelId":"jobName_1",
	"requestName": "persistentRequest"
};
ws.send(JSON.stringify(cancelMessage));

```
