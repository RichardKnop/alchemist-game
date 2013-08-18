define([
	"vendor/domReady",
	"testSrc/core/RandomGeneratorTest",
	"testSrc/core/GridShufflerTest",
	"testSrc/core/CookieManagerTest"
], function(
	domReady,
	RandomGeneratorTest,
	GridShufflerTest,
	CookieManagerTest
) {

	"use strict";

	domReady(function() {
		
		var testCase;
		
		testCase = new RandomGeneratorTest();
		testCase.runTests();
		
		testCase = new GridShufflerTest();
		testCase.runTests();
		
		testCase = new CookieManagerTest();
		testCase.runTests();
		
	});

});