requirejs.config({
	"baseUrl": "js/src",
	"paths": {},
	"shim": {
		"vendor/hammer": {
			exports: "Hammer"
		}
	}
});

requirejs(["app/main"]);