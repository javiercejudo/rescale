/*jshint node:true */

'use strict';

var normaliseFactory = require('normalise');
var scaleFactory = require('scale-normalised');

module.exports = function factory(Decimal) {
  var normalise = normaliseFactory(Decimal).normalise;
  var scale = scaleFactory(Decimal).scale;
  var api = {};

  api.rescale = function rescale(oldScale, newScale, x) {
    return scale(newScale, normalise(oldScale, x));
  };

  return api;
};
