// @flow

import event from './event';
import { isElement, hasKeys, mergeArrayObjects } from './utils/helpers.utils';
import { position } from './utils/position.utils';

const fire = (
  eventName: string = 'MouseEvent',
  triggerName: string = 'click',
  element: HTMLElement | Document = document,
  ...rest: Array<Object>
): Event => {
  const options = rest.reduce(mergeArrayObjects, {});
  // Append the correct client and page props to
  // the options object if we dont pass any
  if (isElement(element) && !hasKeys(options, 'clientX', 'clientY')) {
    Object.assign(options, position(element));
  }

  // Create the custom event, dispatchit and then return the event
  const newEvent = event(eventName)(triggerName, element, options);
  element.dispatchEvent(newEvent);
  return newEvent;
};

export default fire;
