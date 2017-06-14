// @flow

import keycode from 'keycode';

export default (
  key: number | string,
  options: Object = {}
): Object => {
  const isString = isNaN(parseInt(key, 10));
  const transformedKey = isString ? key : parseInt(key, 10);
  return Object.assign({}, options, {
    key: keycode(transformedKey).toString()
  });
};

export const fixKeyCode = (
  e: KeyboardEvent,
  options: Object
): void => {
  // http://stackoverflow.com/a/10520017
  if (e.keyCode !== options.key) {
    Object.defineProperty(e, 'keyCode', ({
      get: () => (options.key)
    }: Object));
    Object.defineProperty(e, 'charCode', ({
      get: () => (options.key)
    }: Object));
    Object.defineProperty(e, 'which', ({
      get: () => (options.key)
    }: Object));
    Object.defineProperty(e, 'shiftKey', ({
      get: () => (options.shift)
    }: Object));
  }
};
