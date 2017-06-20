// @flow

import events, { getEventType } from './events/event';
import { position } from './utils/position.utils';

import {
  isElement,
  hasKeys,
  mergeArrayObjects,
} from './utils/helpers.utils';


const isOldArgStyle = el => typeof el !== 'string';

export const logDeprecationWarning = (method: string): void => {
  console.warn(`You are passing a deprecated argument style to ${method}`);
  console.warn('Please update your code to the latest API');
  console.warn('This will result in an error in the next version');
};

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
  eventType: string = 'click',
  element: HTMLElement | Document | string = document,
  ...rest: Array<Object | HTMLElement | Document>
): Event => {
  const isNewStyle = isOldArgStyle(element);

  if (!isNewStyle) logDeprecationWarning('fire');

  // If we are passing arguments as the new style we
  // need to find out what constructor we will use
  const eventName = (isNewStyle) ?
    getEventType(eventType) : eventType;

  // Create the correct event beased on how we suppyly our arguments
  return (typeof element !== 'string') ?
    createEventWrapper(eventName, eventType, element, rest) :
    createEventWrapper(eventName, element, rest[0], rest.slice(1));
};

/**
 * Load Instance, works as fire but waiths for the spray method to call it.
 *
 * @param {String} eventName
 * @param {String} eventType
 * @param {Node} element
 * @param {Object} options
**/
export const load = (
  eventType: string = 'click',
  element: HTMLElement | Document | string = document,
  ...rest: Array<Object | HTMLElement | Document>
): Function => {
  return (opt: Object = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isNewStyle = isOldArgStyle(element);

        if (!isNewStyle) logDeprecationWarning('load');

        // If we are passing arguments as the new style we
        // need to find out what constructor we will use
        const eventName = (isNewStyle) ?
          getEventType(eventType) : eventType;

        // Depending on what kind of arguments style we are using
        // we nned to assign the correct argument to options
        const options = (isNewStyle) ?
          Object.assign({}, rest.reduce(mergeArrayObjects, {}), opt) :
          Object.assign({}, rest.slice(1).reduce(mergeArrayObjects, {}), opt);

        // Create the correct event beased on how we suppyly our arguments
        const event = (typeof element !== 'string') ? // Otherwise flow compains
          createEventWrapper(eventName, eventType, element, options) :
          createEventWrapper(eventName, element, rest[0], options);
        resolve({ event, eventName });
      }, opt.speed || 0);
    });
  };
};
