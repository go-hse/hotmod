# hotmod
hotmod is a tiny module that allows to reload single modules without stopping/starting the 
main node.js process.

## Installation

```sh
$ npm install hotmod
```

### Usage:
In your node application

```js
// server.js
let path = require('path');
let hot = require('hotmod');

// put your hot modules in a different directory
let updater = hot.updater(path.resolve(__dirname, "hot_modules"));

// load the hot module 'example'; execute the exported 'init' function with the optional parameter 'cwd'
updater.require("example", {
	"cwd": process.cwd()
});

```

The 'hot' module *must* export its filename; it *can* export an init-function, see example.js:

```js
// example.js
// init_obj is part of the main process
// hot_modules may store information there
// 
module.exports.init = function(init_obj) {
	let cwd = init_obj.para.cwd;

	// example for stored data
	let sav = init_obj.para.sav || {
		counter: 0
	};
	console.log("init example in ", cwd, "version", ++sav.counter);
	init_obj.para.sav = sav;
	return init_obj.para;
};

// needed to clean the cache
module.exports.filename = module.filename;
```