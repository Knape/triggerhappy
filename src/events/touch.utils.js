// @flow

import { filterDefaults, isElement, hasTouchSupport } from '../utils/helpers.utils';
import eventProps from './event-props';

/**
 * Sets the props for a Touch Node.
 *
 * @param {Object} point
 * @param {HTMLElement} element
 */
const createTouchData = (
  point: Object,
  element: HTMLElement | Document | null = null
): Object => (
  filterDefaults(eventProps.Touch, Object.assign({}, {
    identifier: Date.now(),
    target: element
  }, point))
);

/**
 * Loops over all poitns and creates a touch interface for each object
 *
 * @param {Array} points
 */
export const createTouches = (
  ...points: Array<Object>
): Object => {
  const touches = (hasTouchSupport()) ?
    points.map(p => new Touch(createTouchData(p))) :
    points.map(p => createTouchData(p));

  return {
    touches,
    targetTouches: touches,
    changedTouches: touches,
  };
};

/**
 * Create a custom Touch Node.
 *
 * @param {HTMLElement} element
 * @param {Object} options
 */
export const createTouch = (
  element: HTMLElement | Document,
  options: Object
): Object => {
  if (!isElement(element)) {
    console.warn('No element was passed to touch, setting document as touch point');
    element = document; // eslint-disable-line
  }

  const touches = (hasTouchSupport()) ?
    new Touch(createTouchData(options, element)) :
    createTouchData(options, element);

  return {
    touches: [touches],
    targetTouches: [touches],
    changedTouches: [touches],
  };
};

export default createTouches;
