import prism from 'prismjs';
import 'prismjs/themes/prism.css';

import panjs from 'panjs';
import pinchit from 'pinchit';

import th from '../src/';

document.querySelector('.pan-button').addEventListener('click', () => {
  const panContainer = document.querySelector('.example-three .img-wrapper');
  const pan = panjs('.example-three .img-wrapper');
  th.fire('MouseEvent', 'mouseenter', panContainer);
  const clip = th.load('MouseEvent', 'mousemove', panContainer, th.position(panContainer));
  const panEvent = th.spray(clip, {
    speed: 30,
    steps: 50,
    path: {clientX: 10, clientY: 5},
  }).then(() => {
    th.fire('MouseEvent', 'mouseleave', panContainer);
    console.log('done');
  })
});

document.querySelector('.pinch-button').addEventListener('click', () => {
  const pinchContainer = document.querySelector('.example-four .img-wrapper');
  const pinch = pinchit('.example-four .img-wrapper');
  const startPos = th.touches(th.position(pinchContainer, { x: 12, y: 12 }), th.position(pinchContainer, { x: 10, y: 10 }));
  th.fire('TouchEvent', 'touchstart', pinchContainer, startPos);
  const clip = th.load('TouchEvent', 'touchmove', pinchContainer, startPos);
  const panEvent = th.spray(clip, {
    speed: 40,
    steps: 40,
    path: ({touches}) => ({
      touches: touches.map((touch, i) => {
        return Object.assign({}, touch, {
            clientX: (i === 1) ? touch.clientX + 1 : touch.clientX - 1,
            clientY: (i === 1) ? touch.clientY + 1 : touch.clientY - 1,
            pageX: (i === 1) ? touch.pageX + 1 : touch.pageX - 1,
            pageY: (i === 1) ? touch.pageY + 1 : touch.pageY - 1,
        })
      })
    }),
  }).then((e) => {
    console.log(e);
    th.fire('TouchEvent', 'touchend', pinchContainer);
    console.log('done');
  })
});
