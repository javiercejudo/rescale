/*jshint node:true */

'use strict';

var normalise = require('normalise');
var scale = require('scale-normalised');
var arbitraryPrecision = require('rescale-arbitrary-precision');

var decimal = arbitraryPrecision.load();

exports.rescale = function rescale(x, oldScale, newScale) {
  if (typeof newScale === 'undefined') {
    return normalise.normalise(x, oldScale);
  }

  if (arbitraryPrecision.isAvailable()) {
    return Number(rescaleDecimal(x, oldScale, newScale));
  }

  return rescaleNative(x, oldScale, newScale);
};

function rescaleDecimal(x, oldScale, newScale) {
  return scaleDecimal(normaliseDecimal(x, oldScale), newScale);
}

function normaliseDecimal(x, scale) {
  return decimal(x).minus(scale[0])
    .div(decimal(scale[1]).minus(scale[0]));
}

function scaleDecimal(x, scale) {
  return decimal(scale[1]).minus(scale[0]).times(x).plus(scale[0]);
}

function rescaleNative(x, oldScale, newScale) {
  return scale.scale(normalise.normalise(x, oldScale), newScale);
}
