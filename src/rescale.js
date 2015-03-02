'use strict';

var normalise = require('normalise');
var scale = require('scale-normalised');

function rescale(x, oldScale, newScale) {
  if (typeof newScale === 'undefined') {
    return normalise(x, oldScale);
  }

  return scale(normalise(x, oldScale), newScale);
}

module.exports = rescale;
