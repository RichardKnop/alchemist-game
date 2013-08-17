requirejs.config({
	"baseUrl": "js/src",
	"paths": {},
	"shim": {
		"vendor/hammer": {
			exports: "Hammer"
		}
	}
});

requirejs.onError = function(err) {
	console.log(err.requireType);
	if (err.requireType === 'timeout') {
		console.log('modules: ' + err.requireModules);
	}

	throw err;
};

requirejs(["app/main"]);