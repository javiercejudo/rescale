'use strict';

var normalise = require('normalise');
var scale = require('scale-normalised');

function rescale(x, oldScale, newScale) {
  var normalScale = [0, 1];

  if (typeof newScale === 'undefined') {
    newScale = normalScale;
  }

  return scale(normalise(x, oldScale), newScale);
}

module.exports = rescale;
