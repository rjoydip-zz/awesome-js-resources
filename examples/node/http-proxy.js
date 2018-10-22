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