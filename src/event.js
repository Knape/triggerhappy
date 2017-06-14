// @flow

import defaults, { eventMap } from './defaults';
import eventProps from './event-props';
import { first, isElement } from './utils/helpers.utils';

const fixKeyCode = (e: KeyboardEvent, options: Object) => { // eslint-disable-line
  // http://stackoverflow.com/a/10520017
  if (e.keyCode !== options.key) {
    Object.defineProperty(e, 'keyCode', ({
      get: () => (options.key)
    }: Object));
    Object.defineProperty(e, 'charCode', ({
      get: () => (options.key)
    }: Object));
    Object.defineProperty(e, 'which', ({
      get: () => (options.key)
    }: Object));
    Object.defineProperty(e, 'shiftKey', ({
      get: () => (options.shift)
    }: Object));
  }
};

const createEventType = (eventName: string = 'MouseEvent', type: string = 'click', props: Object = {}) => { // eslint-disable-line
  const eventNames = {
    MouseEvent,
    KeyboardEvent,
    TouchEvent,
  };
  return new eventNames[eventName](type, props);
};

/**
 * Create a custom event
 * We will use this function untill createEventType is 100% working
 *
 * @param {String} eventName
 * @param {String} type
 * @param {Object} options
 */
const createCustomEventType = (eventName: string, type: string, props: Object) => {
  const event = document.createEvent('Event');
  Object.keys(props).forEach((key) => { event[key] = props[key]; });
  event.initEvent(type, true, true);
  return event;
};

/**
 * Select correct event props based on event type
 *
 * @param {String} type
 * @param {Object} options
 */
export const filterDefaults = (type: string, options: Object): Object => {
  const props = eventProps[type].reduce((acc, key) => (
    Object.assign(acc, { [key]: options[key] })
  ), {});
  return props;
};

/**
 * Create a custom Touch Node.
 *
 * @param {HTMLElement} element
 * @param {Object} options
 */
const createTouch = (element: HTMLElement | Document, options) => {
  if (!isElement(element)) {
    console.warn('No element was passed to touch, setting document as touch point');
    element = document; // eslint-disable-line
  }

  const eventParams = filterDefaults('Touch', Object.assign({}, options, {
    identifier: Date.now(),
    target: element
  }));

  // return new Touch(eventParams);
  // Revert back to plain object untill we have a proper way to handle touch in firefox
  return eventParams;
};

/**
 * Create a custom event.
 *
 * @param {String} type
 */
const createEvent = (eventType: string = 'MouseEvent'): Function => {
  return (type: string = 'click', element = document, options: Object = {}): Event => {
    // If wrong or misspelled eventtype is passed we need to set it to a defaults
    if (!eventMap[eventType]) {
      console.warn(`Event type does not exist: ${eventType}`);
      console.warn('Setting event type to default MouseEvent');
      eventType = 'MouseEvent'; // eslint-disable-line
    }

    // Instead of just exiting the event, set our type to the default
    if (!eventMap[eventType].find(e => e === type)) {
      console.warn(`Event interface does not contained passed event: ${type}`);
      console.warn(`Setting event to default (${first(eventMap[eventType])}) for ${eventType}`);
      type = first(eventMap[eventType]); // eslint-disable-line
    }

    // Grab the correct event type
    // Attach the default keys/values to the event and then filter and extend
    // it with the passed options values
    const props = filterDefaults(eventType, Object.assign({}, {
      type,
      element,
    }, defaults, options));

    if (eventType === 'TouchEvent' && !props.touches.length) {
      props.touches = [createTouch(element, options)];
    }

    // Lets create the event
    // TODO - Maybe change this to a custom event for each type
    // const event = createEventType(eventType, type, props);
    const event = createCustomEventType(eventType, type, props);

    return event;
  };
};

export default createEvent;

export const customEvent = createEvent();
export const mouseEvent = createEvent('MouseEvent');
export const keybordEvent = createEvent('KeybordEvent');
export const touchEvent = createEvent('TouchEvent');

// for testing
export const filterDef = filterDefaults;
