// @flow

/**
 * Check if passed argument is an element,
 * in case of passed document as argument this should fail
 *
 * @param {HTMLElement} element
**/
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
export const hasKeys = (
  obj: Object,
  ...props: Array<string>
): boolean => (
  props.every(prop => Object.keys(obj).find(k => prop === k && obj[k]))
);

/**
 * Merge multiple array object together
 *
 * @param {Object} acc
 * @param {Object} next
**/
export const mergeArrayObjects = (
  acc: Object,
  next: Object | Array<Object>
): Object => {
  const toMerge = Array.isArray(next) ? next : [next];
  return Object.assign({}, acc, ...toMerge);
};

/**
 * Get the first Object inside an array
 *
 * @param {Array} array
**/
export const first = (array: Array<any>, defaults: ?string): any => (
  Array.isArray(array) ? array[0] : defaults
);

/**
 * Select correct event props based on event type
 *
 * @param {String} type
 * @param {Object} options
 */
export const filterDefaults = (
  props: Array<string>,
  options: Object
): Object => (
  props.reduce((acc, key) => (
    Object.assign(acc, { [key]: options[key] })
  ), {})
);

/**
 * Match two object against each other and return a new object
 *
 * @param {String} type
 * @param {Object} options
 */
export const matchAndAddition = (
  extObj: Object = {},
  base: Object = {}
): Function => (
  acc: Object,
  key: string
) => {
  switch (typeof base[key]) {
    case 'string':
      acc[key] = extObj[key] || base[key]; // eslint-disable-line
      break;
    case 'number':
      acc[key] = (key !== 'key') ? // eslint-disable-line
        base[key] + extObj[key] || 0 :
        extObj[key] || 0;
      break;
    default:
      acc[key] = base[key]; // eslint-disable-line
  }
  return acc;
};

/**
 * Small helpers to detect if we have our constructor functions
 */
export const hasTouchSupport = () => typeof Touch !== 'undefined';
export const hasTouchEventSupport = () => typeof TouchEvent !== 'undefined';
export const hasKeyboardEventSupport = () => typeof KeyboardEvent !== 'undefined';
export const hasMouseEventSupport = () => typeof MouseEvent !== 'undefined';
export const hasCustomEventSupport = () => typeof CustomEvent !== 'undefined';
