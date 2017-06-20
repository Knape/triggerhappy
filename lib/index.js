'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keyCode = exports.touches = exports.center = exports.position = exports.rampage = exports.spray = exports.load = exports.fire = undefined;

var _fire = require('./fire');

var _spray = require('./spray');

var _spray2 = _interopRequireDefault(_spray);

var _rampage = require('./rampage');

var _rampage2 = _interopRequireDefault(_rampage);

var _position = require('./utils/position.utils');

var _touch = require('./events/touch.utils');

var _touch2 = _interopRequireDefault(_touch);

var _keyboard = require('./events/keyboard.utils');

var _keyboard2 = _interopRequireDefault(_keyboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var th = {
  fire: _fire.fire,
  load: _fire.load,
  spray: _spray2.default,
  rampage: _rampage2.default,
  position: _position.position,
  center: _position.center,
  touches: _touch2.default,
  keyCode: _keyboard2.default
};

exports.default = th;
exports.fire = _fire.fire;
exports.load = _fire.load;
exports.spray = _spray2.default;
exports.rampage = _rampage2.default;
exports.position = _position.position;
exports.center = _position.center;
exports.touches = _touch2.default;
exports.keyCode = _keyboard2.default;