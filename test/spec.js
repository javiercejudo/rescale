/*jshint node:true, mocha:true */

'use strict';

require('should');


var arbitraryPrecision = require('arbitrary-precision');
var bigjsAdapter = require('bigjs-adapter');
var floatingAdapter = require('floating-adapter');
var rescaleFactory = require('../src/rescale');

describe('rescaling', function() {
  describe('api', function() {
    it('should be frozen', function() {
      var Decimal = arbitraryPrecision(floatingAdapter);
      var rescale = rescaleFactory(Decimal);

      (function() {
        rescale.rescale = function() {};
      }).should.throw();
    });
  });

  describe('with scales', function() {
    describe('when arbitrary precision is unavailable', function() {
      var Decimal = arbitraryPrecision(floatingAdapter);
      var rescale = rescaleFactory(Decimal).rescale;

      it('should compose normalise and scale', function() {
        rescale([0.3, 0.5], [0.1, 0.2], 0.4).equals(new Decimal('0.15000000000000002')).should.be.exactly(true);
      });
    });

    describe('when arbitrary precision is available', function() {
      var Decimal = arbitraryPrecision(bigjsAdapter);
      var rescale = rescaleFactory(Decimal).rescale;

      it('should rescale with arbitrary precision', function() {
        rescale([0.3, 0.5], [0.1, 0.2], 0.4).equals(new Decimal('0.15')).should.be.exactly(true);
      });
    });
  });
});
