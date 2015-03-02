# rescale  [![Build Status](https://travis-ci.org/javiercejudo/rescale.svg)](https://travis-ci.org/javiercejudo/rescale)

Rescale data

## Install

    npm install --save-dev rescale

## Usage

```js
var rescale = require('rescale');

rescale(-1, [-3, 5], [10, 20]); // returns 12.5
rescale(2.5, [0, 5], [2, 4]); // returns 3
rescale(2.5, [0, 5]); // returns 0.5 as [0, 1] is the default new scale
```
