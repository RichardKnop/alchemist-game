define([], function() {

	"use strict";

	return function() {
		
		var that = this, random, remainingTime;
		
		this.setServiceManager = function(m) {
			this.serviceManager = m;
		};
		
		this.init = function() {
			this.app = this.serviceManager.getService("Application");
			this.gen = this.serviceManager.getService("RandomGenerator");
			
			var maximumX = this.app.getMaximumX();
			var maximumY = this.app.getMaximumY();
			this.gen.setMaximumX(maximumX);
			this.gen.setMaximumY(maximumY);
			
			random = this.gen.generate();
			remainingTime = this.app.getRemainingTime();
		};
		
		this.getHTML = function() {
			return '<div id="spot-the-difference-puzzle" class="container">Spot The Difference Puzzle</div>';
		};
		
	};

});