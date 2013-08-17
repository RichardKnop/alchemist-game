define([
	"core/ServiceManager",
	"core/RandomGenerator",
	"core/GridShuffler",
	"core/SpotTheDifferencePuzzle",
	"core/ShufflePuzzle"
], function(
	ServiceManager,
	RandomGenerator,
	GridShuffler,
	SpotTheDifferencePuzzle,
	ShufflePuzzle
) {

	"use strict";

	return function() {
		
		var that = this, score = 0, level = 1, puzzlesSolved = 0;
		
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
			
			var html = getHTMLToRender();
			setTimeout(function() {
				that.render(html);
			}, 1500);
			
		};
		
		this.render = function(html) {
			document.getElementById("wrapper").innerHTML = html;
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
		
		this.nextPuzzle = function() {
			puzzlesSolved += 1;
			level = 1 + Math.floor(puzzlesSolved / 2);
			this.render();
		};
		
		function getHTMLToRender() {
			if (0 === puzzlesSolved || 0 === puzzlesSolved % 2) {
				return that.serviceManager.getService("SpotTheDifferencePuzzle").init().getHTML();
			}
			return that.serviceManager.getService("ShufflePuzzle").init().getHTML();
		}
		
	};

});