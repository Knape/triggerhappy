'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTouch = exports.createTouches = undefined;

var _helpers = require('../utils/helpers.utils');

var _eventProps = require('./event-props');

var _eventProps2 = _interopRequireDefault(_eventProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Sets the props for a Touch Node.
 *
 * @param {Object} point
 * @param {HTMLElement} element
 */
var createTouchData = function createTouchData(point) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return (0, _helpers.filterDefaults)(_eventProps2.default.Touch, Object.assign({}, {
    identifier: Date.now(),
    target: element
  }, point));
};

/**
 * Loops over all poitns and creates a touch interface for each object
 *
 * @param {Array} points
 */
var createTouches = exports.createTouches = function createTouches() {
  for (var _len = arguments.length, points = Array(_len), _key = 0; _key < _len; _key++) {
    points[_key] = arguments[_key];
  }

  var touches = (0, _helpers.hasTouchSupport)() ? points.map(function (p) {
    return new Touch(createTouchData(p));
  }) : points.map(function (p) {
    return createTouchData(p);
  });

  return {
    touches: touches,
    targetTouches: touches,
    changedTouches: touches
  };
};

/**
 * Create a custom Touch Node.
 *
 * @param {HTMLElement} element
 * @param {Object} options
 */
var createTouch = exports.createTouch = function createTouch(element, options) {
  if (!(0, _helpers.isElement)(element)) {
    console.warn('No element was passed to touch, setting document as touch point');
    element = document; // eslint-disable-line
  }

  var touches = (0, _helpers.hasTouchSupport)() ? new Touch(createTouchData(options, element)) : createTouchData(options, element);

  return {
    touches: [touches],
    targetTouches: [touches],
    changedTouches: [touches]
  };
};

exports.default = createTouches;