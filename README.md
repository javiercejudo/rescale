# rescale

[![Build Status](https://travis-ci.org/javiercejudo/rescale.svg)](https://travis-ci.org/javiercejudo/rescale)
[![Coverage Status](https://coveralls.io/repos/javiercejudo/rescale/badge.svg?branch=master)](https://coveralls.io/r/javiercejudo/rescale?branch=master)
[![Code Climate](https://codeclimate.com/github/javiercejudo/rescale/badges/gpa.svg)](https://codeclimate.com/github/javiercejudo/rescale)

Rescale data

## Install

    npm i rescale

## Usage

```js
var rescale = require('rescale').rescale;

rescale(-1); // => -1
rescale(2.5, [0, 5]); // => 0.5 as [0, 1] is the default new scale

rescale(-1, [-3, 5], [10, 20]); // => 12.5
rescale(40, [0, 100], [32, 212]); // => 104

rescale(-3, 'invalid scale', 'invalid scale'); // => Error
```

See the [playground](http://blog.javiercejudo.com/rescale/).

See [spec](test/spec.js).
