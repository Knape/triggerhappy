'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.position = exports.center = undefined;

var _helpers = require('./helpers.utils');

/**
 * Helper function to get x and y position + height and width of a given element,
 * If scroll is passed we also include the current scroll positon in our result
 *
 * @param {Node} element
 * @param {boolean} scroll
**/
var getPosition = function getPosition(element) {
  var isEl = (0, _helpers.isElement)(element);
  var rect = element instanceof HTMLElement ? element.getBoundingClientRect() : {};
  return function (scroll) {
    var scrollTop = scroll && document && document.body ? document.body.scrollTop : 0;
    var scrollLeft = scroll && document && document.body ? document.body.scrollLeft : 0;
    var _window = window,
        innerHeight = _window.innerHeight,
        innerWidth = _window.innerWidth;

    return !isEl ? {
      y: scrollTop,
      x: scrollLeft,
      w: innerWidth,
      h: innerHeight
    } : {
      y: rect.top + scrollTop,
      x: rect.left + scrollLeft,
      w: rect.width,
      h: rect.height
    };
  };
};

/**
 * Get the center of the passed DOM element
 *
 * @param {Node} element
**/


var center = exports.center = function center() {
  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

  var elementPosition = getPosition(element);

  var _elementPosition = elementPosition(false),
      clientX = _elementPosition.x,
      clientY = _elementPosition.y,
      w = _elementPosition.w,
      h = _elementPosition.h;

  var _elementPosition2 = elementPosition(true),
      pageX = _elementPosition2.x,
      pageY = _elementPosition2.y;

  return {
    clientX: clientX + w / 2,
    clientY: clientY + h / 2,
    pageX: pageX + w / 2,
    pageY: pageY + h / 2,
    target: element
  };
};

/**
 * Get a given position of the passed DOM element in procent
 *
 * @param {Node} element
 * @param {Object} obj
**/
var position = exports.position = function position() {
  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { x: 0, y: 0 };

  var elementPosition = getPosition(element);

  var _elementPosition3 = elementPosition(false),
      clientX = _elementPosition3.x,
      clientY = _elementPosition3.y,
      w = _elementPosition3.w,
      h = _elementPosition3.h;

  var _elementPosition4 = elementPosition(true),
      pageX = _elementPosition4.x,
      pageY = _elementPosition4.y;

  return {
    clientX: clientX + w / 100 * obj.x,
    clientY: clientY + h / 100 * obj.y,
    pageX: pageX + w / 100 * obj.x,
    pageY: pageY + h / 100 * obj.y,
    target: element
  };
};