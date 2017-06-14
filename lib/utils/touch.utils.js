"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  for (var _len = arguments.length, points = Array(_len), _key = 0; _key < _len; _key++) {
    points[_key] = arguments[_key];
  }

  // const t = points.map((p, i) => new Touch(Object.assign({}, p, { identifier: i})));
  // Revert back to plain object untill we have a proper way to handle touch in firefox
  var t = points.map(function (p, i) {
    return Object.assign({}, p, { identifier: i });
  });
  return {
    touches: t,
    targetTouches: t,
    changedTouches: t
  };
};