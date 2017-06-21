// @flow

import defaults, { eventMap } from './defaults';
import eventProps from './event-props';
import { createTouch } from './touch.utils';

import {
  first,
  filterDefaults,
  hasTouchEventSupport,
  hasMouseEventSupport,
  hasKeyboardEventSupport,
  hasFocusEventSupport,
  hasUIEventSupport,
  hasCustomEventSupport,
} from '../utils/helpers.utils';

export const getEventType = (triggerName: string): string => {
  const filteredKeys = Object
  .keys(eventMap)
  .filter(eventKey => eventMap[eventKey].find(name => name === triggerName));
  return first(filteredKeys, 'CustomEvent');
};

/**
 * Creates a Native Event and falls back to
 * document.createEvent if event does not exist
 *
 * @param {String} eventName
 * @param {String} type
 * @param {Object} options
 */
const createEventType = (
  eventName: string,
  type: string,
  props: Object
): Event => { // eslint-disable-line
  const eventNames = {
    MouseEvent: (hasMouseEventSupport()) ? MouseEvent : null,
    KeyboardEvent: (hasKeyboardEventSupport()) ? KeyboardEvent : null,
    TouchEvent: (hasTouchEventSupport()) ? TouchEvent : null,
    FocusEvent: (hasFocusEventSupport()) ? FocusEvent : null,
    UIEvent: (hasUIEventSupport()) ? UIEvent : null,
    CustomEvent: (hasCustomEventSupport()) ? CustomEvent : null,
  };

  if (!eventNames[eventName]) {
    const event = document.createEvent('Event');
    Object.keys(props).forEach((key) => { event[key] = props[key]; });
    event.initEvent(type, true, true);
    return event;
  }

  return new eventNames[eventName](type, props);
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
    if (!eventMap[eventType].find(e => e === type) && eventType !== 'CustomEvent') {
      console.warn(`Event interface does not contained passed event: ${type}`);
      console.warn(`Setting event to default (${first(eventMap[eventType])}) for ${eventType}`);
      type = first(eventMap[eventType]); // eslint-disable-line
    }

    // Grab the correct event type
    // Attach the default keys/values to the event and then filter and extend
    // it with the passed options values
    const props = filterDefaults(eventProps[eventType], Object.assign({}, {
      type,
      element,
    }, defaults, options));

    // Convert passed clientX, clientY etc to a touchlist
    // if event type is TouchEvent
    if (eventType === 'TouchEvent' && !props.touches.length) {
      const touches = createTouch(element, options);
      Object.assign(props, touches);
    }

    // Lets create the event
    const event = createEventType(eventType, type, props);

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
