define([
	"vendor/domReady",
	"testSrc/core/RandomCoordinateGeneratorTest",
	"testSrc/core/GridShufflerTest"
], function(
	domReady,
	RandomCoordinateGeneratorTest,
	GridShufflerTest
) {

	"use strict";

	domReady(function() {
		
		var testCase;
		
		testCase = new RandomCoordinateGeneratorTest();
		testCase.runTests();
		
		testCase = new GridShufflerTest();
		testCase.runTests();
		
	});

});