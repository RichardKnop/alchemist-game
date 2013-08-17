define([
	"vendor/domReady",
	"core/RandomCoordinateGenerator",
	"vendor/hammer"
], function(domReady, RandomCoordinateGenerator) {

	"use strict";

	domReady(function() {
		
		var generator = new RandomCoordinateGenerator();
		console.log(generator.generate());
		
	});

});