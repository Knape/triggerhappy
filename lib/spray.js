'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spray = exports.load = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _event = require('./event');

var _event2 = _interopRequireDefault(_event);

var _helpers = require('./utils/helpers.utils');

var _position = require('./utils/position.utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchAndAddition = function matchAndAddition() {
  var extObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (acc, key) {
    switch (_typeof(acc[key])) {
      case 'string':
        acc[key] = extObj[key] || acc[key]; // eslint-disable-line
        break;
      case 'number':
        acc[key] = key !== 'key' ? // eslint-disable-line
        acc[key] + extObj[key] || 0 : extObj[key] || 0;
        break;
      default:
    }
    return acc;
  };
};

/**
 * Fire path callback function if its defined otherwise take the path
 * object/array and return it as an increment
 *
 * @param {Function} path
 * @param {Event} event
**/
var handlePathObj = function handlePathObj(path, event, newIndex) {
  if (typeof path === 'function') {
    return path(event);
  } else if ((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && !Array.isArray(path) && path) {
    return Object.keys(event).reduce(matchAndAddition(path), event);
  } else if ((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && Array.isArray(path) && path) {
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
var caller = function caller(instances, index, options) {
  // at the moment we are only calling the first event,
  // but lets start prepare the api for managin an array of events
  return instances(options).then(function (event) {
    var shouldExit = typeof options.tick === 'function' ? options.tick(event) : false;

    var newIndex = index + 1;
    // if we havent reached the end of our cycle return a new caller
    // otherwise just exit the recursive function
    return newIndex >= options.steps || shouldExit ? event : caller(instances, newIndex, Object.assign({}, options, handlePathObj(options.path, event, newIndex)));
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
var load = exports.load = function load() {
  var eventName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'MouseEvent';
  var triggerName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'click';
  var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  return function () {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return new Promise(function (resolve) {
      setTimeout(function () {
        // If we pass an element but without specifying its positoin we need
        // to calculate clientX and clientY relative to passed element
        if ((0, _helpers.isElement)(element) && !(0, _helpers.hasKeys)(options, 'clientX', 'clientY')) {
          Object.assign(options, (0, _position.position)(element));
        }

        var combinedOpts = Object.assign({}, options, opt);
        var newEvent = (0, _event2.default)(eventName)(triggerName, element, combinedOpts);
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
var spray = exports.spray = function spray(instance) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    speed: 100,
    steps: 10,
    path: null,
    tick: null
  };

  return caller(instance, 0, options);
};