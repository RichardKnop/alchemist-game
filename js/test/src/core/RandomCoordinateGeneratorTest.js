define([
	"core/RandomCoordinateGenerator"
], function(RandomCoordinateGenerator) {

	"use strict";

	return function() {
		
		var generator = new RandomCoordinateGenerator();
		generator.setMaximumX(10);
		generator.setMaximumY(10);
		
		this.runTests = function() {
			
			test("Test RandomCoordinateGenerator.generate", function() {
				var c = generator.generate();
				ok(0 === c.x % 1);
				ok(0 === c.y % 1);
            });
			
		};
		
	};

});