define([], function() {

	"use strict";

	return function() {
		
		var maximum, maximumX, maximumY;
		var history = [], historyLimit = 5;
		
		this.setServiceManager = function(m) {
			this.serviceManager = m;
		};
		
		this.setMaximum = function(m) {
			maximum = m;
		};
		
		this.setMaximumX = function(x) {
			maximumX = x;
		};
		
		this.setMaximumY = function(y) {
			maximumY = y;
		};
		
		this.setHistoryLimit = function(l) {
			historyLimit = l;
		};
		
		this.generateInteger = function() {
			return getRandomInt(1, maximum);
		};
		
		this.generateCoordinate = function() {
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