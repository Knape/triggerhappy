// @flow

import keycode from 'keycode';

export const isElement = (
  element: HTMLElement | Document
): boolean => (
  element && element instanceof HTMLElement
);

/**
 * Check if all the keys exist inside an object and return true or false
 *
 * @param {Object} obj
 * @param {Array<string>} props
**/
export const hasKeys = (obj: Object, ...props: Array<string>): boolean => {
  const keys = Object.keys(obj);
  return props.every(prop => keys.find(k => prop === k && obj[k]));
};

/**
 * Helper function to get x and y position + height and width of a given element,
 * If scroll is passed we also include the current scroll positon in our result
 *
 * @param {Node} element
 * @param {boolean} scroll
**/
const getPosition = (element: HTMLElement | Document): Function => {
  const isEl = isElement(element);
  const rect = element instanceof HTMLElement ? element.getBoundingClientRect() : {};
  return (scroll: boolean): Object => {
    const scrollTop = (scroll && document && document.body) ? document.body.scrollTop : 0;
    const scrollLeft = (scroll && document && document.body) ? document.body.scrollLeft : 0;
    const { innerHeight, innerWidth } = window;
    return (!isEl) ? {
      y: scrollTop,
      x: scrollLeft,
      w: innerWidth,
      h: innerHeight
    } : {
      y: rect.top + scrollTop,
      x: rect.left + scrollLeft,
      w: rect.width,
      h: rect.height,
    };
  };
};

/**
 * Get the center of the passed DOM element
 *
 * @param {Node} element
**/
export const center = (element: HTMLElement | Document = document) => {
  const elementPosition = getPosition(element);
  const { x: clientX, y: clientY, w, h } = elementPosition(false);
  const { x: pageX, y: pageY } = elementPosition(true);
  return {
    clientX: clientX + (w / 2),
    clientY: clientY + (h / 2),
    pageX: pageX + (w / 2),
    pageY: pageY + (h / 2),
    target: element
  };
};

/**
 * Get a given position of the passed DOM element in procent
 *
 * @param {Node} element
 * @param {Object} obj
**/
export const position = (
  element: HTMLElement | Document = document,
  obj: Object = { x: 0, y: 0}
): Object => {
  const elementPosition = getPosition(element);
  const { x: clientX, y: clientY, w, h } = elementPosition(false);
  const { x: pageX, y: pageY } = elementPosition(true);
  return {
    clientX: clientX + ((w / 100) * obj.x),
    clientY: clientY + ((h / 100) * obj.y),
    pageX: pageX + ((w / 100) * obj.x),
    pageY: pageY + ((h / 100) * obj.y),
    target: element
  };
};

export const touches = (...points: Array<Object>): Object => {
  // const t = points.map((p, i) => new Touch(Object.assign({}, p, { identifier: i})));
  // Revert back to plain object untill we have a proper way to handle touch in firefox
  const t = points.map((p, i) => Object.assign({}, p, { identifier: i}));
  return {
    touches: t,
    targetTouches: t,
    changedTouches: t,
  };
};

export const keyCode = (
  key: number | string,
  options: Object = {}
): Object => {
  const isString = isNaN(parseInt(key, 10));
  const transformedKey = isString ? key : parseInt(key, 10);
  return Object.assign({}, options, {
    key: keycode(transformedKey).toString()
  });
};

export const mergeArrayObjects = (acc: Object, next: Object) => {
  return Object.assign({}, acc, next);
};

export const first = (array: Array<any>): any => array[0];
