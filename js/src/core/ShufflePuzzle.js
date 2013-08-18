define([], function() {

	"use strict";

	return function() {
		
		var that = this, grid, remainingTime;
		
		this.setServiceManager = function(m) {
			this.serviceManager = m;
		};
		
		this.init = function() {
			console.log("Creating a new shuffle puzzle");
			
			this.game = this.serviceManager.getService("Game");
			this.gen = this.serviceManager.getService("RandomGenerator");
			this.shfl = this.serviceManager.getService("GridShuffler");
			
			var maximumX = this.game.getMaximumX();
			var maximumY = this.game.getMaximumY();
			var shuffleComplexity = this.game.getShuffleComplexity();
			
			this.gen.setMaximumX(maximumX);
			this.gen.setMaximumY(maximumY);
			var random = this.gen.generate();
			
			this.shfl.setMaximumX(maximumX);
			this.shfl.setMaximumY(maximumY);
			this.shfl.init();
			this.shfl.setEmptySpace(random.x, random.y);
			this.shfl.shuffle(shuffleComplexity);
			
			grid = this.shfl.getGrid();
			remainingTime = this.game.getRemainingTime();
			
			return this;
		};
		
		this.getHTML = function() {
			return '<div id="shuffle-puzzle" class="container"><h1>Shuffle Puzzle</h1></div>';
		};
		
	};

});