'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterDef = exports.touchEvent = exports.keybordEvent = exports.mouseEvent = exports.customEvent = exports.getEventType = undefined;

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _eventProps = require('./event-props');

var _eventProps2 = _interopRequireDefault(_eventProps);

var _touch = require('./touch.utils');

var _keyboard = require('./keyboard.utils');

var _helpers = require('../utils/helpers.utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getEventType = exports.getEventType = function getEventType(triggerName) {
  var filteredKeys = Object.keys(_defaults.eventMap).filter(function (eventKey) {
    return _defaults.eventMap[eventKey].find(function (name) {
      return name === triggerName;
    });
  });
  return (0, _helpers.first)(filteredKeys, 'CustomEvent');
};

/**
 * Creates a Native Event and falls back to
 * document.createEvent if event does not exist
 *
 * @param {String} eventName
 * @param {String} type
 * @param {Object} options
 */


var createEventType = function createEventType(eventName, type, props) {
  // eslint-disable-line
  var eventNames = {
    MouseEvent: (0, _helpers.hasMouseEventSupport)() ? MouseEvent : null,
    KeyboardEvent: (0, _helpers.hasKeyboardEventSupport)() ? KeyboardEvent : null,
    TouchEvent: (0, _helpers.hasTouchEventSupport)() ? TouchEvent : null,
    CustomEvent: (0, _helpers.hasCustomEventSupport)() ? CustomEvent : null
  };

  if (!eventNames[eventName]) {
    var event = document.createEvent('Event');
    Object.keys(props).forEach(function (key) {
      event[key] = props[key];
    });
    event.initEvent(type, true, true);
    return event;
  }

  return new eventNames[eventName](type, props);
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
    }) && eventType !== 'CustomEvent') {
      console.warn('Event interface does not contained passed event: ' + type);
      console.warn('Setting event to default (' + (0, _helpers.first)(_defaults.eventMap[eventType]) + ') for ' + eventType);
      type = (0, _helpers.first)(_defaults.eventMap[eventType]); // eslint-disable-line
    }

    // Grab the correct event type
    // Attach the default keys/values to the event and then filter and extend
    // it with the passed options values
    var props = (0, _helpers.filterDefaults)(_eventProps2.default[eventType], Object.assign({}, {
      type: type,
      element: element
    }, _defaults2.default, options));

    // Convert passed clientX, clientY etc to a touchlist
    // if event type is TouchEvent
    if (eventType === 'TouchEvent' && !props.touches.length) {
      var _createTouch = (0, _touch.createTouch)(element, options),
          touches = _createTouch.touches;

      props.touches = touches;
    }

    // Lets create the event
    var event = createEventType(eventType, type, props);
    if (eventType === 'KeyboardEvent') (0, _keyboard.fixKeyCode)(event, props);

    return event;
  };
};

exports.default = createEvent;
var customEvent = exports.customEvent = createEvent();
var mouseEvent = exports.mouseEvent = createEvent('MouseEvent');
var keybordEvent = exports.keybordEvent = createEvent('KeybordEvent');
var touchEvent = exports.touchEvent = createEvent('TouchEvent');

// for testing
var filterDef = exports.filterDef = _helpers.filterDefaults;