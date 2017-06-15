'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spray = exports.load = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _event = require('./events/event');

var _event2 = _interopRequireDefault(_event);

var _eventProps = require('./events/event-props');

var _eventProps2 = _interopRequireDefault(_eventProps);

var _helpers = require('./utils/helpers.utils');

var _position = require('./utils/position.utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Fire path callback function if its defined otherwise take the path
 * object/array and return it as an increment
 *
 * @param {Function} path
 * @param {Event} event
**/
var handlePathObj = function handlePathObj(path, event, EventObject, newIndex) {
  if (typeof path === 'function') {
    return path(event, newIndex);
  } else if ((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && !Array.isArray(path) && path) {
    return EventObject.reduce((0, _helpers.matchAndAddition)(path, event), {});
  } else if ((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && Array.isArray(path) && path) {
    return EventObject.reduce((0, _helpers.matchAndAddition)(path[newIndex], event), {});
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
  return instances(options).then(function (_ref) {
    var event = _ref.event,
        eventName = _ref.eventName;

    var shouldExit = typeof options.tick === 'function' ? options.tick(event, index) : false;

    var newIndex = index + 1;
    // if we havent reached the end of our cycle return a new caller
    // otherwise just exit the recursive function
    var eventObj = _eventProps2.default[eventName];
    return newIndex >= options.steps || shouldExit ? event : caller(instances, newIndex, Object.assign({}, options, handlePathObj(options.path, event, eventObj, newIndex)));
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
  for (var _len = arguments.length, rest = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    rest[_key - 3] = arguments[_key];
  }

  var eventName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'MouseEvent';
  var triggerName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'click';
  var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;

  return function () {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return new Promise(function (resolve) {
      setTimeout(function () {
        var options = rest.reduce(_helpers.mergeArrayObjects, {});
        // If we pass an element but without specifying its positoin we need
        // to calculate clientX and clientY relative to passed element
        if ((0, _helpers.isElement)(element) && !(0, _helpers.hasKeys)(options, 'clientX', 'clientY')) {
          Object.assign(options, (0, _position.position)(element));
        }

        var combinedOpts = Object.assign({}, options, opt);
        var event = (0, _event2.default)(eventName)(triggerName, element, combinedOpts);
        element.dispatchEvent(event);
        resolve({
          event: event,
          eventName: eventName
        });
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