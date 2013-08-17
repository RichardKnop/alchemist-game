define([], function() {

	"use strict";

	return function() {
		
		var maximumX = 10, maximumY = 10;
		var history = [], historyLimit = 5;
		
		this.setMaximumX = function(x) {
			maximumX = x;
		};
		
		this.setMaximumY = function(y) {
			maximumY = y;
		};
		
		this.setHistoryLimit = function(l) {
			historyLimit = l;
		};
		
		this.generate = function() {
			var c = {}, keepGoing = true, found;
			
			while (true === keepGoing) {
				c.x = getRandomInt(1, maximumX);
				c.y = getRandomInt(1, maximumY);
				if (false === existsInHistory(c)) {
					keepGoing = false;
				}
			}
			
			history.push(c);
			return c;
		};
		
		function rotateHistory() {
			while (history.length > historyLimit) {
				history.shift();
			}
		}
		
		function existsInHistory(c) {
			for (var i = 0; i < history.length; i++) {
				if (c.x === history[i].x && c.y === history[i].y) {
					return true;
				}
			}
			return false;
		}
		
		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		
	};

});