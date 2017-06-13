

// import fire from './fire';
// import { spray, load } from './spray';
//
// export const swipe = (element: DomNode = document, options: Object = {}) => {
//   return new Promise((resolve) => {
//     fire('MouseEvent', 'moveenter', element, options);
//     const clip = load('MouseEvent', 'mousemove', element, options);
//     spray(clip, {
//       steps: 4,
//       path: {clientX: 5, clientY: 2},
//     }).then((event) => {
//       const lastEvent = fire('MouseEvent', 'moveleave', element, event);
//       resolve(lastEvent);
//     });
//   });
// };
//
// export const pinch = (element: DomNode = document, options: Object = {}) => {
//
// };
//
// export const pan = (element: DomNode = document, options: Object = {}) => {
//
// };
"use strict";