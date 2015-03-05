'use strict';

var normalise = require('normalise');
var scale = require('scale-normalised');

exports.rescale = function rescale(x, oldScale, newScale) {
  if (typeof newScale === 'undefined') {
    return normalise.normalise(x, oldScale);
  }

  return scale.scale(normalise.normalise(x, oldScale), newScale);
}
