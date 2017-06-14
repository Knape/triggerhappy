"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isElement = exports.isElement = function isElement(element) {
  return element && element instanceof HTMLElement;
};

/**
 * Check if all the keys exist inside an object and return true or false
 *
 * @param {Object} obj
 * @param {Array<string>} props
**/
var hasKeys = exports.hasKeys = function hasKeys(obj) {
  for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    props[_key - 1] = arguments[_key];
  }

  var keys = Object.keys(obj);
  return props.every(function (prop) {
    return keys.find(function (k) {
      return prop === k && obj[k];
    });
  });
};

var mergeArrayObjects = exports.mergeArrayObjects = function mergeArrayObjects(acc, next) {
  return Object.assign({}, acc, next);
};

var first = exports.first = function first(array) {
  return array[0];
};