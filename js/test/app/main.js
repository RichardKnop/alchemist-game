define([
	"vendor/domReady",
	"testSrc/core/RandomGeneratorTest",
	"testSrc/core/GridShufflerTest"
], function(
	domReady,
	RandomGeneratorTest,
	GridShufflerTest
) {

	"use strict";

	domReady(function() {
		
		var testCase;
		
		testCase = new RandomGeneratorTest();
		testCase.runTests();
		
		testCase = new GridShufflerTest();
		testCase.runTests();
		
	});

});