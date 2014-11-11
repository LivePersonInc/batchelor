batchelor
===================
Server API proxy to bundle a batch of calls in one request.
Using a batch API reduces HTTP overhead, network round-trip delay time and helps to keep your API design clean.
Server side parallel request processing

### Methods
* [`configure(options)`](#configure)
* [`processJobsRequest(requests, callback)`](#processJobsRequest)

### Methodology/Example
* [`single request`](#single request)
* [`example`](#example)


<a name="configure" />
## configure(options)
configure the batchelor object.

* logger - object for logging porpouse(default: console).
* maxWorkersPerJob - The maximum number of tasks to run at any time.
* persistentDelay - integer containing the number of milliseconds to wait between persistent requests (default: 5000)
* repeatConcurrency
* timeout - integer containing the number of milliseconds to wait for a request to respond before aborting the request (default: 1000).
* useTooBusy - toobusy polls the node.js event loop and keeps track of "lag", which is long requests wait in node's event queue to be processed (default: false).
* whiteList - an array containing a list of allow host for processing(default: *, meaning allow all host/urls).

#### options  example:
```json
{
  logger: console,
  maxWorkersPerJob: 10,
  persistentDelay: 2000,
  repeatConcurrency: 5,
  timeout: 5000,
  useTooBusy: true,
  whiteList: ["github.com", "hotmail.net"]
}
```

<a name="processJobsRequest" />
## processJobsRequest(requests, callback)
This is the main method of the batchelor object, here is where all the "magic" is done.
The method runs an async.parallel method of the collection of 'requests', every 'request' holds its data of the(name, url, method, headers, body, timeout)

* `requests` - A single request object or array of  single requests [required]
* `callback(err, results)` - callback method when finish processimg request/s [required]
- The callback argument gets 2 arguments:
- err - error object, if an error occur, null otherwise
- results - an JSON object conatining the result/s of the request/s


<a name="single request" />
## single request
* `name` - must variable, its name is used as reference. Names must be UNIQUE! [required]
* `method` - possible values are `GET` or `POST` or whatever methods the called API supports [required]
* `url` - the URL that calls the API function. Possible GET parameters are also given here [required]
* `headers` - the headers that the API uses [optional]
* `doNotMergeHeaders` - do not merge btachelor request headers with the internal request headers specified [optional]
* `body` - the parameters that the API function uses when the method is POST are given here [optional]
* `timeout` - number of milliseconds to wait for a request from the API to respond before aborting the request, if this parameters is not provided we use timeout from the config.json file [optional]
* `isOnCloseRequest` - false
* `isPersistentRequest` - false
* `persistentDelay` - 2000

<a name="example" />
## example
```javascript
var batchelor = require('batchelor');
var configuration = {
  logger: console,
  maxWorkersPerJob: 10,
  persistentDelay: 2000,
  repeatConcurrency: 5,
  timeout: 5000,
  useTooBusy: true,
  whiteList: ["github.com", "hotmail.net"]
};

var requests = [{name: "req1",url: "http://www.url.com","method": "POST","headers": {"someheader": "header"},body: "test","timeout": 10000},{name: "req2",url: "https://www.url.com","method": "GET","headers": {"someheader": "header"},body: "test","timeout": 10000}];

batchelor.configure(configuration);
batchelor.processJobsRequest(requests, function (err, results) {
    if (err) {
        console.log("Error occur");
    }
    else {
        // check if you are using REST or WebSocket
        var res = (websocket) ? websocket : rest;
        res.send(JSON.stringify(results));
    }
});
```
