define([], function() {

	"use strict";

	return function() {
		
		var that = this, random, remainingTime;
		
		this.setServiceManager = function(m) {
			this.serviceManager = m;
		};
		
		this.init = function() {
			console.log("Creating a new spot the difference puzzle");
			
			this.game = this.serviceManager.getService("Game");
			this.gen = this.serviceManager.getService("RandomGenerator");
			
			var maximumX = this.game.getMaximumX();
			var maximumY = this.game.getMaximumY();
			this.gen.setMaximumX(maximumX);
			this.gen.setMaximumY(maximumY);
			
			random = this.gen.generate();
			remainingTime = this.game.getRemainingTime();
			
			return this;
		};
		
		this.getHTML = function() {
			return '<div id="spot-the-difference-puzzle" class="container"><h1>Spot The Difference Puzzle</h1></div>';
		};
		
	};

});