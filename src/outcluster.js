const http = require("http");
const fibonacci = require("./finbonacci");

http
  .createServer(function (req, res) {
    res.writeHead(200);
    const result = fibonacci(44);
    res.write(`worker ${process.pid}: ${result.toString()}`);
    res.end();
  })
  .listen(8000);
