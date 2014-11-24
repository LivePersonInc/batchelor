/**
 * This is a simple responser server, gets a 'GET' request in the following format:
 * currently get the a 'GET' method and gets is data from the queryString
 * http://responseserver1.omerh.net:7777?id=1
 */
var express = require('express');
var app = express();
var log = console;

var total = 0;
// all methods
app.all('*', function(req, res, next) {
    res.set('Content-Type', 'application/json; charset=utf-8');
    total++;
    var delay = Math.floor((Math.random()*100)+1);
    //delay=0;
    var id = parseInt(req.param('id'));
    log.info('Request Received with ID='+id + ' delaying '+ delay + 'ms');

    setTimeout(function () {
        var output = {
            id : id
        };
        res.send(JSON.stringify(output));
        log.info('->Sending response for Request with ID='+id + ' after delaying '+ delay + 'ms');

        res.end();
    }, delay);

});

//setInterval(function () {
//    console.info('TOTAL: ' + total);
//}, 10000);

app.listen(7777);
log.info('testResponseSrv started. Listening on port ' + 7777);