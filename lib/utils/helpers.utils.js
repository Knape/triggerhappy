'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Check if passed argument is an element,
 * in case of passed document as argument this should fail
 *
 * @param {HTMLElement} element
**/
var isElement = exports.isElement = function isElement(element) {
  return element && element instanceof HTMLElement;
};

/**
 * Check if all the keys exist inside an object and return true or false
 *
 * @param {Object} obj
 * @param {Array<string>} props
**/
var hasKeys = exports.hasKeys = function hasKeys(obj) {
  for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    props[_key - 1] = arguments[_key];
  }

  return props.every(function (prop) {
    return Object.keys(obj).find(function (k) {
      return prop === k && obj[k];
    });
  });
};

/**
 * Merge multiple array object together
 *
 * @param {Object} acc
 * @param {Object} next
**/
var mergeArrayObjects = exports.mergeArrayObjects = function mergeArrayObjects(acc, next) {
  var toMerge = Array.isArray(next) ? next : [next];
  return Object.assign.apply(Object, [{}, acc].concat(_toConsumableArray(toMerge)));
};

/**
 * Get the first Object inside an array
 *
 * @param {Array} array
**/
var first = exports.first = function first(array) {
  return array[0];
};

/**
 * Select correct event props based on event type
 *
 * @param {String} type
 * @param {Object} options
 */
var filterDefaults = exports.filterDefaults = function filterDefaults(props, options) {
  return props.reduce(function (acc, key) {
    return Object.assign(acc, _defineProperty({}, key, options[key]));
  }, {});
};

/**
 * Match two object against each other and return a new object
 *
 * @param {String} type
 * @param {Object} options
 */
var matchAndAddition = exports.matchAndAddition = function matchAndAddition() {
  var extObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (acc, key) {
    switch (_typeof(base[key])) {
      case 'string':
        acc[key] = extObj[key] || base[key]; // eslint-disable-line
        break;
      case 'number':
        acc[key] = key !== 'key' ? // eslint-disable-line
        base[key] + extObj[key] || 0 : extObj[key] || 0;
        break;
      default:
        acc[key] = base[key]; // eslint-disable-line
    }
    return acc;
  };
};

/**
 * Small helpers to detect if we have our constructor functions
 */
var hasTouchSupport = exports.hasTouchSupport = function hasTouchSupport() {
  return typeof Touch !== 'undefined';
};
var hasTouchEventSupport = exports.hasTouchEventSupport = function hasTouchEventSupport() {
  return typeof TouchEvent !== 'undefined';
};
var hasKeyboardEventSupport = exports.hasKeyboardEventSupport = function hasKeyboardEventSupport() {
  return typeof KeyboardEvent !== 'undefined';
};
var hasMouseEventSupport = exports.hasMouseEventSupport = function hasMouseEventSupport() {
  return typeof MouseEvent !== 'undefined';
};