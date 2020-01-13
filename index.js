/* global module, global, require */

let fs = require('fs');

module.exports.updater = function(p) {
	module.paths.push(p);
	let that = {};
	let modules = {};

	// On File Change
	function reload(name) {
		let m;
		if (modules[name] !== undefined && modules[name].filename !== undefined) {
			delete require.cache[modules[name].filename];
		}
		m = require(name);
		if (m.init) {
			try {
				modules[name].para = m.init(modules[name]);
			} catch (e) {
				console.log("hot init failed", e.message);
			}
		}
	}


	// Called Once
	that.require = function(name, para) {
		let m;
		try {
			m = require(name);
			if (m.filename) {
				modules[name] = {
					filename: m.filename,
					para: para
				};
				fs.watchFile(m.filename, {
					interval: 1000
				}, (curr, prev) => {
					reload(name);
				});
				if (m.init) {
					try {
						modules[name].para = m.init(modules[name]);
					} catch (e) {
						console.log("hot reload failed", e.message);
					}
				}
			}
		} catch (e) {
			console.log("hot require failed", e);
		}
		return m;
	};
	return that;
};