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
			var app = that.serviceManager.getService("Application");
			if (0 === app.getPuzzlesSolved() || 0 === app.getPuzzlesSolved() % 2) {
				return that.serviceManager.getService("SpotTheDifferencePuzzle").init().getHTML();
			}
			return that.serviceManager.getService("ShufflePuzzle").init().getHTML();
		}
		
	};

});