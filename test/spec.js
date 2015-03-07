/*jshint node:true, mocha:true */

'use strict';

var should = require('should');
var sinon = require('sinon');
var normalise = require('normalise');
var scale = require('scale-normalised');
var rescale = require('../src/rescale.js').rescale;

describe('rescaling', function() {
  describe('without scales', function() {
    var normaliseStub;

    beforeEach(function() {
      normaliseStub = sinon.stub(normalise, 'normalise');

      normaliseStub.withArgs('anything')
        .onFirstCall().returns(Math.E)
        .onSecondCall().returns(-4);
    });

    afterEach(function() {
      normaliseStub.restore();
    });

    it('should delegate to normalise', function() {
      rescale('anything').should.be.exactly(Math.E);
      rescale('anything').should.be.exactly(-4);
    });
  });

  describe('without a new scale', function() {
    var normaliseStub;

    beforeEach(function() {
      normaliseStub = sinon.stub(normalise, 'normalise');

      normaliseStub.withArgs('anything', [0, 10])
        .onFirstCall().returns(Math.PI)
        .onSecondCall().returns(34);
    });

    afterEach(function() {
      normaliseStub.restore();
    });

    it('should also delegate to normalise', function() {
      rescale('anything', [0, 10]).should.be.exactly(Math.PI);
      rescale('anything', [0, 10]).should.be.exactly(34);
    });
  });

  describe('with scales', function() {
    var scaleMock, normaliseMock;

    beforeEach(function() {
      normaliseMock = sinon.mock(normalise);
      normaliseMock.expects('normalise')
        .twice().withExactArgs('anything', [0, 100])
        .returns(21);

      scaleMock = sinon.mock(scale);
      scaleMock.expects('scale')
        .twice().withExactArgs(21, [32, 212])
        .onFirstCall().returns(5)
        .onSecondCall().returns(-1);
    });

    afterEach(function() {
      scaleMock.verify();
      normaliseMock.verify();
    });

    it('should compose normalise and scale', function() {
      rescale('anything', [0, 100], [32, 212]).should.be.exactly(5);
      rescale('anything', [0, 100], [32, 212]).should.be.exactly(-1);
    });
  });
});
