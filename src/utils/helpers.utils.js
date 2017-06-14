// @flow

export const isElement = (
  element: HTMLElement | Document
): boolean => (
  element && element instanceof HTMLElement
);

/**
 * Check if all the keys exist inside an object and return true or false
 *
 * @param {Object} obj
 * @param {Array<string>} props
**/
export const hasKeys = (obj: Object, ...props: Array<string>): boolean => {
  const keys = Object.keys(obj);
  return props.every(prop => keys.find(k => prop === k && obj[k]));
};

export const mergeArrayObjects = (acc: Object, next: Object) => {
  return Object.assign({}, acc, next);
};

export const first = (array: Array<any>): any => array[0];

/**
 * Select correct event props based on event type
 *
 * @param {String} type
 * @param {Object} options
 */
export const filterDefaults = (props: Array<string>, options: Object): Object => (
  props.reduce((acc, key) => (
    Object.assign(acc, { [key]: options[key] })
  ), {})
);
