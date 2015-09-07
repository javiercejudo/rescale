/*jshint node:true, mocha:true */

'use strict';

require('should');


var arbitraryPrecision = require('arbitrary-precision');
var bigjsAdapter = require('bigjs-adapter');
var floatingAdapter = require('floating-adapter');
var rescaleFactory = require('../src/rescale');

describe('rescaling', function() {
  describe('without scales', function() {
    var Decimal = arbitraryPrecision(floatingAdapter);
    var rescale = rescaleFactory(Decimal).rescale;

    it('should be the identity', function() {
      rescale(Math.E).equals(new Decimal(Math.E.toString())).should.be.exactly(true);
      rescale(-4).equals(new Decimal('-4')).should.be.exactly(true);
    });
  });

  describe('without a new scale', function() {
    var Decimal = arbitraryPrecision(floatingAdapter);
    var rescale = rescaleFactory(Decimal).rescale;

    it('should also delegate to normalise', function() {
      rescale(0.4, [0.3, 0.5]).equals(new Decimal('0.5000000000000001')).should.be.exactly(true);
      rescale(-3, [-5, 1]).equals(new Decimal('1').div(new Decimal('3'))).should.be.exactly(true);
    });
  });

  describe('with scales', function() {
    describe('when arbitrary precision is unavailable', function() {
      var Decimal = arbitraryPrecision(floatingAdapter);
      var rescale = rescaleFactory(Decimal).rescale;

      it('should compose normalise and scale', function() {
        rescale(0.4, [0.3, 0.5], [0.1, 0.2]).equals(new Decimal('0.15000000000000002')).should.be.exactly(true);
      });
    });

    describe('when arbitrary precision is available', function() {
      var Decimal = arbitraryPrecision(bigjsAdapter);
      var rescale = rescaleFactory(Decimal).rescale;

      it('should rescale with arbitrary precision', function() {
        rescale(0.4, [0.3, 0.5], [0.1, 0.2]).equals(new Decimal('0.15')).should.be.exactly(true);
      });
    });
  });
});
