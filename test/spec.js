var should = require('should');
var rescale = require('../src/rescale.js');

describe('Rescale', function() {
  it('should rescale data to the provided scale', function() {
    rescale(2.5, [0, 5], [2, 4]).should.be.exactly(3);
    rescale(-1, [-3, 5], [10, 20]).should.be.exactly(12.5);
  });

  it('should assume [0, 1] when no new scale is provided', function() {
    rescale(2.5, [0, 5]).should.be.exactly(.5);
    rescale(-1, [-3, 5]).should.be.exactly(.25);
  });
});
