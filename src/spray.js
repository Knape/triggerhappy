// @flow

import events from './event';
import { position, isElement, hasKeys } from './utils';

const matchAndAddition = (extObj: Object = {}) => (acc, key) => {
  switch (typeof acc[key]) {
    case 'string':
      acc[key] = extObj[key] || acc[key]; // eslint-disable-line
      break;
    case 'number':
      acc[key] = (key !== 'key') ? // eslint-disable-line
        acc[key] + extObj[key] || 0 :
        extObj[key] || 0;
      break;
    default:
  }
  return acc;
};


/**
 * Fire path callback function if its defined otherwise take the path
 * object/array and return it as an increment
 *
 * @param {Function} path
 * @param {Event} event
**/
const handlePathObj = (
  path: Function | Object,
  event: MouseEvent | TouchEvent | KeyboardEvent,
  newIndex: number
): Object => {
  if (typeof path === 'function') {
    return path(event);
  } else if (typeof path === 'object' && !Array.isArray(path) && path) {
    return Object.keys(event).reduce(matchAndAddition(path), event);
  } else if (typeof path === 'object' && Array.isArray(path) && path) {
    return Object.keys(event).reduce(matchAndAddition(path[newIndex]), event);
  }
  return {};
};

/**
 * Recursive function to be called as many times as we defined the steps count
 *
 * @param {Array} instances
 * @param {Integer} index
 * @param {Object} options
**/
const caller = (
  instances: Function,
  index: number,
  options: Object,
): Event => {
  // at the moment we are only calling the first event,
  // but lets start prepare the api for managin an array of events
  return instances(options)
  .then((event: MouseEvent | TouchEvent | KeyboardEvent) => {
    const shouldExit = (typeof options.tick === 'function') ?
      options.tick(event) :
      false;

    const newIndex = index + 1;
    // if we havent reached the end of our cycle return a new caller
    // otherwise just exit the recursive function
    return (newIndex >= options.steps || shouldExit) ? event :
    caller(
      instances,
      newIndex,
      Object.assign({}, options, handlePathObj(options.path, event, newIndex))
    );
  });
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
  eventName: string = 'MouseEvent',
  triggerName: string = 'click',
  element: HTMLElement | Document = document,
  options: Object = {}
): Function => {
  return (opt: Object = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // If we pass an element but without specifying its positoin we need
        // to calculate clientX and clientY relative to passed element
        if (isElement(element) && !hasKeys(options, 'clientX', 'clientY')) {
          Object.assign(options, position(element));
        }

        const combinedOpts = Object.assign({}, options, opt);
        const newEvent = events(eventName)(triggerName, element, combinedOpts);
        element.dispatchEvent(newEvent);
        resolve(newEvent);
      }, opt.speed || 0);
    });
  };
};

/**
 * Spray method.
 *
 * @param {Function, Array} instance
 * @param {Object} options
**/
export const spray = (instance: Function, options: Object = {
  speed: 100,
  steps: 10,
  path: null,
  tick: null,
}): Event => {
  return caller(instance, 0, options);
};
