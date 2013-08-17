define([
	"vendor/domReady",
	"core/RandomCoordinateGenerator",
	"core/GridShuffler",
	"vendor/hammer"
], function(
	domReady,
	RandomCoordinateGenerator,
	GridShuffler
) {

	"use strict";

	domReady(function() {
		
		var generator = new RandomCoordinateGenerator();
		generator.setMaximumX(10);
		generator.setMaximumY(10);
		console.log(generator.generate());
		
		var shuffler = new GridShuffler(5, 5);
		shuffler.setEmptySpace(5, 1);
		shuffler.shuffle(10);
		
	});

});