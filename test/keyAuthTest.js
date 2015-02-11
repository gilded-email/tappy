var expect = require('chai').expect;
var keyAuth = require('../server/keyAuth/keyAuth');
var keys = require('../security/keys/keys');

var keyCheck = keyAuth.keyCheck;
var generateJWK = keyAuth.generateJWK;

expect(keyCheck).to.be.a('function'); //check that keyCheck is a function
expect(generateJWK).to.be.a('function'); //check that generateJWK is a function

var genJWK = generateJWK('A1B1C1D1A2B2A3B3A4B4A5B5C5D5E5F5')
  .then(function (jwk) {
    expect(jwk).to.be.a('object'); //return object should be an object
    expect(jwk.kty).to.eql('oct'); //key type should be an octet sequence
    expect(jwk.alg).to.eql('A128GCM'); //algorithm should be the AES key wrap using a 128-bit key
    expect(jwk.kid).to.eql('obHB0aKyo7OktKW1xdXl9Q'); //kid should be the base64 hexidecimal represenation of the keyid
    expect(jwk.k).to.eql('JTn6hLmHQWAJp/u6EbI5qw'); //the key should match 'JTn6hLmHQWAJp/u6EbI5qw'
  });

//write HTTP tests



