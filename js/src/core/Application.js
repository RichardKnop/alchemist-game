define([
	"core/ServiceManager",
	"core/Renderer",
	"core/CookieManager",
	"core/RandomGenerator",
	"core/GridShuffler",
	"core/SpotTheDifferencePuzzle",
	"core/ShufflePuzzle"
], function(
	ServiceManager,
	Renderer,
	CookieManager,
	RandomGenerator,
	GridShuffler,
	SpotTheDifferencePuzzle,
	ShufflePuzzle
) {

	"use strict";

	return function() {
		
		var that = this, score, level, puzzlesSolved;
		
		this.setServiceManager = function(m) {
			this.serviceManager = m;
		};
		
		this.run = function() {
			
			this.setServiceManager(new ServiceManager());
			this.serviceManager.setService("Application", that);
			
			// Common classes used elsewhere
			this.serviceManager.setService(
				"RandomGenerator",
				new RandomGenerator()
			);
			this.serviceManager.setService(
				"GridShuffler",
				new GridShuffler()
			);
			this.serviceManager.setService(
				"Renderer",
				new Renderer()
			);
			this.serviceManager.setService(
				"CookieManager",
				new CookieManager()
			);
			
			// Spot the difference puzzle
			this.serviceManager.setService(
				"SpotTheDifferencePuzzle",
				new SpotTheDifferencePuzzle()
			);
			
			// Shuffle puzzle
			this.serviceManager.setService(
				"ShufflePuzzle",
				new ShufflePuzzle()
			);
			
			setTimeout(function() {
				that.newGame(true);
			}, 1500);
			
		};
		
		this.newGame = function(render) {
			score = 0;
			level = 1;
			puzzlesSolved = 0;
			if (true === render) {
				this.serviceManager.getService("Renderer").render();
			}
		};
		
		this.nextPuzzle = function(render) {
			puzzlesSolved += 1;
			level = 1 + Math.floor(puzzlesSolved / 2);
			if (true === render) {
				this.serviceManager.getService("Renderer").render();
			}
		};
		
		this.getMaximumX = function() {
			return 4 + level;
		};
		
		this.getMaximumY = function() {
			return 4 + level;
		};
		
		this.getShuffleComplexity = function() {
			return 3 + level * 2;
		};
		
		this.getRemainingTime = function() {
			return 300 - (level - 1) * 10;
		};
		
		this.getScore = function() {
			return score;
		};
		
		this.getLevel = function() {
			return level;
		};
		
		this.getPuzzlesSolved = function() {
			return puzzlesSolved;
		};
		
	};

});