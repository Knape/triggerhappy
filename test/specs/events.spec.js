/* globals it, describe, before, beforeEach, expect, chai, sinonChai, sinon, fixture */
/* eslint no-unused-expressions: 0 */

import createEvent, {
  customEvent,
  mouseEvent,
  keybordEvent,
  touchEvent
} from '../../src/event';

import {
  position, touches
} from '../../src/utils';

import defaults from '../../src/defaults';
import props from '../../src/event-props';

const hasKeys = obj => m => Object.keys(obj).find(o => m === o);

const attachProps = obj => (acc, m) => Object.assign(acc, { [m]: obj[m] });

let element;

describe('event', () => {
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

  it('should be a fucntions', () => {
    expect(typeof createEvent).to.eql('function');
    expect(typeof customEvent).to.eql('function');
    expect(typeof mouseEvent).to.eql('function');
    expect(typeof keybordEvent).to.eql('function');
    expect(typeof touchEvent).to.eql('function');
  });

  describe('createEvent should', () => {
    it('create a mouse click event with defaults if no args are passed', () => {
      const createdEvent = createEvent()();
      // const hasAllKeys = props.MouseEvent.every(hasKeys(createdEvent));
      // const d = props.MouseEvent.reduce(attachProps(defaults), {});
      // d.isTrusted = true;
      // expect(hasAllKeys).to.eql(true);
      // expect(Object.keys(createdEvent).sort()).to.eql(Object.keys(d).sort());
      expect(createdEvent.type).to.eql('click');
    });

    it('create a mouse click event if falsy event is passed', () => {
      const createdEvent = createEvent('MouseEvent1')();
      expect(createdEvent.type).to.eql('click');
    });

    it('create a mouse click event if mouseEvent is passed', () => {
      const createdEvent = createEvent('MouseEvent')();
      expect(createdEvent.type).to.eql('click');
    });

    it('create a keybord keypress event with defaults if only KeybordEvent is passed', () => {
      const createdEvent = createEvent('KeyboardEvent')();
      expect(createdEvent.type).to.eql('keypress');
    });

    it('create a touch touchstart event with defaults if only TouchEvent is passed', () => {
      const createdEvent = createEvent('TouchEvent')();
      expect(createdEvent.type).to.eql('touchstart');
    });
  });

  describe('TouchEvent should', () => {
    it('contain a touch node with correct keys', () => {
      const createdEvent = createEvent('TouchEvent')('touchstart', document, {});
      expect(createdEvent.touches).to.be.an.array;
    });

    it('convert passed clientX, clientY etc to be inside touch Node', () => {
      const createdEvent = createEvent('TouchEvent')('touchstart', document, {
        clientX: 10,
        clientY: 10
      });
      expect(createdEvent.touches).to.be.an.array;
      expect(createdEvent.touches.length).to.eql(1);
      expect(createdEvent.touches[0].clientX).to.eql(10);
    });
    // 
    // it('allow to pass multiple touches inside touch node', () => {
    //   const createdEvent = createEvent('TouchEvent')('touchstart', document, {
    //     touches: [{
    //       clientX: 10,
    //       clientY: 10
    //     }, {
    //       clientX: 20,
    //       clientY: 20
    //     }]
    //   });
    //   expect(createdEvent.touches).to.be.an.array;
    //   expect(createdEvent.touches.length).to.eql(2);
    //   expect(createdEvent.touches[0].clientX).to.eql(10);
    //   expect(createdEvent.touches[1].clientX).to.eql(20);
    // });

    it('allow to pass multiple touches inside touch node', () => {
      const createdEvent = createEvent('TouchEvent')('touchstart', document, touches(position(), position()));
      expect(createdEvent.touches).to.be.an.array;
      expect(createdEvent.touches.length).to.eql(2);
      expect(createdEvent.touches[0].clientX).to.eql(0);
      expect(createdEvent.touches[0].target).to.eql(document);
      expect(createdEvent.touches[1].clientX).to.eql(0);
      expect(createdEvent.touches[1].target).to.eql(document);
    });
  });
});
