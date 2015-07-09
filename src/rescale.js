/*jshint node:true */

'use strict';

var arbitraryPrecision = require('linear-arbitrary-precision');
var isUndefined = require('lodash.isundefined');

module.exports = function factory(adapter) {
  var Decimal = arbitraryPrecision(adapter);
  var normalise = require('normalise')(adapter);
  var scale = require('scale-normalised')(adapter);
  var api = {};

  api.rescale = function rescale(x, oldScale, newScale) {
    if (isUndefined(newScale)) {
      return normalise.normalise(x, oldScale);
    }

    return Number(rescaleDecimal(x, oldScale, newScale));
  };

  function rescaleDecimal(x, oldScale, newScale) {
    return scaleDecimal(normaliseDecimal(x, oldScale), newScale);
  }

  function normaliseDecimal(x, scale) {
    var scale0 = new Decimal(scale[0].toString());

    return new Decimal(x.toString()).minus(scale0)
      .div(new Decimal(scale[1].toString()).minus(scale0));
  }

  function scaleDecimal(x, scale) {
    var scale0 = new Decimal(scale[0].toString());

    return new Decimal(scale[1].toString()).minus(scale0)
      .times(new Decimal(x.toString())).plus(scale0);
  }

  return api;
};
