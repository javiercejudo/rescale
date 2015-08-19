/*jshint node:true, mocha:true */

'use strict';

require('should');


var arbitraryPrecision = require('linear-arbitrary-precision');
var bigjsAdapter = require('bigjs-adapter');
var floatingAdapter = require('floating-adapter');
var rescaleFactory = require('../src/rescale');

describe('rescaling', function() {
  describe('without scales', function() {
    var Decimal = arbitraryPrecision(floatingAdapter);
    var rescale = rescaleFactory(Decimal).rescale;

    it('should be the identity', function() {
      rescale(Math.E).val().val().should.be.exactly(Math.E);
      rescale(-4).val().val().should.be.exactly(-4);
    });
  });

  describe('without a new scale', function() {
    var Decimal = arbitraryPrecision(floatingAdapter);
    var rescale = rescaleFactory(Decimal).rescale;

    it('should also delegate to normalise', function() {
      rescale(0.4, [0.3, 0.5]).val().val().should.be.exactly(0.5000000000000001);
      rescale(-3, [-5, 1]).val().val().should.be.exactly(1/3);
    });
  });

  describe('with scales', function() {
    describe('when arbitrary precision is unavailable', function() {
      var Decimal = arbitraryPrecision(floatingAdapter);
      var rescale = rescaleFactory(Decimal).rescale;

      it('should compose normalise and scale', function() {
        rescale(0.4, [0.3, 0.5], [0.1, 0.2]).val().val().should.be.exactly(0.15000000000000002);
      });
    });

    describe('when arbitrary precision is available', function() {
      var Decimal = arbitraryPrecision(bigjsAdapter);
      var rescale = rescaleFactory(Decimal).rescale;

      it('should rescale with arbitrary precision', function() {
        rescale(0.4, [0.3, 0.5], [0.1, 0.2]).val().eq(new Decimal('0.15')).should.be.exactly(true);
      });
    });
  });
});
