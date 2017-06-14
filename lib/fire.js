'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _event = require('./event');

var _event2 = _interopRequireDefault(_event);

var _helpers = require('./utils/helpers.utils');

var _position = require('./utils/position.utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fire = function fire() {
  for (var _len = arguments.length, rest = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    rest[_key - 3] = arguments[_key];
  }

  var eventName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'MouseEvent';
  var triggerName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'click';
  var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;

  var options = rest.reduce(_helpers.mergeArrayObjects, {});
  // Append the correct client and page props to
  // the options object if we dont pass any
  if ((0, _helpers.isElement)(element) && !(0, _helpers.hasKeys)(options, 'clientX', 'clientY')) {
    Object.assign(options, (0, _position.position)(element));
  }

  // Create the custom event, dispatchit and then return the event
  var newEvent = (0, _event2.default)(eventName)(triggerName, element, options);
  element.dispatchEvent(newEvent);
  return newEvent;
};

exports.default = fire;