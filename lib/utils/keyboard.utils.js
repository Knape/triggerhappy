'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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