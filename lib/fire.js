'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = exports.fire = exports.logDeprecationWarning = undefined;

var _event = require('./events/event');

var _event2 = _interopRequireDefault(_event);

var _position = require('./utils/position.utils');

var _helpers = require('./utils/helpers.utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isOldArgStyle = function isOldArgStyle(el) {
  return typeof el !== 'string';
};

var logDeprecationWarning = exports.logDeprecationWarning = function logDeprecationWarning(method) {
  console.warn('You are passing a deprecated argument style to ' + method);
  console.warn('Please update your code to the latest API');
  console.warn('This will result in an error in the next version');
};

/**
 *
 * As we have two ways of passing arguents to both fire and load
 * we need to convert them to the same argumentstyle
 *
 * @param {String} eventName
 * @param {String} eventType
 * @param {Node} element
 * @param {Array} rest
 *
**/
var createEventWrapper = function createEventWrapper() {
  for (var _len = arguments.length, rest = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    rest[_key - 3] = arguments[_key];
  }

  var eventName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'MouseEvent';
  var eventType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'click';
  var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;

  var opts = rest.reduce(_helpers.mergeArrayObjects, {});
  // Append the correct client and page props to
  // the options object if we dont pass any
  if ((0, _helpers.isElement)(element) && !(0, _helpers.hasKeys)(opts, 'clientX', 'clientY')) {
    Object.assign(opts, (0, _position.position)(element));
  }

  // Create the custom event, dispatchit and then return the event
  var newEvent = (0, _event2.default)(eventName)(eventType, element, opts);
  element.dispatchEvent(newEvent);
  return newEvent;
};

var fire = exports.fire = function fire() {
  for (var _len2 = arguments.length, rest = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    rest[_key2 - 2] = arguments[_key2];
  }

  var eventType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'click';
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

  var isNewStyle = isOldArgStyle(element);

  if (!isNewStyle) logDeprecationWarning('fire');

  // If we are passing arguments as the new style we
  // need to find out what constructor we will use
  var eventName = isNewStyle ? (0, _event.getEventType)(eventType) : eventType;

  // Create the correct event beased on how we suppyly our arguments
  return typeof element !== 'string' ? createEventWrapper(eventName, eventType, element, rest) : createEventWrapper(eventName, element, rest[0], rest.slice(1));
};

/**
 * Load Instance, works as fire but waiths for the spray method to call it.
 *
 * @param {String} eventName
 * @param {String} eventType
 * @param {Node} element
 * @param {Object} options
**/
var load = exports.load = function load() {
  for (var _len3 = arguments.length, rest = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
    rest[_key3 - 2] = arguments[_key3];
  }

  var eventType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'click';
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

  return function () {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return new Promise(function (resolve) {
      setTimeout(function () {
        var isNewStyle = isOldArgStyle(element);

        if (!isNewStyle) logDeprecationWarning('load');

        // If we are passing arguments as the new style we
        // need to find out what constructor we will use
        var eventName = isNewStyle ? (0, _event.getEventType)(eventType) : eventType;

        // Depending on what kind of arguments style we are using
        // we nned to assign the correct argument to options
        var options = isNewStyle ? Object.assign({}, rest.reduce(_helpers.mergeArrayObjects, {}), opt) : Object.assign({}, rest.slice(1).reduce(_helpers.mergeArrayObjects, {}), opt);

        // Create the correct event beased on how we suppyly our arguments
        var event = typeof element !== 'string' ? // Otherwise flow compains
        createEventWrapper(eventName, eventType, element, options) : createEventWrapper(eventName, element, rest[0], options);
        resolve({ event: event, eventName: eventName });
      }, opt.speed || 0);
    });
  };
};