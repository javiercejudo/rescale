/*jshint node:true */

'use strict';

var isUndefined = require('lodash.isundefined');
var normaliseFactory = require('normalise');
var scaleFactory = require('scale-normalised');

module.exports = function factory(Decimal) {
  var normalise = normaliseFactory(Decimal).normalise;
  var scale = scaleFactory(Decimal).scale;
  var api = {};

  api.rescale = function rescale(x, oldScale, newScale) {
    return scale(normalise(x, oldScale), newScale);
  };

  return api;
};
