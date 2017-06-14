// @flow

import { isElement } from './helpers.utils';

/**
 * Helper function to get x and y position + height and width of a given element,
 * If scroll is passed we also include the current scroll positon in our result
 *
 * @param {Node} element
 * @param {boolean} scroll
**/
const getPosition = (
  element: HTMLElement | Document
): Function => {
  const isEl = isElement(element);
  const rect = isEl ? element.getBoundingClientRect() : {};
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
export const center = (
  element: HTMLElement | Document = document,
  options: Object = {
    floor: true
  }
) => {
  const elementPosition = getPosition(element);
  const { x: clientX, y: clientY, w, h } = elementPosition(false);
  const { x: pageX, y: pageY } = elementPosition(true);
  return {
    clientX: options.floor ? Math.floor(clientX + (w / 2)) : clientX + (w / 2),
    clientY: options.floor ? Math.floor(clientY + (h / 2)) : clientY + (h / 2),
    pageX: options.floor ? Math.floor(pageX + (w / 2)) : pageX + (w / 2),
    pageY: options.floor ? Math.floor(pageY + (h / 2)) : pageY + (h / 2),
    target: element
  };
};

/**
 * Get a given position of the passed DOM element in procent
 *
 * @param {Node} element
 * @param {Object} options
**/
export const position = (
  element: HTMLElement | Document = document,
  options: Object = { x: 0, y: 0, floor: true }
): Object => {
  const elementPosition = getPosition(element);
  const { x: clientX, y: clientY, w, h } = elementPosition(false);
  const { x: pageX, y: pageY } = elementPosition(true);
  return {
    clientX: options.floor ? Math.floor(clientX + ((w / 100) * options.x)) : clientX + ((w / 100) * options.x),
    clientY: options.floor ? Math.floor(clientY + ((h / 100) * options.y)) : clientY + ((h / 100) * options.y),
    pageX: options.floor ? Math.floor(pageX + ((w / 100) * options.x)) : pageX + ((w / 100) * options.x),
    pageY: options.floor ? Math.floor(pageY + ((h / 100) * options.y)) : pageY + ((h / 100) * options.y),
    target: element
  };
};
