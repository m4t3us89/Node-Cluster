const cluster = require("cluster");
const os = require("os");
const http = require("http");
const fibonacci = require("./finbonacci");

if (cluster.isMaster) {
  console.log("master", process.pid);
  const availableCpus = os.cpus().length;
  const cpus = availableCpus - 2;
  for (let i = 0; i < cpus; i++) {
    const worker = cluster.fork();
    worker.on("message", function (message) {
      console.log("return", message);
    });
    console.log("master", "worker", i);
  }
} else {
  console.log("worker", process.pid);
  http
    .createServer((req, res) => {
      res.writeHead(200);
      const result = fibonacci(44);
      process.send(`worker ${process.pid}: ${result.toString()}`);
      res.write(`worker ${process.pid}: ${result.toString()}`);
      res.end();
    })
    .listen(3333);
}
