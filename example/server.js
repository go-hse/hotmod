let path = require('path');

let hot = require('hotmod');
let updater = hot.updater(path.resolve(__dirname, "hot_modules"));

updater.require("example", {
	"cwd": process.cwd()
});