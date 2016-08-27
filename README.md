# js13k-rollup

![image](http://i.imgur.com/ekXSFYh.png)

*Requires: Node.js 4+*

The purpose of this project is to make getting started with the [js13kgames.com](http://js13kgames.com) competition both easy
and clean. Using `gulp` and `rollup`, this repo offers the following features:

- Support for [ES2015 modules](http://exploringjs.com/es6/ch_modules.html)
- JavaScript minification via Uglify
- Sourcemaps and livereload support for development
- Inlining for all CSS and JavaScript assets (single `index.min.html` output)
- Zip packaging of the inlined output for final competition submission

Current output zip size: `639 bytes`

## Getting started

- Install dependencies

```
npm install -g gulp node-static
npm install
```

- Kick off a build

```
gulp
```

- Start a static server

```
static
```

- Navigate to [http://localhost:8080/dist](http://localhost:8080/dist) in your browser to run the app

- To run builds while you save changes to files

```
gulp watch
```

## How the build pipeline works

JavaScript step

1. Rollup reads the dependency tree and outputs `dist/main.js` w/ sourcemaps support
2. Uglify minifies the previous file and outputs `dist/main.min.js`

CSS step

3. All css files are concatenated and output to `dist/main.css`

Template step

4. `index.hbs` is output into two separate files: `dist/index.html` and `dist/index.min.html`. The former is used for development. The latter has all the necessary scripts and styles are inlined into a single deliverable used for later packaging.

Zip step

5. The `index.min.html` is compressed into a single `game.zip` that can be used for competition submission.

## Features

I've included some components that I use in almost all of my web applications (including games). Since rollup utilizes 'tree-shaking', these components won't be included in the final builds if you never import them yourself.

- `Emitter`

This class is a common abstraction used to implement the pub/sub pattern (on/off/emit).

```js
import Emitter from './classes/emitter.js';

var emitter = new Emitter();

// Bind event handler to a given event
emitter.on( 'boom', function() { console.log('it went boom!') } );

// Emit that event
emitter.emit('boom'); // 'it went boom!'

```

- `BaseClass`

This class gives a simple interface for using the classical inheritance patterns in JavaScript. `BaseClass` subclasses the `Emitter` and will automatically call an `init()` method during construction if it exists on the prototype.

```js
import BaseClass from './classes/base.js';

var Dude = BaseClass.extend({

  init: function() {
    console.log('im alive!');
  }

});

var dude = new Dude(); //'im alive!'

// BaseClass instances inherit from EventEmitter
dude.on( 'death', function() { console.log('im dead!') });
dude.emit('death'); // 'im dead!'

```
