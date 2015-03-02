var should = require('should');
var rescale = require('../src/rescale.js');

describe('Rescale', function() {
  it('should rescale data to the provided scale', function() {
    rescale(2.5, [0, 5], [2, 4]).should.be.exactly(3);
    rescale(-1, [-3, 5], [10, 20]).should.be.exactly(12.5);
  });
});
