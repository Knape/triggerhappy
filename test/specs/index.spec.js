/* globals it, describe, before, beforeEach, expect, chai, sinonChai, sinon, fixture */
/* eslint no-unused-expressions: 0 */

import th, {
  fire,
  load,
  spray,
  rampage,
  position,
  keyCode,
  touches,
  center
} from '../../src/';

describe('th', () => {
  before(() => {});

  beforeEach(() => {});

  afterEach(() => {});

  it('has to be an object', () => {
    expect(typeof th).to.eql('object');
  });

  it('should contain methods, fire()', () => {
    expect(typeof fire).to.eql('function');
  });

  it('should contain methods, load()', () => {
    expect(typeof load).to.eql('function');
  });

  it('should contain methods, spray()', () => {
    expect(typeof spray).to.eql('function');
  });

  it('should contain methods, rampage()', () => {
    expect(typeof rampage).to.eql('function');
  });

  it('should contain util methods, position()', () => {
    expect(typeof position).to.eql('function');
  });

  it('should contain util methods, center()', () => {
    expect(typeof center).to.eql('function');
  });

  it('should contain util methods, keyCode()', () => {
    expect(typeof keyCode).to.eql('function');
  });

  it('should contain util methods, touches()', () => {
    expect(typeof touches).to.eql('function');
  });
});
