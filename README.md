![Alt text](/resources/batchelorJS.logo.jpg)
===================
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![coverage status](http://img.shields.io/badge/local%20coverage-92%25-green.svg)](http://img.shields.io/badge/local%20coverage-92%25-green.svg)

Proxy utility to bundle a batch of calls in one request.
Using the batchelor utility reduces HTTP overhead, network round-trip delay time and helps to keep your API design clean.
###Features:
* Server side parallel request processing.
* Persistent request for Web Socket facade.

 



### Methods
* [`configure(options)`](#configure)
* [`execute(job, callback)`](#execute)

### Methodology/Examples

* [`job`](#job)
* [`request`](#request)
* [`examples`](#examples)


### configure(options)

configure the batchelor object.

* maxConcurrentJobs - integer containing the number of maximum concurrent jobs (default:50)
* logger - object for logging porpouse (default: empty logger).
* whiteList - an array containing a list of allow host for processing the request (default: *, meaning allow all host/urls).
* request_default_values - Object containing the default values per request in case they are not passed
* method - string containing default HTTP method for the request - Possible values "GET" or "POST"
* timeout - integer containing the number of milliseconds to wait for a request to respond before aborting the request (default: 1000).
* ip - string of the client that request the batching job. (default: "unknown").
* headers - object containing the headers of the client that request the batching job
* body - string that will be pass in case of POST request

#### options  example:
```
{
    maxConcurrentJobs: 10,
    logger: "console"      
    },
    request_default_values: {
        method: "GET",
        timeout: 10000,
        ip: "unknown",
        headers: {},
        body: ""
    },
    whiteList: ["*"]
}
```

## execute(job, callback)

* `job` - A single request object or array of single requests [required]
* `callback(err, results)` - callback method when finish processimg job [required]
- The callback argument gets 2 arguments:
- `err` - error object, if an error occur, null otherwise
- `results` - an JSON object containing the result/s of the job

## job
An object holding a single or array of requets, to be batch in the request
#### Job with single request
```
{
	"name": "REQUEST_1",
	"method": "GET",
	"url": "jsonresponser.herokuapp.com/api/json/users",
	"timeout": 1000
}
```

#### Job with array of requests
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

## request
An object representing a single batch of request. The request must have the following

* `name` - identifier of the item, the name is used as reference. Names must be UNIQUE! [required]
* `url` - URL that calls the item. Possible GET parameters are also given here [required]
* `method` - possible values are `GET` or `POST` or whatever methods the called API supports [required]
* `encoding` - the encoding of the item (default:UTF8) [optional]
* `retries` - number of retries if the timeout is reach (default:2) [optional]
* `headers` - the headers that the item uses [optional]
* `body` - the parameters that the item uses when the method is POST are given here [optional]
* `timeout` - number of milliseconds to wait for a request from the API to respond before aborting the request, if this parameters is not provided we use timeout from the config.json file [optional]
* `isOnCloseRequest` - flag indicating if the item should be called when the connection is droped, used when using web socket facade (default:false) [optional]
* `persistent` - flag indicating if the item should be called in persistent way, used when using web socket facade(default:false) [optional]
* `persistentDelay` - number of delay between persistent items in milliseconds, used when using web socket facade (default:5000) [optional]


## Examples

## REST using ExpressJS Version 4.5.x
```
var exp_app = express();
var compression = require('compression');
var bodyParser = require('body-parser');
var exp_router = express.Router();
exp_app.use(compression());
exp_app.use(bodyParser());
var batchelor = require('batchelor');
var configuration = {
    "maxConcurrentJobs": 10,
    "logger": console,
    "request_default_values": {
        "method": "GET",
        "timeout": 10000,
        "ip": "unknown",
        "headers": {},
        "body": ""
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
var batchelor = require('batchelor');
var configuration = {
    "maxConcurrentJobs": 10,
    "logger": "console",
    "request_default_values": {
        "method": "GET",
        "timeout": 10000,
        "ip": "unknown",
        "headers": {},
        "body": ""
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
### Request - WebSocket Client - sending 3 types of request regular, persisten, onclose

* The following requests example, will send the 3 requests
* batchelor will process the 3 request and will return the response when:
* reqular request - its reqturned from given URL
* persistent requests - every `persistentDelay` milliseconds, if there is a cahnge in the response
* onClose request - once the connection is dropped from client 

```
var job = [
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
    ws.send(JSON.stringify(job));
};
ws.onmessage = function (event) {
    document.getElementById("responseFromServer").value = event.data;
};
```

## Response from previoius request
```
    {
        regular_request:{
            body: {name: "myname1", id: 1},
            statusCode: 200,
            headers: {"content-type":"application/json"}
	},
	{
		persistentRequest:{
		body: "",
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

### Example - Sendind a persitent job (all the request are persistents)

```
var job = {
	persistentJob: true,
	requests: [
		{
        	name: "persistent_request_1",
        	url: "https://jsonresponser.herokuapp.com/api/json/users",
        	method: "GET",
        	timeout: 5000
    	},
    	{
        	name: "persistent_request_2",
        	url: "https://jsonresponser.herokuapp.com/api/json/users",
        	method: "GET",
        	timeout: 5000
    	}
	]};

ws.send(JSON.stringify(job));

```

#### Canceling job (all request)
* In order to cancel job, we need to pass only the cancelId withou any requestName, like:

```
var cancelMessage = {
	"cancelId":"jobName_1",
};
ws.send(JSON.stringify(cancelMessage));

```
