var should = require('should');
var sinon = require('sinon');
var normalise = require('normalise');
var scale = require('scale-normalised');
var rescale = require('../src/rescale.js').rescale;

describe('rescaling', function() {
  describe('without scales', function() {
    beforeEach(function() {
      sinon.stub(normalise, 'normalise').returns(Math.E);
    });

    afterEach(function() {
      normalise.normalise.restore();
    });

    it('should delegate to normalise', function() {
      rescale('anything').should.be.exactly(Math.E);
    });
  });

  describe('without a new scales', function() {
    beforeEach(function() {
      sinon.stub(normalise, 'normalise').returns(Math.PI);
    });

    afterEach(function() {
      normalise.normalise.restore();
    });

    it('should also delegate to normalise', function() {
      rescale('anything', [0, 10]).should.be.exactly(Math.PI);
    });
  });

  describe('with scales', function() {
    var scaleMock;

    beforeEach(function() {
      sinon.stub(normalise, 'normalise').returns(21);
      scaleMock = sinon.mock(scale);
      scaleMock.expects('scale').withExactArgs(21, [32, 212]);
    });

    afterEach(function() {
      scaleMock.verify();
      scaleMock.restore();
      normalise.normalise.restore();
    });

    it('should compose normalise and scale', function() {
      rescale('anything', 'random', [32, 212]);
    });
  });
});
