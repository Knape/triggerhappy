'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.touches = exports.center = exports.position = exports.rampage = exports.spray = exports.load = exports.fire = undefined;

var _fire = require('./fire');

var _fire2 = _interopRequireDefault(_fire);

var _spray = require('./spray');

var _rampage = require('./rampage');

var _rampage2 = _interopRequireDefault(_rampage);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var th = {
  fire: _fire2.default,
  load: _spray.load,
  spray: _spray.spray,
  rampage: _rampage2.default,
  position: _utils.position,
  center: _utils.center,
  touches: _utils.touches
};

exports.default = th;
exports.fire = _fire2.default;
exports.load = _spray.load;
exports.spray = _spray.spray;
exports.rampage = _rampage2.default;
exports.position = _utils.position;
exports.center = _utils.center;
exports.touches = _utils.touches;