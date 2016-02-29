var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var app = require('./app.js');
var count = 582;
if (cluster.isMaster) {
    console.log('[master] ' + "master started, pid:" + process.pid);

    cluster.on('fork', function (worker) {
        console.log('[master] ' + 'fork: worker' + worker.id);
    });

    cluster.on('online', function (worker) {
        console.log('[master] ' + 'online: worker' + worker.id);
    });

    cluster.on('listening', function (worker, address) {
        console.log('[master] ' + 'listening: worker' + worker.id + ',pid:' + worker.process.pid + ', address:' + address.address + ":" + address.port);
    });

    cluster.on('disconnect', function (worker) {
        console.log('[master] ' + 'disconnect: worker' + worker.id);
    });

    cluster.on('exit', function (worker, code, signal) {
        console.log('[master] ' + 'exit worker' + worker.id + ' died, try to fork a new worker.');
        cluster.fork();
    });

    // for (var i = 0; i < numCPUs; i++) {
    //      cluster.fork();
    // }
    cluster.fork();
    Object.keys(cluster.workers).forEach(function (id) {
        cluster.workers[id].on('message', function (msg) {
            console.log('[master] ' + 'received msg:' + msg + 'from worker' + id);
        });
    });

    function eachWorker(callback) {
        for (var id in cluster.workers) {
            callback(cluster.workers[id]);
        }
    }

    var i = 0;
    setTimeout(function () {
        eachWorker(function (worker) {
            i++;
            worker.send('[master] ' + 'send msg ' + i + ' to worker' + worker.id);
        });
    }, 3000);

} else if (cluster.isWorker) {
    console.log('[worker] ' + "worker" + cluster.worker.id + " started, pid:" + process.pid);

    process.on('message', function (msg) {
        console.log('[worker] worker' + cluster.worker.id + ' received msg:' + msg);
        process.send('[worker] send msg ' + cluster.worker.id + ' to master.');
    });

    app.getPic(count);
}