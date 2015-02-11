var mocha = require('mocha');
var assert = require('chai').assert;
var keyAuth = require('../server/keyAuth/keyAuth');
var keys = require('../security/keys/keys');

describe('JWK Generation Functions', function () {
  describe('Key Check', function () {
    it('should return true when keyCheck is a function', function () {
      var keyCheck = keyAuth.keyCheck;
      assert.equal(typeof keyCheck, 'function'); //check that keyCheck is a function
    });
  });
  describe('JWK token creation', function () {
    it('should return true when generateJWK is a function', function () {
      var generateJWK = keyAuth.generateJWK;
      assert.equal(typeof generateJWK, 'function'); //check that generateJWK is a function
    });
    it('should return a JSON Web Key', function () {
      var genJWK = keyAuth.generateJWK('A1B1C1D1A2B2A3B3A4B4A5B5C5D5E5F5')
        .then(function (jwk) {
          assert.equal(typeof jwk, 'object'); //return object should be an object
          assert.equal(jwk.kty, 'oct'); //key type should be an octet sequence
          assert.equal(jwk.alg, 'A128GCM'); //algorithm should be the AES key wrap using a 128-bit key
          assert.equal(jwk.kid, 'obHB0aKyo7OktKW1xdXl9Q'); //kid should be the base64 hexidecimal represenation of the keyid
          assert.equal(jwk.k, 'JTn6hLmHQWAJp/u6EbI5qw'); //the key should match 'JTn6hLmHQWAJp/u6EbI5qw'
        });
    });
  });
});

//write HTTP tests



