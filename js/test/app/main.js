define([
	"vendor/domReady",
	"testSrc/core/RandomGeneratorTest",
	"testSrc/core/GridShufflerTest",
	"testSrc/core/CookieManagerTest",
	"testSrc/core/ApplicationTest"
], function(
	domReady,
	RandomGeneratorTest,
	GridShufflerTest,
	CookieManagerTest,
	ApplicationTest
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
		
		testCase = new ApplicationTest();
		testCase.runTests();
		
	});

});