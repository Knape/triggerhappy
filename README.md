# Triggerhappy

[![Build Status](https://travis-ci.org/Knape/triggerhappy.svg?branch=master)](https://travis-ci.org/Knape/triggerhappy)
[![Coverage Status](https://coveralls.io/repos/github/Knape/triggerhappy/badge.svg?branch=master)](https://coveralls.io/github/Knape/triggerhappy?branch=master)

> **Triggerhappy -** Easily create native events and event animations, mostly for testing purposes. Both for node and the browser

## Description

Triggerhappy lets you create custom javascript events easily without all the boilerplate it usually requires. Need to test touch events, keyboard events or mouse events inside your application, triggerhappy lets you do that. It also has a couple of helper function for creating custom animations between points an a lot more. Works well with karma and mocha. See the api for more information.


## Features
* Create a bare-bone events with a single line
* Create custom event animations with support for multiple events
* Helper functions for getting the clientX, clientY position, converting keyCodes etc

## Installation

Install the package from [npm](https://npmjs.com/release)

```bash
npm install --save-dev triggerhappy
```


## Usage

```es6
import th from 'triggerhappy';

// fires a click event at 0x0 relative to elements position
th.fire('MouseEvent', 'click') // -> event
```

```es6
import th from 'triggerhappy';

// fires a click event at center of screen
const center = th.center(window);
th.fire('MouseEvent', 'click', document, center) // -> event
```

```es6
import th from 'triggerhappy';

// fire a touch event at 20% top and left of the image
const image = document.querySelector('img');
const imgCenter = th.position(image, {x: 20, y: 20});
th.fire('MouseEvent', 'click', image, imgCenter) // -> event
```

```es6
import th from 'triggerhappy';

// Simulate a drag horizotal effect (one finger)
th.fire('TouchEvent', 'touchstart');
const clip = th.load('TouchEvent', 'touchmove');
th.spray(clip, {
	path: ({touches}) => {
		// Always good to extend the object so we
		// return the same keys
		return touches: touches.map((touch, i) => {
			return Object.assign({}, touch, {
				// do something with the events
				// and return a new clientX and clientY
				clientX: touch.clientX + 1,
				clientY: touch.clientY,
			});
		})
	}
}).then((e) => {
	th.fire('TouchEvent', 'touchend', document, e);
});
```

```es6
import th, { touches, center } from 'triggerhappy';

// Simulate a pinch out effect
const img = document.querySelector('img');
const touches = th.touches(th.position(img, {x: 40, y: 50}), th.position(img, {x: 60, y: 50}))
th.fire('TouchEvent', 'touchstart', img);
const clip = th.load('TouchEvent', 'touchmove', img, touches);
th.spray(clip, {
	path: ({touches}) => ({
		// Always good to extend the object so we
		// return the same keys
		return touches: touches.map((touch, i) => {
			return Object.assign({}, touch, {
				// move one finger to the left and one to the right
				clientX: (i === 1) ? touch.clientX + 1 : touch.clientX - 1,
				clientY: (i === 1) ? touch.clientY + 1 : touch.clientY - 1,
			})
		})
	})
}).then((e) => {
	th.fire('TouchEvent', 'touchend', img, e);
});
```

## API

> The API is still in heavy development, so dont hesitate to create a pull request

## Fire

### th.fire(eventName, triggerName, [element], [options])

> Fires an event specified by the type on the element

```es6
th.fire('MouseEvent', 'click', document, {
  ...
});
```

**returns:** ```Object``` Event triggered

#### eventName ```String```
For the moment the type can either be `MouseEvent`, `TouchEvent`, `KeyboardEvent` or `CustomEvent`

* **required:** ```true```
* **default value:** ```MouseEvent```

#### triggerName ```String```
Depends on the current eventName passed to `th.fire`
Check [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Event) for a list of available triggers


* **required:** ```true```
* **default value:** ```click```

#### Element ```Node```
Element that the event should fire on, defaults to `document`

* **required:** ```false```
* **default value:** ```Document```

#### Options ```Object```

All options are optional, and will be assigned together with defaults.

Each event-type takes different options.
For a full list of passable options, see the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Event)

* **required:** ```false```
* **default value:** ```{}```

## Load

### th.load(eventName, triggerName, [element], [options])

> Higher order method for configure a fire event to be used with spray.

```es6
const clip = th.load('MouseEvent', document, {
  ...
})

```

* **returns:** ```Function```

#### eventName ```String```
For the moment the eventName can either be `MouseEvent`, `TouchEvent` or `KeyboardEvent`

* **required:** ```true```
* **default value:** ```MouseEvent```

#### triggerName ```String```
Depends on the current eventName passed to `th.fire`
Check [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Event) for a list of available triggers


* **required:** ```true```
* **default value:** ```click```

#### Element ```Node```
Element that the event should fire on, defaults to `document`

* **required:** ```false```
* **default value:** ```Document```

#### Options ```Object```

All options are optional, and have sensible defaults.

Each eventtype takes different options.
For a full list of passable options, see the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Event)

* **required:** ```false```
* **default value:** ```{}```


## Spray

### th.spray(loadInstance, [options])

> The spray method is intended to emulate a constant behavior, for example a pinch or a drag.

```es6
const clip = th.load('MouseEvent', 'click');
th.spray(clip)
.then((event) => {});
```

**returns:** ```Promise<Object>``` Last event triggered



#### loadInstance ```Function```
Pass the returned function from load to spray either as a pure function or as an array of functions. Passing an array is useful for testing multitouch behaviors.

* **required:** ```true```
* **default value:** ```null```

### Options ```Object```

```es6
// Start by creating a touch start event and return the current position that we fired on
const {clientX, clientY} = th.fire('TouchEvent', 'touchstart');
const clip = th.load('TouchEvent', 'touchmove', {clientX, clientY});
// then we fire 10 touchmove events
th.spray(clip, {
	speed: 10,
	steps: 10,
	path: (event) => (event),
	tick: () => {},
})
.then(({clientX, clientY}) => {
	// and finally when we are done we end the cycle with a touchend event
	// don't forget to pass our last current position
	th.fire('TouchEvent', 'touchend', {clientX, clientY})
);
```

Explanation of each option follows:

* [speed](#speed)
* [steps](#steps)
* [path](#path)
* [tick](#tick)

### speed `Number`

Sets the speed between each event that gets fired

```es6
const clip = th.load('MouseEvent', 'click');
th.spray(clip, {
	speed: 10,
})
```
Will be called with a delay of 10 ms between each cycle

### steps `Number`

Sets how many iterations spray should fire before calling then

```es6
const clip = th.load('MouseEvent', 'click');
th.spray(clip, {
	steps: 10,
}).then(() => {
	// Called 10 times
})

```
Will be called 10 times before exiting

### path `Object | Function<Object>`

Defines the path that each event iteration will use. See /example folder for more

```es6
// Simulate a double click
const clip = th.load('MouseEvent', 'click');
th.spray(clip, {
	path: {clientX:50, clientY: 50}
});
```


```es6
// Simulate a drag horizontal effect
const clip = th.load('TouchEvent', 'touchmove');
th.spray(clip, {
	path: ({clientX, clientX}) => ({
		// do something with the events
		// and return a new clientX and clientY
		clientX: clientX += 1,
		clientY: clientY,
	})
});
```


```es6
// Simulate a pinch out effect
const clip = th.load('TouchEvent', 'touchmove', document, touches(center(), center()));
th.spray(clip, {
	path: ({touches}) => ({
		// Returns an array of events in the same order
		// as we pass our clips
		touches: touches.map({clientX, clientY}, i) => ({
			clientX: (i === 1) ? clientX += 1 : clientX -= 1,
			clientY: (i === 1) ? clientY += 1 : clientY -= 1,
		}))
	})
});
```

### tick `Function`

Callback function for each event that gets fired, get called last after the event has been fired
Return true to exit the spray function, good for doing calculation instead of steps.

```es6
const clip = th.load('MouseEvent', 'click');
th.spray(clip, {
	times: Infinitive,
	tick: (event) => {
		// do something with the event
		// return true to exit the spray function
	}
})
```

## Utils

### th.position(element, positionObject)

> Utility function for getting an elements position

```es6
const img = document.querySelector('img');
th.position(img, {
  x: 0, y: 10
});
```

**returns:** ```Object```
Return an object containing: clientX, clientY, pageX, pageY

#### element ```HTMLElement```
Supply the HTMLElement you want the position to be based on

* **required:** ```true```
* **default value:** ```Null```

#### positionObject ```Object```
Supply an object with x and y keys where the values represent the percentage where we should get our position value
and if all values returned should be floored

* **required:** ```false```
* **default value:** ```{ x: 0, y: 0, floor: true }```

### center(element, options)

> Utility function for getting an elements center position

```es6
const img = document.querySelector('img');
th.center(img);
```

**returns:** ```Object```
Return an object containing: clientX, clientY, pageX, pageY

#### element ```HTMLElement```
Supply the HTMLElement you want the position to be based on

* **required:** ```true```
* **default value:** ```Null```

#### options ```Object```
Allow to set so all the values returned are floored

* **required:** ```false```
* **default value:** ```{ floor; true }```

### touches(Array)

> Utility function for creating a touch node list

```es6
const img = document.querySelector('img');
th.touches(position(img, { x: 49, y: 49}), position(img, { x: 51, y: 51}));
```

**returns:** ```Object```
Return an object containing: clientX, clientY, pageX, pageY

#### element ```Array<Object>```
Supply an array of Objects containing your touch-points (recommended to use center or position for each object)

* **required:** ```true```
* **default value:** ```[]```

### keyCode(keycode)

> Utility function for creating/converting a keycode

```es6
th.keyCode('13')); // => 'enter'
th.keyCode('enter')); // => '13'
```

**returns:** ```string```

#### keycode ```string```
either supply the name of the letter or the number it represent

* **required:** ```true```
* **default value:** ```null```

## Contribute

1. Fork this repository to your own GitHub account and then clone it to your local device
2. Install dependencies using npm
3. Make the necessary changes and ensure that the tests are passing using `npm run test`
4. Send a pull request 🙌

## License

[MIT](LICENSE). Copyright (c) 2017 Philip Knape.
