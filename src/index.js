import fire from './fire';
import { load, spray } from './spray';
import rampage from './rampage';
import { position, center } from './utils/position.utils';
import touches from './utils/touch.utils';
import keyCode from './utils/keyboard.utils';


const th = {
  fire,
  load,
  spray,
  rampage,
  position,
  center,
  touches,
  keyCode
};

export default th;

export {
  fire,
  load,
  spray,
  rampage,
  position,
  center,
  touches,
  keyCode
};
