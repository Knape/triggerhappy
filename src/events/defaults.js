import { window } from 'global';

export default {
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
  view: window,
  details: {},
};

export const eventMap = {
  MouseEvent: ['click', 'dblclick', 'mouseup', 'mousedown', 'mouseenter', 'mousemove', 'mouseleave'],
  KeyboardEvent: ['keypress', 'keydown', 'keyup'],
  TouchEvent: ['touchstart', 'touchmove', 'touchend', 'touchcancel'],
  CustomEvent: []
};
