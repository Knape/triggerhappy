// @flow

import events from './events/event';
import { eventMap } from './events/defaults';
import { isElement, hasKeys, mergeArrayObjects, first } from './utils/helpers.utils';
import { position } from './utils/position.utils';

const getEvent = (triggerName: string): string => {
  const filteredKeys = Object
  .keys(eventMap)
  .filter(eventKey => eventMap[eventKey].find(name => name === triggerName));
  return first(filteredKeys, 'CustomEvent');
};

const createEventWrapperDepricated = (
  eventName: string = 'MouseEvent',
  eventType: string = 'click',
  element: HTMLElement | Document = document,
  ...rest: Array<Object>
): Event => {
  const opts = rest.reduce(mergeArrayObjects, {});
  // Append the correct client and page props to
  // the options object if we dont pass any
  if (isElement(element) && !hasKeys(opts, 'clientX', 'clientY')) {
    Object.assign(opts, position(element));
  }

  // Create the custom event, dispatchit and then return the event
  const newEvent = events(eventName)(eventType, element, opts);
  element.dispatchEvent(newEvent);
  return newEvent;
};

export const fire = (
  triggerName: string = 'click',
  element: HTMLElement | Document | string = document,
  ...rest: Array<Object | HTMLElement | Document>
): Event => {
  return (typeof element !== 'string') ?
    createEventWrapperDepricated(getEvent(triggerName), triggerName, element, rest) :
    createEventWrapperDepricated(triggerName, element, rest[0], rest.slice(1));
};

/**
 * Load Instance, works as fire but waiths for the spray method to call it.
 *
 * @param {String} eventName
 * @param {String} triggerName
 * @param {Node} element
 * @param {Object} options
**/
export const load = (
  triggerName: string = 'click',
  element: HTMLElement | Document | string = document,
  ...rest: Array<Object | HTMLElement | Document>
): Function => {
  return (opt: Object = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const eventName = (typeof element !== 'string') ?
          getEvent(triggerName) : triggerName;

        const options = (typeof element !== 'string') ?
          Object.assign({}, rest.reduce(mergeArrayObjects, {}), opt) :
          Object.assign({}, rest.slice(1).reduce(mergeArrayObjects, {}), opt);

        const event = (typeof element !== 'string') ?
          createEventWrapperDepricated(eventName, triggerName, element, options) :
          createEventWrapperDepricated(eventName, element, rest[0], options);
        resolve({ event, eventName });
      }, opt.speed || 0);
    });
  };
};
