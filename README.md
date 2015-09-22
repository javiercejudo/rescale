# rescale

[![Build Status](https://travis-ci.org/javiercejudo/rescale.svg)](https://travis-ci.org/javiercejudo/rescale)
[![Coverage Status](https://coveralls.io/repos/javiercejudo/rescale/badge.svg?branch=master)](https://coveralls.io/r/javiercejudo/rescale?branch=master)
[![Code Climate](https://codeclimate.com/github/javiercejudo/rescale/badges/gpa.svg)](https://codeclimate.com/github/javiercejudo/rescale)

Rescale data

## Install

    npm i rescale

## Usage

```js
var Decimal = require('linear-arbitrary-precision')(require('floating-adapter'));
var rescale = require('rescale')(Decimal).rescale;

rescale([-3, 5], [10, 20], -1); // => Decimal 12.5
rescale([0, 100], [32, 212], 40); // => Decimal 104
```

See [spec](test/spec.js).

## Related projects

- [linear-converter](https://github.com/javiercejudo/linear-converter): flexible linear converter with built in conversions for common units.
- [scale](https://github.com/javiercejudo/scale): scales normalised data.
- [normalise](https://github.com/javiercejudo/normalise): normalise data to [0, 1].
- [rescale-util](https://github.com/javiercejudo/rescale-util): rescale utilities.
