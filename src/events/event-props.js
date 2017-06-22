export default {
  Event: [
    'bubbles',
    'cancelable',
    'isTrusted',
    'currentTarget'
  ],
  MouseEvent: [
    'altKey',
    'button',
    'buttons',
    'clientX',
    'clientY',
    'ctrlKey',
    'metaKey',
    'movementX',
    'movementY',
    'offsetX',
    'offsetY',
    'pageX',
    'pageY',
    'region',
    'screenX',
    'screenY',
    'shiftKey',
    'relatedTarget',
  ],
  KeyboardEvent: [
    'altKey',
    'code',
    'ctrlKey',
    'isComposing',
    'key',
    'location',
    'metaKey',
    'repeat',
    'shiftKey',
    // Deprecated
    'charCode',
    'keyCode',
    'which',
  ],
  TouchEvent: [
    'altKey',
    'changedTouches',
    'ctrlKey',
    'metaKey',
    'shiftKey',
    'targetTouches',
    'touches',
  ],
  Touch: [
    'clientX',
    'clientY',
    'identifier',
    'pageX',
    'pageY',
    'screenX',
    'screenY',
    'target',
  ],
  FocusEvent: [
    'relatedTarget'
  ],
  UIEvent: [
    'detail',
    'view',
  ],
  CustomEvent: [
    'details'
  ],
};
