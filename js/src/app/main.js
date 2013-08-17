define([
	"vendor/domReady",
	"core/Application",
	"vendor/hammer"
], function(
	domReady,
	Application
) {

	"use strict";

	domReady(function() {
		
		console.log("Bootstraping the application");
		var application = new Application();
		application.run();
		
	});

});