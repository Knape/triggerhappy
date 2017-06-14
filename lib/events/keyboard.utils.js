'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fixKeyCode = undefined;

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (key) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var isString = isNaN(parseInt(key, 10));
  var transformedKey = isString ? key : parseInt(key, 10);
  return Object.assign({}, options, {
    key: (0, _keycode2.default)(transformedKey).toString()
  });
};

var fixKeyCode = exports.fixKeyCode = function fixKeyCode(e, options) {
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