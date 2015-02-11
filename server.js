var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');
var keyAuth = require('./server/keyAuth/keyAuth');

var app = express();

var credentials = {
  key: fs.readFileSync('./security/cl_clearkey-key.pem'),
  cert: fs.readFileSync('./security/cl_clearkey-cert.pem')
};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(3000);

app.get('/key/:keyid', function (req, res) {
  keyAuth.keyCheck(req, res);
});

