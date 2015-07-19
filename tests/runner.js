var Eterator        = require("./../commons/eterator")
    , eterator      = new Eterator();



function _processSingleItem (item) {
    var currTime = Date.now()
        , delta = currTime - item.firedTime
        , name = item.name;

    if (delta >= item.persistentDelay) {
        item.firedTime = currTime;
        item.bodyTemp = item.bodyTemp || {};
        console.log("calling batchelorjs");
    }
}


function _startPersist() {
    setImmediate(function () {
        eterator.start(0, true,
            function (err, item) {
                _processSingleItem(item);
            },
            null,
            false
        );
    });
}

function _initEterator() {
    var persistent_requests = [];
    for (var i=0; i<1; i++) {
        persistent_requests.push({
            jobId: "jobId" + i,
            firedTime: Date.now(),
            persistentDelay: 2000
        })
    }

    eterator.addItems(persistent_requests);
}

_initEterator();
_startPersist();
