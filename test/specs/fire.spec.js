/* globals it, describe, before, beforeEach, expect, chai, sinonChai, sinon, fixture */
/* eslint no-unused-expressions: 0 */

import fire from '../../src/fire';
import { center } from '../../src/utils/position.utils';

let element;
let innerTwo;
let innerThree;

describe('th.fire', () => {
  before(() => {
    fixture.setBase('test');
  });

  beforeEach(() => {
    fixture.load('test.html');
    element = fixture.el.querySelector('.wrapper');
    innerTwo = element.querySelector('.inner-two');
    innerThree = element.querySelector('.inner-three');
    document.body.style.margin = '20px';
    element.style.width = '100px';
    element.style.height = '100px';
  });

  it('should be a fucntion', () => {
    expect(typeof fire).to.eql('function');
  });

  it('should set MouseEvent and click as default if no args is passed', (done) => {
    const getEvent = (e) => {
      document.removeEventListener('click', getEvent);
      expect(e.clientX).to.eql(0);
      expect(e.clientY).to.eql(0);
      done();
    };

    document.addEventListener('click', getEvent);
    fire();
  });

  it('should be able to take four arguments', (done) => {
    const getEvent = (e) => {
      document.removeEventListener('click', getEvent);
      expect(Math.floor(e.clientX)).to.eql(Math.floor(window.innerWidth / 2));
      expect(Math.floor(e.clientY)).to.eql(Math.floor(window.innerHeight / 2));
      done();
    };

    document.addEventListener('click', getEvent);

    fire('MouseEvent', 'click', document, center());
  });

  it('should fire on document if no element is provided', () => {

  });

  it('should fire on specified element if element is provided', (done) => {
    const getEvent = (e) => {
      innerTwo.removeEventListener('click', getEvent);
      expect(e.clientX).to.eql(innerTwo.getBoundingClientRect().left);
      expect(e.clientY).to.eql(innerTwo.getBoundingClientRect().top);
      done();
    };

    innerTwo.addEventListener('click', getEvent);

    fire('MouseEvent', 'click', innerTwo);
  });

  it('should fire on specified element if element is provided with correct position', (done) => {
    const getEvent = (e) => {
      innerThree.removeEventListener('click', getEvent);
      expect(e.clientX).to.eql(innerThree.getBoundingClientRect().left);
      expect(e.clientY).to.eql(innerThree.getBoundingClientRect().top);
      done();
    };

    innerThree.addEventListener('click', getEvent);
    const { width, left } = innerThree.getBoundingClientRect()
    fire('MouseEvent', 'click', innerThree);
  });

  it('should return the event from the method', () => {
    const e = fire('MouseEvent', 'click', innerThree);
    expect(e.clientX).to.eql(innerThree.getBoundingClientRect().left);
    expect(e.clientY).to.eql(innerThree.getBoundingClientRect().top);
  });

  describe('MouseEvent', () => {

  });

  describe('KeybordEvent', () => {
    it('should fire a keyboard keypress event', (done) => {
      const getEvent = (e) => {
        expect(e.key).to.eql('13');
        done();
      };

      innerThree.addEventListener('keypress', getEvent);

      fire('KeyboardEvent', 'keypress', innerThree, {
        key: '13'
      });
    });
  });

  describe('TouchEvent', () => {

  });
});
