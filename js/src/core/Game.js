define([
	"core/SpotTheDifferencePuzzle",
	"core/ShufflePuzzle"
], function(
	SpotTheDifferencePuzzle,
	ShufflePuzzle
) {

	"use strict";

	return function() {
		
		var that = this, baseTime = 60, score, level, puzzlesSolved;
		
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
		
		this.setBaseTime = function(t) {
			baseTime = t;
		};
		
		this.getRemainingTime = function() {
			var t, s, min, sec;
			t = baseTime + (level - 1) * 30;
			min = Math.floor(t / 60);
			s = min < 10 ? "0" + min : min;
			s += ":";
			sec = t % 60;
			s += sec < 10 ? "0" + sec : sec;
			return s;
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