// @flow

export default (...points: Array<Object>): Object => {
  // const t = points.map((p, i) => new Touch(Object.assign({}, p, { identifier: i})));
  // Revert back to plain object untill we have a proper way to handle touch in firefox
  const t = points.map((p, i) => Object.assign({}, p, { identifier: i}));
  return {
    touches: t,
    targetTouches: t,
    changedTouches: t,
  };
};
