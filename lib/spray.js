'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _eventProps = require('./events/event-props');

var _eventProps2 = _interopRequireDefault(_eventProps);

var _helpers = require('./utils/helpers.utils');

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
 * Spray method.
 *
 * @param {Function, Array} instance
 * @param {Object} options
**/

exports.default = function (instance) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    speed: 100,
    steps: 10,
    path: null,
    tick: null
  };

  return caller(instance, 0, options);
};