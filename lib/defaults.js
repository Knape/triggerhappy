'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventMap = undefined;

var _global = require('global');

exports.default = {
  alt: false,
  bubbles: true,
  button: 0,
  cancelable: true,
  clientX: 0,
  clientY: 0,
  ctrl: false,
  detail: 1,
  key: '13',
  isTrusted: true,
  meta: false,
  pageX: 0,
  pageY: 0,
  relatedTarget: null,
  touches: [],
  screenX: 0,
  screenY: 0,
  shift: false,
  view: _global.window
};
var eventMap = exports.eventMap = {
  MouseEvent: ['click', 'dblclick', 'mouseup', 'mousedown', 'mouseenter', 'mousemove', 'mouseleave'],
  KeyboardEvent: ['keypress', 'keydown', 'keyup'],
  TouchEvent: ['touchstart', 'touchmove', 'touchend', 'touchcancel']
};