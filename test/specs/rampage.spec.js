/* globals it, describe, before, beforeEach, expect, chai, sinonChai, sinon, fixture */
/* eslint no-unused-expressions: 0 */

import rampage from '../../src/rampage';

const sandbox = sinon.sandbox.create();

describe('load and spray', () => {
  before(() => {});

  beforeEach(() => {});

  afterEach(() => {
    sandbox.restore();
  });
  describe('load', () => {
    it('should be a function', () => {
      rampage();
      expect(typeof rampage).to.eql('function');
    });
  });
});
