# Examples

- class export

```js
// class-export.js
class Self {
    constructor() {
        console.log('Self invoke class');
    }
}

module.exports = (
    () => {
        return new Self()
    }
)

// index.js
const Self = require('./class-export')()
```

Source: [class-export.js](/examples/node/class-export.js#L1)

- cluster (load balancing)

```js
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
let numReqs = 0;

if (cluster.isMaster) {
  // Master process id
  console.log(`Master ${process.pid} is running`);
  // Fork workers.
  console.log("Number of CPUs : " + numCPUs);
  for (let i = 0; i < numCPUs; i++) {
    let worker = cluster.fork();

    worker.on('message', msg => {
      if (msg.cmd && msg.cmd == 'notifyRequest') {
        numReqs++;
        console.log("numReqs =", numReqs);
      }
    });

    worker.on('listening', address => {
      console.log(address);
    });

    console.log("Worker PID : ", worker.pid === undefined ? worker.process.pid : worker.pid);
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
    console.log(`worker restart ..`);
    const newWorker = cluster.fork();

    // Note the process IDs
    const newPID = newWorker.process.pid;
    const oldPID = worker.process.pid;

    // Log the event
    console.log('worker '+ oldPID +' died.');
    console.log('worker '+ newPID +' born.');
  });

} else {
  // Worker processes have a http server.
  http.Server( (req, res) => {
    res.writeHead(200);
    res.end("hello world\n");
    process.send({ cmd: 'notifyRequest' });
  }).listen(8000);
}
```

Source: [cluster.js](/examples/node/cluster.js#L1)

> NOTE: Kill a process in `windows`: `> Taskkill /PID <PROCESS_ID> /F` and for `linux`: `$ kill -9 <PROCESS_ID>`

- node proxy server

```js
var http = require('http'),
    httpProxy = require('http-proxy');

var addresses = [
    {
        host: '127.0.0.1',
        port: 8000
    },
    {
        host: '127.0.0.1',
        port: 8001
    },
    {
        host: '127.0.0.1',
        port: 8002
    },
    {
        host: '127.0.0.1',
        port: 8003
    }
];

//
// Create your target server
//
var server = http.createServer(function (req, res) {
    addresses = addresses.concat(addresses.splice(0, 1));
    var target = { target: addresses };
    //
    // Create your proxy server and set the target in the options.
    //
    var proxyServer = httpProxy.createProxyServer(target);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
    res.end();
})

server.listen(9000);
```

Source: [http-proxy.js](/examples/node/http-proxy.js#L26)