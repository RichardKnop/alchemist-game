define([
	"vendor/domReady",
	"testSrc/core/RandomCoordinateGeneratorTest"
], function(
	domReady,
	RandomCoordinateGeneratorTest
) {

	"use strict";

	domReady(function() {
		
		var testCase;
		
		testCase = new RandomCoordinateGeneratorTest();
		testCase.runTests();
		
	});

});