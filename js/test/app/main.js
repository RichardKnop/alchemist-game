define([
	"vendor/domReady",
	"testSrc/core/RandomGeneratorTest",
	"testSrc/core/GridShufflerTest",
	"testSrc/core/CookieManagerTest",
	"testSrc/core/GameTest",
	"testSrc/core/SpotTheDifferencePuzzleTest",
	"testSrc/core/ShufflePuzzleTest",
], function(
	domReady,
	RandomGeneratorTest,
	GridShufflerTest,
	CookieManagerTest,
	GameTest,
	SpotTheDifferencePuzzleTest,
	ShufflePuzzleTest
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
		
		testCase = new GameTest();
		testCase.runTests();
		
		testCase = new SpotTheDifferencePuzzleTest();
		testCase.runTests();
		
		testCase = new ShufflePuzzleTest();
		testCase.runTests();
		
	});

});