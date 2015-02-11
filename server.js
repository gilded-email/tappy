var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');

var app = express();

keys = {
    '10000000100010001000100000000001': new Buffer("3A2A1B68DD2BD9B2EEB25E84C4776668", 'hex'),
    '10000000100010001000100000000002': new Buffer("07E4D653CFB45C66158D93FFCE422907", 'hex'),
    'A1B1C1D1A2B2A3B3A4B4A5B5C5D5E5F5': new Buffer("2539FA84B987416009A7FBBA11B239AB", 'hex')
};

var credentials = {
    key: fs.readFileSync('./security/cl_clearkey-key.pem'),
    cert: fs.readFileSync('./security/cl_clearkey-cert.pem')
};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(3000);

app.get('/key/:keyid', function (req, res) {

  console.log(req.params.keyid);

  var keyid = req.params.keyid;
  if (keyid === undefined) {
    res.sendStatus(400);
  } else if (!keys[keyid]) {
    res.sendStatus(403);
  } else if (keys[keyid]) {
    var jwk = {
      kty: 'oct',
      alg: "A128GCM",
      kid: new Buffer(keyid, 'hex').toString('base64').replace(/=/g, ''),
      k: keys[keyid].toString('base64').replace(/=/g, '')
    };
    res.send(jwk);
  }

});
