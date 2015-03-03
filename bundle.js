// generated with: browserify -r ./src/rescale.js:rescale > bundle.js

require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function normalise(x, scale) {
  return (x - scale[0]) / (scale[1] - scale[0]);
}

module.exports = normalise;

},{}],2:[function(require,module,exports){
'use strict';

function scale(x, scale) {
  return scale[0] + x * (scale[1] - scale[0]);
}

module.exports = scale;

},{}],"rescale":[function(require,module,exports){
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

},{"normalise":1,"scale-normalised":2}]},{},[]);
