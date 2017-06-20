// @flow

import events, { getEventType } from './events/event';
import { isElement, hasKeys, mergeArrayObjects } from './utils/helpers.utils';
import { position } from './utils/position.utils';

/**
 *
 * As we have two ways of passing arguents to both fire and load
 * we need to convert them to the same argumentstyle
 *
 * @param {String} eventName
 * @param {String} eventType
 * @param {Node} element
 * @param {Array} rest
 *
**/
const createEventWrapper = (
  eventName: string = 'MouseEvent',
  eventType: string = 'click',
  element: HTMLElement | Document = document,
  ...rest: Array<any>
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
    createEventWrapper(getEventType(triggerName), triggerName, element, rest) :
    createEventWrapper(triggerName, element, rest[0], rest.slice(1));
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
          getEventType(triggerName) : triggerName;

        const options = (typeof element !== 'string') ?
          Object.assign({}, rest.reduce(mergeArrayObjects, {}), opt) :
          Object.assign({}, rest.slice(1).reduce(mergeArrayObjects, {}), opt);

        const event = (typeof element !== 'string') ?
          createEventWrapper(eventName, triggerName, element, options) :
          createEventWrapper(eventName, element, rest[0], options);
        resolve({ event, eventName });
      }, opt.speed || 0);
    });
  };
};
