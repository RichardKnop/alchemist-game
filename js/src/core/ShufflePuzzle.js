define([], function() {

	"use strict";

	return function() {
		
		var that = this, grid, remainingTime;
		
		this.setServiceManager = function(m) {
			this.serviceManager = m;
		};
		
		this.init = function() {
			this.app = this.serviceManager.getService("Application");
			this.gen = this.serviceManager.getService("RandomGenerator");
			this.shfl = this.serviceManager.getService("GridShuffler");
			
			var maximumX = this.app.getMaximumX();
			var maximumY = this.app.getMaximumY();
			var shuffleComplexity = this.app.getShuffleComplexity();
			
			this.gen.setMaximumX(maximumX);
			this.gen.setMaximumY(maximumY);
			var random = this.gen.generate();
			
			this.shfl.setMaximumX(maximumX);
			this.shfl.setMaximumY(maximumY);
			this.shfl.init();
			this.shfl.setEmptySpace(random.x, random.y);
			this.shfl.shuffle(shuffleComplexity);
			
			grid = this.shfl.getGrid();
			remainingTime = this.app.getRemainingTime();
		};
		
		this.getHTML = function() {
			return '<div id="shuffle-puzzle">Shuffle Puzzle</div>';
		};
		
	};

});