var Promise = require('bluebird');
var keys = require('../../security/keys/keys');

var keyAuth = {};
keyAuth.keyCheck = function (keyid) {
  return new Promise(function (resolve, reject) {
    if (keyid === undefined) {
      reject(400);
    } else if (!keys[keyid]) {
      reject(403);
    } else if (keys[keyid]) {
      keyAuth.generateJWK(keyid)
        .then(function (jwk) {
          resolve(jwk);
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
