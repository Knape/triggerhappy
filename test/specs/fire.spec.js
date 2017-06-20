/* globals it, describe, before, beforeEach, expect, chai, sinonChai, sinon, fixture */
/* eslint no-unused-expressions: 0 */

import { fire } from '../../src/fire';
import { center } from '../../src/utils/position.utils';
import keyCode from '../../src/events/keyboard.utils';

import { type } from './helpers';

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
    sinon.spy(console, 'warn');
  });

  afterEach(() => {
    console.warn.restore();
  });

  it('should be a fucntion', () => {
    expect(typeof fire).to.eql('function');
  });

  describe('MouseEvent', () => {
    it('should set MouseEvent and click as default if no args is passed', (done) => {
      const getEvent = (e) => {
        document.removeEventListener('click', getEvent);
        expect(e.type).to.eql('click');
        expect(type(e)).to.eql('MouseEvent');
        expect(console.warn).not.to.have.been.called;
        expect(e.clientX).to.eql(0);
        expect(e.clientY).to.eql(0);
        done();
      };

      document.addEventListener('click', getEvent);
      fire();
    });

    it('should be able to take three arguments', (done) => {
      const getEvent = (e) => {
        document.removeEventListener('click', getEvent);
        expect(e.type).to.eql('click');
        expect(type(e)).to.eql('MouseEvent');
        expect(console.warn).not.to.have.been.called;
        expect(Math.floor(e.clientX)).to.eql(Math.floor(window.innerWidth / 2));
        expect(Math.floor(e.clientY)).to.eql(Math.floor(window.innerHeight / 2));
        done();
      };

      document.addEventListener('click', getEvent);

      fire('click', document, center());
    });

    it('should be able to handle depricated arguments style', (done) => {
      const getEvent = (e) => {
        document.removeEventListener('click', getEvent);
        expect(e.type).to.eql('click');
        expect(type(e)).to.eql('MouseEvent');
        expect(console.warn).to.have.been.called;
        expect(Math.floor(e.clientX)).to.eql(Math.floor(window.innerWidth / 2));
        expect(Math.floor(e.clientY)).to.eql(Math.floor(window.innerHeight / 2));
        done();
      };

      document.addEventListener('click', getEvent);

      fire('MouseEvent', 'click', document, center());
    });

    it('should fire on specified element if element is provided', (done) => {
      const getEvent = (e) => {
        innerTwo.removeEventListener('click', getEvent);
        expect(e.type).to.eql('click');
        expect(type(e)).to.eql('MouseEvent');
        expect(console.warn).not.to.have.been.called;
        expect(e.clientX).to.eql(innerTwo.getBoundingClientRect().left);
        expect(e.clientY).to.eql(innerTwo.getBoundingClientRect().top);
        done();
      };

      innerTwo.addEventListener('click', getEvent);

      fire('click', innerTwo);
    });

    it('should fire on specified element if element is provided with correct position', (done) => {
      const getEvent = (e) => {
        innerThree.removeEventListener('click', getEvent);
        expect(e.type).to.eql('click');
        expect(type(e)).to.eql('MouseEvent');
        expect(console.warn).not.to.have.been.called;
        expect(e.clientX).to.eql(innerThree.getBoundingClientRect().left);
        expect(e.clientY).to.eql(innerThree.getBoundingClientRect().top);
        done();
      };

      innerThree.addEventListener('click', getEvent);
      const { width, left } = innerThree.getBoundingClientRect()
      fire('click', innerThree);
    });

    it('should return the event from the method', () => {
      const e = fire('click', innerThree);
      expect(e.type).to.eql('click');
      expect(type(e)).to.eql('MouseEvent');
      expect(console.warn).not.to.have.been.called;
      expect(e.clientX).to.eql(innerThree.getBoundingClientRect().left);
      expect(e.clientY).to.eql(innerThree.getBoundingClientRect().top);
    });
  })

  describe('KeyboardEvent', () => {
    it('should fire a keyboard \'enter\' keypress event', (done) => {
      const getEvent = (e) => {
        expect(e.type).to.eql('keypress');
        expect(type(e)).to.eql('KeyboardEvent');
        expect(console.warn).not.to.have.been.called;
        expect(e.key).to.eql('13');
        done();
      };

      innerThree.addEventListener('keypress', getEvent);
      fire('keypress', innerThree, keyCode('enter'));
    });

    it('should be able to handle depricated arguments style', (done) => {
      const getEvent = (e) => {
        expect(e.type).to.eql('keypress');
        expect(type(e)).to.eql('KeyboardEvent');
        expect(console.warn).to.have.been.called;
        expect(e.key).to.eql('13');
        done();
      };

      innerThree.addEventListener('keypress', getEvent);
      fire('KeyboardEvent', 'keypress', innerThree, keyCode('enter'));
    });

    it('should fire a keyboard \'enter\' keypress event', (done) => {
      const getEvent = (e) => {
        expect(e.type).to.eql('keypress');
        expect(type(e)).to.eql('KeyboardEvent');
        expect(console.warn).not.to.have.been.called;
        expect(e.key).not.to.eql('13');
        expect(e.key).to.eql('65');
        done();
      };

      innerThree.addEventListener('keypress', getEvent);
      fire('keypress', innerThree, keyCode('a'));
    });
  });

  describe('TouchEvent', () => {
    it('should fire a touch touchstart event', (done) => {
      const getEvent = (e) => {
        expect(e.type).to.eql('touchstart');
        expect(console.warn).not.to.have.been.called;
        done();
      };

      innerThree.addEventListener('touchstart', getEvent);
      fire('touchstart', innerThree);
    });

    it('should be able to handle depricated arguments style', (done) => {
      const getEvent = (e) => {
        expect(e.type).to.eql('touchstart');
        expect(console.warn).to.have.been.called;
        done();
      };

      innerThree.addEventListener('touchstart', getEvent);
      fire('TouchEvent', 'touchstart', innerThree);
    });
  });

  describe('CustomEvent', () => {
    it('should fire any other string passed as CustomEvent', (done) => {
      const getEvent = (e) => {
        expect(e.type).to.eql('yada');
        expect(type(e)).to.eql('CustomEvent');
        expect(console.warn).not.to.have.been.called;
        done();
      };

      innerThree.addEventListener('yada', getEvent);
      fire('yada', innerThree);
    });
  });
});
