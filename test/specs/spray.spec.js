/* globals it, describe, before, beforeEach, expect, chai, sinonChai, sinon, fixture */
/* eslint no-unused-expressions: 0 */

import { fire, load } from '../../src/fire';
import spray from '../../src/spray';
import keyCode from '../../src/events/keyboard.utils';
import { center } from '../../src/utils/position.utils';

const sandbox = sinon.sandbox.create();

let element;

describe('load and spray', () => {
  before(() => {
    fixture.setBase('test');
  });

  beforeEach(() => {
    fixture.load('test.html');
    element = fixture.el.querySelector('.wrapper');
    document.body.style.margin = '20px';
    element.style.width = '100px';
    element.style.height = '100px';
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('load', () => {
    it('should be a higher order function and set default args', () => {
      expect(typeof load).to.eql('function');
      expect(typeof load()).to.eql('function');
    });

    it('should be a higher order function', () => {
      expect(typeof load).to.eql('function');
      expect(typeof load('click')).to.eql('function');
    });

    it('should return a Promise Object', () => {
      expect(typeof load('click')({})).to.eql('object');
    });

    it('should return a new event from promise', (done) => {
      load('click')({}).then(({event}) => {
        expect(event.clientX).to.eql(0);
        done();
      });
    });

    it('should return a new event from promise from current element', (done) => {
      load('click', element)({}).then(({event}) => {
        expect(event.clientX).to.eql(20);
        done();
      });
    });

    it('should return a new event from that promise callback', (done) => {
      load('click', document, center())({})
      .then(({event}) => {
        expect(event.clientX).to.not.eql(0);
        done();
      });
    });
  });

  describe('spray', () => {
    it('should be a function', () => {
      expect(typeof spray).to.eql('function');
    });

    it('should take a load hoc and fire 10 times as default', (done) => {
      const eventSpy = sinon.spy();
      document.addEventListener('click', eventSpy);
      const clip = load('click', document, center());
      spray(clip).then(() => {
        const times = eventSpy.printf('%c');
        expect(eventSpy.called).to.be.true;
        expect(times).to.eql('10 times');
        done();
      });
    });

    it('should take a load hoc and fire 15 times', (done) => {
      const eventSpy = sinon.spy();
      document.addEventListener('click', eventSpy);
      const clip = load('click', document, center());
      spray(clip, {
        steps: 15
      }).then(() => {
        const times = eventSpy.printf('%c');
        expect(eventSpy.called).to.be.true;
        expect(times).to.eql('15 times');
        done();
      });
    });

    it('should take a load hoc and fire 4 times', (done) => {
      const eventSpy = sinon.spy();
      document.addEventListener('click', eventSpy);
      const clip = load('click', document, center());
      spray(clip, {
        steps: 4
      }).then(() => {
        const times = eventSpy.printf('%c');
        expect(eventSpy.called).to.be.true;
        expect(times).to.eql('4 times');
        done();
      });
    });

    it('should take a load hoc and fire 4 times and call path 3 times', (done) => {
      const eventSpy = sinon.spy();
      const pathSpy = sinon.spy();
      document.addEventListener('click', eventSpy);
      const clip = load('click', document, center());
      spray(clip, {
        steps: 4,
        path: pathSpy,
      }).then(() => {
        const eventTimes = eventSpy.printf('%c');
        const pathTimes = pathSpy.printf('%c');
        expect(eventSpy.called).to.be.true;
        expect(eventTimes).to.eql('4 times');
        expect(pathSpy.called).to.be.true;
        expect(pathTimes).to.eql('thrice');
        done();
      });
    });

    describe('should update clientX and clientY path', () => {
      it('when it it a function', (done) => {
        const { clientX: centerX, clientY: centerY } = center();
        const clip = load('click', document, center());
        spray(clip, {
          steps: 4,
          path: ({clientX, clientY}) => {
            return {
              clientX: clientX + 5,
              clientY: clientY + 1,
            };
          },
        }).then(({clientX, clientY}) => {
          expect(clientX).to.eql(Math.floor(centerX + 15));
          expect(clientY).to.eql(Math.floor(centerY + 3));
          done();
        });
      });

      it('when it it an object', (done) => {
        const { clientX: centerX, clientY: centerY } = center();
        const clip = load('click', document, center());
        spray(clip, {
          steps: 4,
          path: {clientX: 5, clientY: 2},
        }).then(({clientX, clientY}) => {
          expect(clientX).to.eql(Math.floor(centerX + 15));
          expect(clientY).to.eql(Math.floor(centerY + 6));
          done();
        });
      });
    });

    it('should call tick after each event', (done) => {
      const eventSpy = sinon.spy();
      const tickSpy = sinon.spy();
      document.addEventListener('click', eventSpy);
      const clip = load('click', document, center());
      spray(clip, {
        steps: 4,
        tick: tickSpy,
      }).then(() => {
        const eventTimes = eventSpy.printf('%c');
        const pathTimes = tickSpy.printf('%c');
        expect(eventSpy.called).to.be.true;
        expect(eventTimes).to.eql('4 times');
        expect(tickSpy.called).to.be.true;
        expect(pathTimes).to.eql('4 times');
        done();
      });
    });

    it('should return if true is returned from tick', () => {

    });

    describe('KeyboardEvent', () => {
      it('should fire multiple keys in a sequence from path function', (done) => {
        const keysPressed = [];
        const clip = load('keypress', document, keyCode('a'));
        spray(clip, {
          steps: 4,
          path: ({key}) => {
            return {
              key: parseInt(key, 10) + 1
            };
          },
          tick: ({key}) => {
            keysPressed.push(keyCode(parseInt(key, 10)).key);
          },
        }).then(() => {
          expect(keysPressed).to.deep.eql(['a', 'b', 'c', 'd']);
          done();
        });
      });

      it('should fire multiple keys in a sequence from path array', (done) => {
        const keysPressed = [];
        const convertKeys = (...keys) => keys.map(key => keyCode(key));
        const convertedKeys = convertKeys('a', 'b', 'c', 'd');

        const clip = load('keypress', document, keyCode('a'));
        spray(clip, {
          steps: 4,
          path: convertedKeys,
          tick: ({key}) => {
            keysPressed.push(keyCode(key).key);
          },
        }).then(() => {
          expect(keysPressed).to.deep.eql(['a', 'b', 'c', 'd']);
          done();
        });
      });
    });

    describe('TouchEvent', () => {

    });

    describe('should run', () => {
      it('a pinch event', () => {

      });

      it('a move event', (done) => {
        const { clientX: centerX, clientY: centerY } = center();
        fire('MouseEvent', 'moveenter', document, center());
        const clip = load('MouseEvent', 'mousemove', document, center());
        spray(clip, {
          steps: 4,
          path: {clientX: 5, clientY: 2},
        }).then(({clientX, clientY}) => {
          expect(clientX).to.eql(Math.floor(centerX + (3 * 5)));
          expect(clientY).to.eql(Math.floor(centerY + (3 * 2)));
          fire('moveleave', document, {clientX, clientY});
          done();
        });
      });
    });
  });
});
