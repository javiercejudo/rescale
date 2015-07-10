/*jshint node:true */

'use strict';

var arbitraryPrecision = require('linear-arbitrary-precision');
var isUndefined = require('lodash.isundefined');
var normaliseFactory = require('normalise');

module.exports = function factory(adapter) {
  var Decimal = arbitraryPrecision(adapter);
  var normalise = normaliseFactory(adapter).normalise;
  var api = {};

  api.rescale = function rescale(x, oldScale, newScale) {
    if (isUndefined(newScale)) {
      return normalise(x, oldScale);
    }

    var newScale0 = new Decimal(newScale[0].toString());
    var oldScale0 = new Decimal(oldScale[0].toString());

    return Number(
      new Decimal(x.toString()).minus(oldScale0).times(new Decimal(newScale[1].toString()).minus(newScale0))
        .div(new Decimal(oldScale[1].toString()).minus(oldScale0)).plus(newScale0)
    );
  };

  return api;
};
