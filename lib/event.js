'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterDef = exports.touchEvent = exports.keybordEvent = exports.mouseEvent = exports.customEvent = exports.filterDefaults = undefined;

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _eventProps = require('./event-props');

var _eventProps2 = _interopRequireDefault(_eventProps);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fixKeyCode = function fixKeyCode(e, options) {
  // eslint-disable-line
  // http://stackoverflow.com/a/10520017
  if (e.keyCode !== options.key) {
    Object.defineProperty(e, 'keyCode', {
      get: function get() {
        return options.key;
      }
    });
    Object.defineProperty(e, 'charCode', {
      get: function get() {
        return options.key;
      }
    });
    Object.defineProperty(e, 'which', {
      get: function get() {
        return options.key;
      }
    });
    Object.defineProperty(e, 'shiftKey', {
      get: function get() {
        return options.shift;
      }
    });
  }
};

var createEventType = function createEventType() {
  var eventName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'MouseEvent';
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'click';
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  // eslint-disable-line
  var eventNames = {
    MouseEvent: MouseEvent,
    KeyboardEvent: KeyboardEvent,
    TouchEvent: TouchEvent
  };
  return new eventNames[eventName](type, props);
};

/**
 * Create a custom event
 * We will use this function untill createEventType is 100% working
 *
 * @param {String} eventName
 * @param {String} type
 * @param {Object} options
 */
var createCustomEventType = function createCustomEventType(eventName, type, props) {
  var event = document.createEvent('Event');
  Object.keys(props).forEach(function (key) {
    event[key] = props[key];
  });
  event.initEvent(type, true, true);
  return event;
};

/**
 * Select correct event props based on event type
 *
 * @param {String} type
 * @param {Object} options
 */
var filterDefaults = exports.filterDefaults = function filterDefaults(type, options) {
  var props = _eventProps2.default[type].reduce(function (acc, key) {
    return Object.assign(acc, _defineProperty({}, key, options[key]));
  }, {});
  return props;
};

/**
 * Create a custom Touch Node.
 *
 * @param {HTMLElement} element
 * @param {Object} options
 */
var createTouch = function createTouch(element, options) {
  if (!(0, _utils.isElement)(element)) {
    console.warn('No element was passed to touch, setting document as touch point');
    element = document; // eslint-disable-line
  }

  var eventParams = filterDefaults('Touch', Object.assign({}, options, {
    identifier: Date.now(),
    target: element
  }));

  return new Touch(eventParams);
};

/**
 * Create a custom event.
 *
 * @param {String} type
 */
var createEvent = function createEvent() {
  var eventType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'MouseEvent';

  return function () {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'click';
    var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    // If wrong or misspelled eventtype is passed we need to set it to a defaults
    if (!_defaults.eventMap[eventType]) {
      console.warn('Event type does not exist: ' + eventType);
      console.warn('Setting event type to default MouseEvent');
      eventType = 'MouseEvent'; // eslint-disable-line
    }

    // Instead of just exiting the event, set our type to the default
    if (!_defaults.eventMap[eventType].find(function (e) {
      return e === type;
    })) {
      console.warn('Event interface does not contained passed event: ' + type);
      console.warn('Setting event to default (' + (0, _utils.first)(_defaults.eventMap[eventType]) + ') for ' + eventType);
      type = (0, _utils.first)(_defaults.eventMap[eventType]); // eslint-disable-line
    }

    // Grab the correct event type
    // Attach the default keys/values to the event and then filter and extend
    // it with the passed options values
    var props = filterDefaults(eventType, Object.assign({}, {
      type: type,
      element: element
    }, _defaults2.default, options));

    if (eventType === 'TouchEvent' && !props.touches.length) {
      props.touches = [createTouch(element, options)];
    }

    // Lets create the event
    // TODO - Maybe change this to a custom event for each type
    // const event = createEventType(eventType, type, props);
    var event = createCustomEventType(eventType, type, props);

    return event;
  };
};

exports.default = createEvent;
var customEvent = exports.customEvent = createEvent();
var mouseEvent = exports.mouseEvent = createEvent('MouseEvent');
var keybordEvent = exports.keybordEvent = createEvent('KeybordEvent');
var touchEvent = exports.touchEvent = createEvent('TouchEvent');

// for testing
var filterDef = exports.filterDef = filterDefaults;