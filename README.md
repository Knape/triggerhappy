# Triggerhappy

> **Triggerhappy -** Easily create native events and event animations, mostly for testing purposes

## Description

Triggerhappy lets you create custom javascript events easily without all the boilerplate it usaully requires. Need to test touchevents or mousemove events inside your application, triggerhappy lets you do that. It also has a couple of helper function for creating custom animations between points an a lot more. Works well with karma and mocha. See the api for more information.


## Features
* Create barebone events with a single line
* Create custom event animations with support for multiple events
* Support for all kind of touch, mouse and keyboard scenarios. Like drag, pinch etc

## Installation

Install the package from [npm](https://npmjs.com/release)

```bash
npm install --save-dev triggerhappy
```


## Usage

```es6
import th from 'triggerhappy';

// fire a click event at 0x0 poisiton
th.fire('MouseEvent', 'click') // -> event
```

```es6
import th from 'triggerhappy';

// fire a click event at center of screen
const center = th.center(window);
th.fire('MouseEvent', 'click', center) // -> event
```

```es6
import th from 'triggerhappy';

// fire a touch event at 20% top and left of an image
const imgCenter = th.position(document.querySelector('img'), 20, 20);
th.fire('MouseEvent', 'click', imgCenter) // -> event
```

```es6
import th from 'triggerhappy';

// Simulate a drag horizotal effect
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
import th from 'triggerhappy';

// Simulate a pinch out effect
const clipOne = th.load('TouchEvent', 'touchmove');
const clipTwo = th.load('TouchEvent', 'touchmove');
th.spray([clipOne, clipTwo], {
	path: (events) => (
		// Returns an array of evente in. the same order
		// as we pass our clips
		events.map({clientX, clientY}, i) => ({
			clientX: (i === 1) ? clientX += 1 : clientX -= 1,
			clientY: (i === 1) ? clientY += 1 : clientY -= 1,
		}))
	)
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
For the moment the type can either be `MouseEvent`, `TouchEvent` or `KeybordEvent`

* **required:** ```true```
* **default value:** ```Event```

#### triggerName ```String```
Depends on the current eventName passed to `th.fire`
Check [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Event) for a list of availbable triggers


* **required:** ```true```
* **default value:** ```null```

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
For the moment the eventName can either be `MouseEvent`, `TouchEvent` or `KeybordEvent`

* **required:** ```true```
* **default value:** ```Event```

#### triggerName ```String```
Depends on the current eventName passed to `th.fire`
Check [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Event) for a list of availbable triggers


* **required:** ```true```
* **default value:** ```null```

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

> The spray method is intended yo emulate a constant behavour, for example a pinch or a drag.

```es6
const clip = th.load('MouseEvent');
th.spray(clip)
.then(() => {);
```

**returns:** ```Promise<Object>``` Last event triggered



#### loadInstance ```Function | Array<Function>```
Pass the returned function from load to spray either as a pure function or as an array of functions. Passing an array is usefull for testing multituch behavours.

* **required:** ```true```
* **default value:** ```Event```

### Options ```Object```

```es6
// Start by creating a touch start event and return the current position that we fired on
const {clientX, clientY} = th.fire('TouchEvent', 'touchstart');
const clip = th.load('TouchEvent', 'touchmove', {clientX, clientY});
// then we fire 10 toucmove events
th.spray(clip, {
	speed: 10,
	steps: 10,
	path: {x: 1, y: 1}
	tick: () => {},
})
.then(({clientX, clientY}) => {
	// and finaly when we are done we end the cycle with a touchend event
	// dont forget to pass our last current position
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

Sets how many itterations spray should fire before calling then

```es6
const clip = th.load('MouseEvent', 'click');
th.spray(clip, {
	steps: 10,
}).then(() => {
	// Called 10 times
})

```
Will be called 10 times before exiting

### path `Array<Object> | Function<Object>`

Defines the path that each event itteration will use

```es6
// Simulate a double click
const clip = th.load('MouseEvent', 'click');
th.spray(clip, {
	path: [{clientX:50, clientY: 50}, {clientX:50, clientY: 50}]
});
```


```es6
// Simulate a drag horizotal effect
const clip = th.load('TouchEvent', 'touchmove');
th.spray(clip, {
	path: ({clientX, clientX}) => ({
		// do something with the events
		// and return a new clientX and clientY
		clientX: clientX += 1,
		clientY: clientY,
	})
});

// Simulate a pinch out effect
const clipOne = th.load('TouchEvent', 'touchmove');
const clipTwo = th.load('TouchEvent', 'touchmove');
th.spray([clipOne, clipTwo], {
	path: (events) => (
		// Returns an array of evente in. the same order
		// as we pass our clips
		events.map({clientX, clientY}, i) => ({
			clientX: (i === 1) ? clientX += 1 : clientX -= 1,
			clientY: (i === 1) ? clientY += 1 : clientY -= 1,
		}))
	)
});
```

### tick `Function`

Callback function for each event that gets fired, get called after the event has been fired

```es6
const clip = th.load('MouseEvent', 'click');
th.spray(clip, {
	tick: (event) => {
		// do something with the event
	}
})
```

## Utils

### th.position(element)
### center(element, position)

## Contribute

1. Fork this repository to your own GitHub account and then clone it to your local device
2. Install dependencies using npm
3. Make the necessary changes and ensure that the tests are passing using `npm run test`
4. Send a pull request 🙌

## License

[MIT](LICENSE). Copyright (c) 2017 Philip Knape.
