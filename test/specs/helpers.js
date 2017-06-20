export const type = (obj) => Object.prototype.toString.call(obj).slice(8, -1);

export const hasKeys = obj => m => Object.keys(obj).find(o => m === o);

export const attachProps = obj => (acc, m) => Object.assign(acc, { [m]: obj[m] });
