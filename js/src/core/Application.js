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
		
		var that = this, score = 0, level = 1;
		var spotTheDifferencePuzzle, shufflePuzzle;
		
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
			spotTheDifferencePuzzle = new SpotTheDifferencePuzzle();
			this.serviceManager.setService(
				"SpotTheDifferencePuzzle",
				spotTheDifferencePuzzle
			);
			spotTheDifferencePuzzle.init();
			
			// Shuffle puzzle
			shufflePuzzle = new ShufflePuzzle();
			this.serviceManager.setService(
				"ShufflePuzzle",
				shufflePuzzle
			);
			shufflePuzzle.init();
			
			this.render();
			
		};
		
		this.render = function() {
			var html =this.serviceManager.getService("SpotTheDifferencePuzzle").getHTML();
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
		
	};

});