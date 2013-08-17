requirejs.config({
	"baseUrl": "js/src",
    "paths": {
        "test": "../test",
        "testSrc": "../test/src"
    },
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

requirejs(["test/app/main"]);