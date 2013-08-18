define([
	"core/SpotTheDifferencePuzzle",
	"core/ShufflePuzzle"
], function(
	SpotTheDifferencePuzzle,
	ShufflePuzzle
) {

	"use strict";

	return function() {
		
		var that = this, score, level, puzzlesSolved;
		
		this.setServiceManager = function(m) {
			this.serviceManager = m;
		};
		
		this.init = function() {
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
		};
		
		this.startNew = function(render) {
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
			return 60 + (level - 1) * 30;
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