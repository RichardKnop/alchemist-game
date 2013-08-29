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
			
			this.gen.setMaximum(10); // TODO
			
			random = this.gen.generateInteger();
			remainingTime = this.game.getRemainingTime();
			
			return this;
		};
		
		this.getHTML = function() {
			var html = '<div id="spot-the-difference-puzzle" class="container">';
			// TODO
			html += "</div>";
			return html;
		};
		
	};

});