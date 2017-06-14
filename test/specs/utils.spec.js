/* globals it, describe, before, beforeEach, expect, chai, sinonChai, sinon, fixture */
/* eslint no-unused-expressions: 0 */

import { center, position } from '../../src/utils/position.utils';
import touches from '../../src/utils/touch.utils';
import { hasKeys } from '../../src/utils/helpers.utils';

let element;

describe('th', () => {
  before(() => {
    fixture.setBase('test');
  });

  beforeEach(() => {
    fixture.load('test.html');
    element = fixture.el.querySelector('.wrapper');
    document.body.style.margin = '0px';
    element.style.width = '100px';
    element.style.height = '100px';
  });

  describe('center', () => {
    it('should be a function', () => {
      expect(typeof center).to.eql('function');
    });

    describe('should return', () => {
      it('window center if no arguments are passed', () => {
        const p = {
          clientX: window.innerWidth / 2,
          clientY: window.innerHeight / 2,
          pageX: window.innerWidth / 2,
          pageY: window.innerHeight / 2,
          target: document
        };

        expect(center()).to.eql(p);
      });

      it('DOM node center if node is passed', () => {
        const p = { clientX: 50, clientY: 50, pageX: 50, pageY: 50, target: element };
        expect(center(element)).to.eql(p);

        element.style.width = '200px';
        const n = { clientX: 100, clientY: 50, pageX: 100, pageY: 50, target: element };
        expect(center(element)).to.eql(n);

        document.body.style.marginLeft = '200px';
        element.style.width = '100px';
        const b = { clientX: 250, clientY: 50, pageX: 250, pageY: 50, target: element };
        expect(center(element)).to.eql(b);
      });
    });
  });

  describe('position', () => {
    it('should be a function', () => {
      expect(typeof position).to.eql('function');
    });

    describe('should return', () => {
      it('window center if no arguments are passed', () => {
        const p = {
          clientX: 0,
          clientY: 0,
          pageX: 0,
          pageY: 0,
          target: document
        };
        expect(position()).to.eql(p);
      });

      it('DOM node center if node is passed', () => {
        const p = { clientX: 20, clientY: 20, pageX: 20, pageY: 20, target: element };
        expect(position(element, {x: 20, y: 20})).to.eql(p);

        element.style.width = '200px';
        const n = { clientX: 40, clientY: 20, pageX: 40, pageY: 20, target: element };
        expect(position(element, {x: 20, y: 20})).to.eql(n);

        document.body.style.marginLeft = '200px';
        element.style.width = '100px';
        const b = { clientX: 220, clientY: 20, pageX: 220, pageY: 20, target: element };
        expect(position(element, {x: 20, y: 20})).to.eql(b);
      });
    });
  });

  describe('touches', () => {
    it('should be a function', () => {
      expect(typeof touches).to.eql('function');
    });

    describe('should return an array of points', () => {
      it('window center if no arguments are passed', () => {
        const points = touches(position(), center(), position());
        expect(points).to.be.an.array;
      });
    });
  });

  describe('hasKeys', () => {
    it('should be a function', () => {
      expect(typeof hasKeys).to.eql('function');
    });

    it('should pass if correct keys are passed to function', () => {
      const options = { clientX: 1, clientY: 1 };
      expect(hasKeys(options, 'clientX', 'clientY')).to.eql(true);
    });

    describe('should return false', () => {
      it('if passed keys that does not contains inside the object', () => {
        const options = { clientX: 0, clientY: 0 };
        expect(hasKeys(options, 'clientX', 'clientY', 'bom')).to.eql(false);
      });

      it('if passed keys are null or 0', () => {
        const optionsOne = { clientX: 0, clientY: 0 };
        const optionsTwo = { clientX: 0, clientY: null };

        expect(hasKeys(optionsOne, 'clientX', 'clientY')).to.eql(false);
        expect(hasKeys(optionsTwo, 'clientX', 'clientY')).to.eql(false);
      });
    });
  });
});
