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