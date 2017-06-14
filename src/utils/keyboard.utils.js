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
