var Promise = require('bluebird');
var keys = require('../../security/keys/keys');

var keyAuth = {};
keyAuth.keyCheck = function (req, res) {
  var keyid = req.params.keyid;
  return new Promise(function (resolve, reject) {
    if (keyid === undefined) {
      res.sendStatus(400);
    } else if (!keys[keyid]) {
      res.sendStatus(403);
    } else if (keys[keyid]) {
      keyAuth.generateJWK(keyid)
        .then(function (jwk) {
          res.send(jwk);
        });
    }
  });
};

keyAuth.generateJWK = function (keyid) {
  return new Promise(function (resolve, reject) {
    var jwk = {
      kty: 'oct',
      alg: "A128GCM",
      kid: new Buffer(keyid, 'hex').toString('base64').replace(/=/g, ''),
      k: keys[keyid].toString('base64').replace(/=/g, '')
    };
    resolve(jwk);
  });
};

module.exports = keyAuth;
