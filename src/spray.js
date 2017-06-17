// @flow

import eventProps from './events/event-props';
import { matchAndAddition, } from './utils/helpers.utils';

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
  EventObject: Array<string>,
  newIndex: number
): Object => {
  if (typeof path === 'function') {
    return path(event, newIndex);
  } else if (typeof path === 'object' && !Array.isArray(path) && path) {
    return EventObject.reduce(matchAndAddition(path, event), {});
  } else if (typeof path === 'object' && Array.isArray(path) && path) {
    return EventObject.reduce(matchAndAddition(path[newIndex], event), {});
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
): Event | Function => {
  // at the moment we are only calling the first event,
  // but lets start prepare the api for managin an array of events
  return instances(options)
  .then(({event, eventName}) => {
    const shouldExit = (typeof options.tick === 'function') ?
      options.tick(event, index) :
      false;

    const newIndex = index + 1;
    // if we havent reached the end of our cycle return a new caller
    // otherwise just exit the recursive function
    const eventObj = eventProps[eventName];
    return (newIndex >= options.steps || shouldExit) ? event :
    caller(
      instances,
      newIndex,
      Object.assign({}, options, handlePathObj(options.path, event, eventObj, newIndex))
    );
  });
};

/**
 * Spray method.
 *
 * @param {Function, Array} instance
 * @param {Object} options
**/
export default (instance: Function, options: Object = {
  speed: 100,
  steps: 10,
  path: null,
  tick: null,
}): Event => {
  return caller(instance, 0, options);
};
