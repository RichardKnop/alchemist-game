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

requirejs(["test/app/main"]);