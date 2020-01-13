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