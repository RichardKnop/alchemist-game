define([], function() {

	"use strict";

	return function() {
		
		var that = this;
		
		this.setServiceManager = function(m) {
			this.serviceManager = m;
		};
		
		this.render = function() {
			var html = getHTMLToRender();
			document.getElementById("wrapper").innerHTML = html;
		};
		
		function getHTMLToRender() {
			var game = that.serviceManager.getService("Game");
			if (0 === game.getPuzzlesSolved() || 0 === game.getPuzzlesSolved() % 2) {
				return that.serviceManager.getService("SpotTheDifferencePuzzle").init().getHTML();
			}
			return that.serviceManager.getService("ShufflePuzzle").init().getHTML();
		}
		
	};

});